<template>
  <el-dialog
    :visible.sync="visible"
    :title="dialogTitle"
    width="92%"
    top="4vh"
    append-to-body
    :close-on-click-modal="true"
    @open="load"
  >
    <!-- 统计 -->
    <div class="wd-stats">
      <div class="wd-stats__item">
        <span class="wd-stats__num">{{ matches.length }}</span>
        <span class="wd-stats__label">命中场次</span>
      </div>
      <div class="wd-stats__item">
        <span class="wd-stats__num">{{ singleCount }}</span>
        <span class="wd-stats__label">单关场次</span>
      </div>
      <div class="wd-stats__item">
        <span class="wd-stats__num">{{ scorePct }}%</span>
        <span class="wd-stats__label">占区间已开奖</span>
      </div>
      <div class="wd-stats__item">
        <span class="wd-stats__num">{{ totalScored }}</span>
        <span class="wd-stats__label">区间已开奖场次</span>
      </div>
    </div>

    <el-alert
      v-if="errorMsg"
      :title="errorMsg"
      type="error"
      :closable="false"
      class="wd-error"
    />

    <!-- 该胜平负结果在该周期内的比赛明细 -->
    <div class="wd-table">
      <el-table ref="table" :data="matches" v-loading="loading" size="small" border stripe>
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="matchNum" label="编号" width="80" align="center" />
        <el-table-column label="日期" width="135" align="center">
          <template slot-scope="{ row }">
            {{ row.matchDate }}
            <span class="wd-week">({{ weekdayOf(row.matchDate) }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="league" label="联赛" min-width="90" />
        <el-table-column label="主队" min-width="100">
          <template slot-scope="{ row }">{{ row.homeTeam }}</template>
        </el-table-column>
        <el-table-column
          label="比分"
          width="140"
          align="center"
          :filters="scoreFilters"
          :filter-method="filterScore"
        >
          <template slot-scope="{ row }">
            <div class="wd-full">{{ row.full.home }}:{{ row.full.away }}</div>
            <div class="wd-half">半 {{ row.half ? `${row.half.home}:${row.half.away}` : '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="客队" min-width="100">
          <template slot-scope="{ row }">{{ row.awayTeam }}</template>
        </el-table-column>
        <el-table-column label="胜平负" width="80" align="center">
          <template slot-scope="{ row }">
            <span :class="['wd-wdl', `wd-wdl--${wdlOf(row)}`]">{{ wdlOf(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="赔率（胜/平/负）" width="170" align="center">
          <template slot-scope="{ row }">
            <span class="wd-odds wd-odds--h">胜{{ row.odds.h || '-' }}</span>
            <span class="wd-odds wd-odds--d">平{{ row.odds.d || '-' }}</span>
            <span class="wd-odds wd-odds--a">负{{ row.odds.a || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="比分赔率" width="100" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.scoreOdds">
              <span class="wd-score-odds">{{ row.scoreOdds.odds || '-' }}</span>
              <div v-if="row.scoreOdds.isOther" class="wd-score-odds__bucket">{{ row.scoreOdds.bucket }}</div>
            </template>
            <span v-else class="wd-none">-</span>
          </template>
        </el-table-column>
        <el-table-column label="让球" width="70" align="center">
          <template slot-scope="{ row }">{{ row.goalLine || '-' }}</template>
        </el-table-column>
        <el-table-column label="单关" width="70" align="center">
          <template slot-scope="{ row }">
            <el-tag v-if="row.bettingSingle == 1" type="warning" size="mini">单关</el-tag>
            <span v-else class="wd-none">-</span>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!loading && !matches.length && !errorMsg" description="该区间无此结果" />
    </div>
  </el-dialog>
</template>

<script>
import { fetchMatches, fetchScoreOdds, extractScoreOdds, getWeekStart, fmt, WDL_MAP } from '@/api/football'

export default {
  name: 'FootballWinloseDetail',
  props: {
    // 弹窗显隐（v-model）
    value: { type: Boolean, default: false },
    // 胜/平/负
    outcome: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    // week：周明细；day：日明细
    mode: { type: String, default: 'week' },
    week: { type: String, default: '' },
    // 该周期实际覆盖的起止日期 [YYYY-MM-DD, YYYY-MM-DD]
    dateRange: { type: Array, default: () => [] }
  },
  data() {
    return {
      matches: [],
      totalScored: 0,
      loading: false,
      errorMsg: ''
    }
  },
  computed: {
    visible: {
      get() { return this.value },
      set(v) { this.$emit('input', v) }
    },
    dialogTitle() {
      return `${this.outcome || '-'} 详情${this.rangeText ? `（${this.rangeText}）` : ''}`
    },
    rangeText() {
      if (this.dateRange && this.dateRange.length === 2) {
        return `${this.dateRange[0]} ~ ${this.dateRange[1]}`
      }
      if (this.mode === 'week' && this.week) {
        const start = new Date(this.week)
        const end = new Date(start)
        end.setDate(end.getDate() + 6)
        const f = d => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        return `${f(start)}~${f(end)}周`
      }
      return this.start && this.end ? `${this.start} ~ ${this.end}` : ''
    },
    singleCount() {
      return this.matches.filter(m => m.bettingSingle == 1).length
    },
    scorePct() {
      return this.totalScored ? Math.round((this.matches.length / this.totalScored) * 1000) / 10 : 0
    },
    // 比分列筛选选项：当前命中场次里出现过的比分（按频次降序）
    scoreFilters() {
      const freq = {}
      this.matches.forEach(m => {
        if (!m.full) return
        const key = `${m.full.home}:${m.full.away}`
        freq[key] = (freq[key] || 0) + 1
      })
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([score]) => ({ text: score, value: score }))
    }
  },
  methods: {
    wdlOf(m) {
      return WDL_MAP[m.winFlag] || '-'
    },
    // 比分列筛选：命中该比分的行保留
    filterScore(value, row) {
      return `${row.full.home}:${row.full.away}` === value
    },
    // 由 YYYY-MM-DD 算星期几（按年月日数字构造，避免时区偏移）
    weekdayOf(dateStr) {
      if (!dateStr) return '-'
      const [y, m, d] = dateStr.split('-').map(Number)
      if (!y || !m || !d) return '-'
      const day = new Date(y, m - 1, d).getDay()
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
    },
    // 比赛是否落在该周期实际覆盖的时间段内
    inPeriod(m) {
      if (this.dateRange && this.dateRange.length === 2) {
        return m.matchDate && m.matchDate >= this.dateRange[0] && m.matchDate <= this.dateRange[1]
      }
      if (this.mode === 'week' && this.week) {
        return fmt(getWeekStart(m.matchDate)) === this.week
      }
      return true
    },
    // 串行拉取单场比分赔率，避免并发触发体彩限流（HTTP 567）
    async fetchScoreOddsSafely(m) {
      const doFetch = async () => {
        const v = await fetchScoreOdds(m.matchId)
        return v ? extractScoreOdds(v, m.full.home, m.full.away) : null
      }
      try {
        const r = await doFetch()
        await new Promise(res => setTimeout(res, 400))
        return r
      } catch (e) {
        await new Promise(res => setTimeout(res, 1200))
        try {
          return await doFetch()
        } catch (e2) {
          return null
        }
      }
    },
    async load() {
      if (!this.start || !this.end || !this.outcome) {
        this.errorMsg = '参数不完整，请从周明细/日明细点击胜平负场次进入'
        return
      }
      this.loading = true
      this.errorMsg = ''
      this.matches = []
      try {
        const { matches } = await fetchMatches(this.start, this.end)
        // 该周期内的已开奖场次（用于占比计算）
        this.totalScored = matches.filter(m => m.full && this.inPeriod(m)).length
        const filtered = matches.filter(m => {
          if (!m.full) return false
          if (WDL_MAP[m.winFlag] !== this.outcome) return false
          return this.inPeriod(m)
        })
        // 逐场串行拉取比分赔率（失败该场显示 -）
        this.matches = []
        for (const m of filtered) {
          const scoreOdds = await this.fetchScoreOddsSafely(m)
          this.matches.push({ ...m, scoreOdds })
        }
        // 数据换新后清除上次的比分筛选，避免空结果
        this.$nextTick(() => {
          if (this.$refs.table) this.$refs.table.clearFilter()
        })
      } catch (e) {
        this.errorMsg = '查询失败：' + (e.message || e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wd-stats {
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
  &__item {
    flex: 1;
    background: #f7f8fa;
    border-radius: 6px;
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__num {
    font-size: 26px;
    font-weight: 600;
    color: #409eff;
    line-height: 1.2;
  }
  &__label {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}
.wd-error {
  margin-bottom: 14px;
}
.wd-table {
  .el-table {
    width: 100%;
  }
}
.wd-full {
  font-weight: 600;
  font-size: 14px;
}
.wd-half {
  font-size: 12px;
  color: #999;
}
.wd-week {
  font-size: 12px;
  color: #999;
}
.wd-wdl {
  display: inline-block;
  min-width: 22px;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 12px;
  background: #f4f4f5;
  color: #bbb;
  &--胜 { background: #f0f9eb; color: #67c23a; }
  &--平 { background: #f4f4f5; color: #909399; }
  &--负 { background: #fef0f0; color: #f56c6c; }
}
.wd-odds {
  display: inline-block;
  font-size: 12px;
  margin: 0 4px;
  &--h { color: #67c23a; }
  &--d { color: #909399; }
  &--a { color: #f56c6c; }
}
.wd-score-odds {
  font-weight: 600;
  color: #409eff;
  &__bucket {
    font-size: 12px;
    color: #999;
  }
}
.wd-none {
  color: #ccc;
}
</style>
