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
    <div class="bd-stats">
      <div class="bd-stats__item">
        <span class="bd-stats__num">{{ matches.length }}</span>
        <span class="bd-stats__label">命中场次</span>
      </div>
      <div class="bd-stats__item">
        <span class="bd-stats__num">{{ singleCount }}</span>
        <span class="bd-stats__label">单关场次</span>
      </div>
      <div class="bd-stats__item">
        <span class="bd-stats__num">{{ scorePct }}%</span>
        <span class="bd-stats__label">占区间已开奖</span>
      </div>
      <div class="bd-stats__item">
        <span class="bd-stats__num">{{ totalScored }}</span>
        <span class="bd-stats__label">区间已开奖场次</span>
      </div>
    </div>

    <el-alert
      v-if="errorMsg"
      :title="errorMsg"
      type="error"
      :closable="false"
      class="bd-error"
    />

    <!-- 比赛明细（限定在饼图对应的周期内） -->
    <div class="bd-table">
      <el-table :data="matches" v-loading="loading" size="small" border stripe>
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="matchNum" label="编号" width="80" align="center" />
        <el-table-column label="日期" width="135" align="center">
          <template slot-scope="{ row }">
            {{ row.matchDate }}
            <span class="bd-week">({{ weekdayOf(row.matchDate) }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="league" label="联赛" min-width="90" />
        <el-table-column label="主队" min-width="100">
          <template slot-scope="{ row }">{{ row.homeTeam }}</template>
        </el-table-column>
        <el-table-column label="比分" width="120" align="center">
          <template slot-scope="{ row }">
            <div class="bd-full">{{ row.full.home }}:{{ row.full.away }}</div>
            <div class="bd-half">半 {{ row.half ? `${row.half.home}:${row.half.away}` : '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="客队" min-width="100">
          <template slot-scope="{ row }">{{ row.awayTeam }}</template>
        </el-table-column>
        <el-table-column label="胜平负" width="80" align="center">
          <template slot-scope="{ row }">
            <span :class="['bd-wdl', `bd-wdl--${wdlOf(row)}`]">{{ wdlOf(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="赔率（胜/平/负）" width="170" align="center">
          <template slot-scope="{ row }">
            <span class="bd-odds bd-odds--h">胜{{ row.odds.h || '-' }}</span>
            <span class="bd-odds bd-odds--d">平{{ row.odds.d || '-' }}</span>
            <span class="bd-odds bd-odds--a">负{{ row.odds.a || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="比分赔率" width="100" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.scoreOdds">
              <span class="bd-score-odds">{{ row.scoreOdds.odds || '-' }}</span>
              <div v-if="row.scoreOdds.isOther" class="bd-score-odds__bucket">{{ row.scoreOdds.bucket }}</div>
            </template>
            <span v-else class="bd-none">-</span>
          </template>
        </el-table-column>
        <el-table-column label="让球" width="70" align="center">
          <template slot-scope="{ row }">{{ row.goalLine || '-' }}</template>
        </el-table-column>
        <el-table-column label="单关" width="70" align="center">
          <template slot-scope="{ row }">
            <el-tag v-if="row.bettingSingle == 1" type="warning" size="mini">单关</el-tag>
            <span v-else class="bd-none">-</span>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!loading && !matches.length && !errorMsg" description="该区间无此比分" />
    </div>
  </el-dialog>
</template>

<script>
import { fetchMatches, fetchScoreOdds, extractScoreOdds, getWeekStart, fmt, WDL_MAP } from '@/api/football'

export default {
  name: 'FootballBifenDetail',
  props: {
    // 弹窗显隐（v-model）
    value: { type: Boolean, default: false },
    score: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    // 周模式：限定到饼图对应的一周；day 模式：整个区间
    mode: { type: String, default: 'week' },
    week: { type: String, default: '' },
    // 饼图实际覆盖的起止日期 [YYYY-MM-DD, YYYY-MM-DD]，精确限定时间
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
      return `比分 ${this.score || '-'} 详情${this.rangeText ? `（${this.rangeText}）` : ''}`
    },
    // 优先显示饼图实际覆盖的起止日期；否则周模式显示该周范围，日模式显示起止日期
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
    }
  },
  methods: {
    wdlOf(m) {
      return WDL_MAP[m.winFlag] || '-'
    },
    // 由 YYYY-MM-DD 算星期几（按年月日数字构造，避免时区偏移）
    weekdayOf(dateStr) {
      if (!dateStr) return '-'
      const [y, m, d] = dateStr.split('-').map(Number)
      if (!y || !m || !d) return '-'
      const day = new Date(y, m - 1, d).getDay()
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
    },
    // 比赛是否落在该饼图实际覆盖的时间段内
    inPeriod(m) {
      if (this.dateRange && this.dateRange.length === 2) {
        // 精确限定到饼图实际覆盖的起止日期内
        return m.matchDate && m.matchDate >= this.dateRange[0] && m.matchDate <= this.dateRange[1]
      }
      if (this.mode === 'week' && this.week) {
        // 兜底：按周起始过滤（当未传入精确日期范围时）
        return fmt(getWeekStart(m.matchDate)) === this.week
      }
      return true
    },
    // 串行拉取单场比分赔率：每次请求后留 400ms 间隔，
    // 避免并发请求触发体彩限流（HTTP 567）；被限流时等 1.2s 重试一次，仍失败返回 null
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
      if (!this.start || !this.end || !this.score) {
        this.errorMsg = '参数不完整，请从比分概率分布页点击比分进入'
        return
      }
      this.loading = true
      this.errorMsg = ''
      this.matches = []
      try {
        const { matches } = await fetchMatches(this.start, this.end)
        // 该饼图时间段内的已开奖场次（用于占比计算）
        this.totalScored = matches.filter(m => m.full && this.inPeriod(m)).length
        const filtered = matches.filter(m => {
          if (!m.full) return false
          if (`${m.full.home}:${m.full.away}` !== this.score) return false
          return this.inPeriod(m)
        })
        // 逐场拉取该比分赔率：串行 + 间隔，避免并发触发体彩限流（HTTP 567）
        this.matches = []
        for (const m of filtered) {
          const scoreOdds = await this.fetchScoreOddsSafely(m)
          this.matches.push({ ...m, scoreOdds })
        }
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
.bd-stats {
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
.bd-error {
  margin-bottom: 14px;
}
.bd-table {
  .el-table {
    width: 100%;
  }
}
.bd-full {
  font-weight: 600;
  font-size: 14px;
}
.bd-half {
  font-size: 12px;
  color: #999;
}
.bd-week {
  font-size: 12px;
  color: #999;
}
.bd-wdl {
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
.bd-odds {
  display: inline-block;
  font-size: 12px;
  margin: 0 4px;
  &--h { color: #67c23a; }
  &--d { color: #909399; }
  &--a { color: #f56c6c; }
}
.bd-score-odds {
  font-weight: 600;
  color: #409eff;
  &__bucket {
    font-size: 12px;
    color: #999;
  }
}
.bd-none {
  color: #ccc;
}
</style>
