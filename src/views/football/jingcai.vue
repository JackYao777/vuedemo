<template>
  <div class="jc-page">
    <!-- 筛选条 -->
    <div class="jc-filter">
      <div class="jc-filter__row">
        <span class="jc-filter__label">快捷选择：</span>
        <el-button
          v-for="w in [1, 2, 3, 4, 8]"
          :key="w"
          :type="activeQuick === w ? 'primary' : 'default'"
          size="small"
          @click="onQuick(w)"
        >近 {{ w }} 周</el-button>
        <el-button
          :type="activeQuick === 0 ? 'primary' : 'default'"
          size="small"
          @click="onCustom"
        >自定义</el-button>
      </div>
      <div class="jc-filter__row">
        <span class="jc-filter__label">日期区间：</span>
        <el-date-picker
          v-model="range"
          type="daterange"
          size="small"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          :disabled="activeQuick !== 0"
          @change="onRangeChange"
        />
        <el-button
          v-if="activeQuick === 0"
          type="primary" size="small"
          :loading="loading"
          @click="query"
        >查询</el-button>
        <span v-if="errorMsg" class="jc-error">{{ errorMsg }}</span>
      </div>
    </div>

    <!-- 概览 -->
    <div class="jc-stats">
      <div class="jc-stats__item">
        <span class="jc-stats__num">{{ totalMatches }}</span>
        <span class="jc-stats__label">比赛场次</span>
      </div>
      <div class="jc-stats__item">
        <span class="jc-stats__num">{{ periods.length }}</span>
        <span class="jc-stats__label">{{ isCustom ? '天数' : '周数' }}</span>
      </div>
      <div class="jc-stats__item">
        <span class="jc-stats__num">{{ scoreMatches }}</span>
        <span class="jc-stats__label">已开奖场次</span>
      </div>
      <div class="jc-stats__item">
        <span class="jc-stats__num jc-stats__num--sm">{{ lastUpdateTime || '-' }}</span>
        <span class="jc-stats__label">数据更新时间</span>
      </div>
    </div>

    <!-- 图表 -->
    <el-tabs v-model="tab" class="jc-tabs" @tab-click="onTabClick">
      <el-tab-pane :label="isCustom ? '大小球日分布' : '大小球周分布'" name="size">
        <div class="jc-chart-hint">{{ isCustom ? '按全场总进球分档，各档在每天中的占比（百分比堆叠）' : '按全场总进球分档，各档在每周中的占比（百分比堆叠）' }}</div>
        <ve-histogram
          v-if="sizeChart.rows.length"
          :data="sizeChart"
          :settings="sizeSettings"
          :extend="sizeExtend"
          height="420px"
        />
        <el-empty v-else description="无数据" />
      </el-tab-pane>

      <el-tab-pane label="比分概率分布" name="score">
        <div class="jc-chart-hint">{{ isCustom ? '自定义区间内所有比分的出现频率（已开奖场次），饼图百分比直观展示' : '每周所有比分的出现频率（已开奖场次），每张饼图对应一周' }}</div>
        <div class="jc-score-filter">
          <div class="jc-score-filter__group">
            <span class="jc-score-filter__label">筛选比分：</span>
            <el-select
              v-model="selectedScores"
              size="small"
              multiple
              filterable
              collapse-tags
              clearable
              placeholder="全部比分"
              style="width: 220px"
            >
              <el-option
                v-for="score in scoreOptions"
                :key="score"
                :label="score"
                :value="score"
              />
            </el-select>
          </div>
          <div class="jc-score-filter__group">
            <span class="jc-score-filter__label">场次范围：</span>
            <el-select
              v-model="selectedCountRanges"
              size="small"
              multiple
              clearable
              placeholder="全部场次"
              style="width: 140px"
            >
              <el-option
                v-for="r in COUNT_RANGES"
                :key="r.key"
                :label="r.label"
                :value="r.key"
              />
            </el-select>
          </div>
          <div class="jc-score-filter__group">
            <span class="jc-score-filter__label">概率范围：</span>
            <el-select
              v-model="selectedProbRanges"
              size="small"
              multiple
              clearable
              placeholder="全部概率"
              style="width: 140px"
            >
              <el-option
                v-for="r in PROB_RANGES"
                :key="r.key"
                :label="r.label"
                :value="r.key"
              />
            </el-select>
          </div>
          <div class="jc-score-filter__group">
            <span class="jc-score-filter__label">进球数：</span>
            <el-select
              v-model="selectedGoalRanges"
              size="small"
              multiple
              clearable
              placeholder="全部进球"
              style="width: 140px"
            >
              <el-option
                v-for="r in GOAL_RANGES"
                :key="r.key"
                :label="r.label"
                :value="r.key"
              />
            </el-select>
          </div>
        </div>
        <template v-if="scorePies.length">
          <div class="jc-score-pies" :class="{ 'jc-score-pies--single': scorePies.length === 1 }">
            <div
              v-for="(pie, idx) in scorePies"
              :key="idx"
              class="jc-score-pie-block"
            >
              <div v-if="!isCustom" class="jc-score-pie-title">{{ pie.label }}</div>
              <ve-pie
                v-if="pie.data.rows.length"
                :data="pie.data"
                :settings="pie.settings"
                :extend="pie.extend"
                :events="pieEvents(pie)"
                :height="pieHeight"
              />
              <div v-else class="jc-score-pie-empty">该周期无匹配比分</div>
            </div>
          </div>
        </template>
        <el-empty v-else description="无数据" />
      </el-tab-pane>

      <el-tab-pane :label="isCustom ? '日明细' : '周明细'" name="detail">
        <el-table :data="periodDetail" size="small" border stripe>
          <el-table-column prop="label" :label="isCustom ? '日期' : '周（周二~周一）'" width="160" />
          <el-table-column prop="count" label="场次" width="80" align="center" />
          <el-table-column
            v-for="b in SIZE_BUCKETS"
            :key="b"
            :label="b"
            align="center"
          >
            <template slot-scope="{ row }">
              {{ row.sizeCount[b] }} <span class="jc-pct">({{ row.sizePct[b] }}%)</span>
            </template>
          </el-table-column>
          <el-table-column label="最常见比分" min-width="180">
            <template slot-scope="{ row }">
              {{ row.topScores.map(s => `${s.score}×${s.count}`).join('、') || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="胜平负" min-width="110" align="center">
            <template slot-scope="{ row }">
              <div v-for="k in WDL_KEYS" :key="k" class="jc-wdl">
                <span :class="['jc-wdl__tag', 'jc-wdl__tag--' + k]">{{ k }}</span>
                <a class="jc-wdl__count" @click.prevent="onWdlClick(row, k)">{{ row.wdl[k] }}场</a>
                <span class="jc-pct">({{ row.wdlPct[k] }}%)</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane :label="isCustom ? '比赛日详情' : '比赛周详情'" name="matches">
        <div class="jc-match-filter">
          <span class="jc-match-filter__label">联赛筛选：</span>
          <el-select
            v-model="selectedLeagues"
            size="small"
            multiple
            clearable
            filterable
            collapse-tags
            placeholder="全部联赛"
            style="width: 280px"
          >
            <el-option v-for="l in matchLeagues" :key="l" :label="l" :value="l" />
          </el-select>
          <div class="jc-match-filter__group">
            <span class="jc-match-filter__label">比分赔率</span>
            <el-switch v-model="calcScoreOdds" @change="onCalcScoreOdds" />
            <span v-if="scoreOddsLoading" class="jc-pct">计算中…</span>
          </div>
          <span class="jc-match-filter__count">共 {{ teamRows.length }} 场</span>
        </div>
        <el-table ref="matchTable" :data="teamRows" size="small" border stripe @filter-change="onTeamFilterChange">
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="matchNum" label="编号" width="80" align="center" />
          <el-table-column label="日期" width="140" align="center">
            <template slot-scope="{ row }">
              {{ row.matchDate }}
              <span class="jc-pct">({{ weekdayOfMatch(row.matchDate) }})</span>
            </template>
          </el-table-column>
          <el-table-column prop="league" label="联赛" min-width="100" />
          <el-table-column
            column-key="home"
            label="主队"
            min-width="100"
            :filters="homeTeamFilters"
            :filter-method="filterTeamUnion"
            :filtered-value="homeTeamFilter"
          >
            <template slot-scope="{ row }">{{ row.homeTeam }}</template>
          </el-table-column>
          <el-table-column
            label="比分"
            width="130"
            align="center"
            :filters="matchScoreFilters"
            :filter-method="filterMatchScore"
          >
            <template slot-scope="{ row }">
              <template v-if="row.full">
                <span class="jc-full">{{ row.full.home }}:{{ row.full.away }}</span>
                <div class="jc-pct">半 {{ row.half ? `${row.half.home}:${row.half.away}` : '-' }}</div>
              </template>
              <span v-else class="jc-pct">未开奖</span>
            </template>
          </el-table-column>
          <el-table-column
            column-key="away"
            label="客队"
            min-width="100"
            :filters="awayTeamFilters"
            :filter-method="filterTeamUnion"
            :filtered-value="awayTeamFilter"
          >
            <template slot-scope="{ row }">{{ row.awayTeam }}</template>
          </el-table-column>
          <el-table-column label="胜平负" width="95" align="center">
            <template slot-scope="{ row }">
              <span :class="['jc-wdl__tag', 'jc-wdl__tag--' + wdlOf(row)]">{{ wdlOf(row) }}</span>
              <i v-if="isColdResult(row)" class="jc-cold">（冷）</i>
            </template>
          </el-table-column>
          <el-table-column label="赔率（胜/平/负）" width="180" align="center">
            <template slot-scope="{ row }">
              <span class="jc-odds jc-odds--h">胜{{ row.odds.h || '-' }}</span>
              <span class="jc-odds jc-odds--d">平{{ row.odds.d || '-' }}</span>
              <span class="jc-odds jc-odds--a">负{{ row.odds.a || '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="calcScoreOdds" label="比分赔率" width="100" align="center">
            <template slot-scope="{ row }">
              <template v-if="scoreOddsMap[row.matchId]">
                <span class="jc-score-odds">{{ scoreOddsMap[row.matchId].odds || '-' }}</span>
                <div v-if="scoreOddsMap[row.matchId].isOther" class="jc-pct">{{ scoreOddsMap[row.matchId].bucket }}</div>
              </template>
              <span v-else class="jc-pct">-</span>
            </template>
          </el-table-column>
          <el-table-column label="让球" width="70" align="center">
            <template slot-scope="{ row }">{{ row.goalLine || '-' }}</template>
          </el-table-column>
          <el-table-column label="单关" width="70" align="center">
            <template slot-scope="{ row }">
              <el-tag v-if="row.bettingSingle == 1" type="warning" size="mini">单关</el-tag>
              <span v-else class="jc-pct">-</span>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-if="!teamRows.length" description="无匹配比赛" />
      </el-tab-pane>

      <el-tab-pane label="联赛胜平负" name="league">
        <div class="jc-chart-hint">当前加载区间（{{ rangeText }}）内各联赛已开奖场次的胜/平/负场数与占比；正/冷按结果是否为胜平负三项最低赔率判定（正=最低赔率，冷=其他）</div>
        <div class="jc-match-filter">
          <span class="jc-match-filter__label">联赛筛选：</span>
          <el-select
            v-model="selectedWdlLeagues"
            size="small"
            multiple
            clearable
            filterable
            collapse-tags
            placeholder="全部联赛"
            style="width: 280px"
          >
            <el-option v-for="l in matchLeagues" :key="l" :label="l" :value="l" />
          </el-select>
        </div>
        <el-table :data="leagueWdlRows" size="small" border stripe>
          <el-table-column type="index" label="#" width="50" align="center" />
          <el-table-column prop="league" label="联赛" min-width="120" />
          <el-table-column prop="total" label="场次" width="80" align="center" />
          <el-table-column label="胜" min-width="120" align="center" sortable :sort-method="sortByField('胜率')">
            <template slot-scope="{ row }">
              <span class="jc-wdl__tag jc-wdl__tag--胜">胜</span>
              <span class="jc-league-count">{{ row['胜'] }}场</span>
              <div class="jc-league-bar">
                <div class="jc-league-bar__inner jc-league-bar__inner--胜" :style="{ width: row['胜率'] + '%' }" />
              </div>
              <span class="jc-pct">{{ row['胜率'] }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="平" min-width="120" align="center" sortable :sort-method="sortByField('平率')">
            <template slot-scope="{ row }">
              <span class="jc-wdl__tag jc-wdl__tag--平">平</span>
              <span class="jc-league-count">{{ row['平'] }}场</span>
              <div class="jc-league-bar">
                <div class="jc-league-bar__inner jc-league-bar__inner--平" :style="{ width: row['平率'] + '%' }" />
              </div>
              <span class="jc-pct">{{ row['平率'] }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="负" min-width="120" align="center" sortable :sort-method="sortByField('负率')">
            <template slot-scope="{ row }">
              <span class="jc-wdl__tag jc-wdl__tag--负">负</span>
              <span class="jc-league-count">{{ row['负'] }}场</span>
              <div class="jc-league-bar">
                <div class="jc-league-bar__inner jc-league-bar__inner--负" :style="{ width: row['负率'] + '%' }" />
              </div>
              <span class="jc-pct">{{ row['负率'] }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="正" min-width="120" align="center" sortable :sort-method="sortByField('正率')">
            <template slot-scope="{ row }">
              <span class="jc-wdl__tag jc-wdl__tag--正">正</span>
              <span class="jc-league-count">{{ row['正'] }}场</span>
              <div class="jc-league-bar">
                <div class="jc-league-bar__inner jc-league-bar__inner--正" :style="{ width: row['正率'] + '%' }" />
              </div>
              <span class="jc-pct">{{ row['正率'] }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="冷" min-width="120" align="center" sortable :sort-method="sortByField('冷率')">
            <template slot-scope="{ row }">
              <span class="jc-wdl__tag jc-wdl__tag--冷">冷</span>
              <span class="jc-league-count">{{ row['冷'] }}场</span>
              <div class="jc-league-bar">
                <div class="jc-league-bar__inner jc-league-bar__inner--冷" :style="{ width: row['冷率'] + '%' }" />
              </div>
              <span class="jc-pct">{{ row['冷率'] }}%</span>
            </template>
          </el-table-column>
        </el-table>
        <el-empty v-if="!leagueWdlRows.length" description="当前区间无已开奖比赛" />
      </el-tab-pane>
    </el-tabs>

    <!-- 比分详情遮罩弹窗 -->
    <BifenDetail
      v-model="detail.visible"
      :score="detail.score"
      :start="range[0]"
      :end="range[1]"
      :mode="detail.mode"
      :week="detail.week"
      :date-range="detail.dateRange"
    />

    <!-- 胜平负详情遮罩弹窗 -->
    <WinloseDetail
      v-model="wdlDetail.visible"
      :outcome="wdlDetail.outcome"
      :start="range[0]"
      :end="range[1]"
      :mode="wdlDetail.mode"
      :week="wdlDetail.week"
      :date-range="wdlDetail.dateRange"
    />
  </div>
</template>

<script>
import {
  fetchMatches,
  fetchScoreOdds,
  extractScoreOdds,
  groupByWeek,
  groupByDay,
  sizeBucket,
  SIZE_BUCKETS,
  fmt,
  WDL_MAP
} from '@/api/football'
import BifenDetail from './bifenDetail.vue'
import WinloseDetail from './winloseDetail.vue'

// 场次筛选区间
const COUNT_RANGES = [
  { key: '1-3', label: '1-3 场', min: 1, max: 3 },
  { key: '4-6', label: '4-6 场', min: 4, max: 6 },
  { key: '7+', label: '7 场以上', min: 7, max: Infinity }
]

// 概率筛选区间
const PROB_RANGES = [
  { key: '0-3', label: '0-3%', min: 0, max: 3 },
  { key: '3-6', label: '3-6%', min: 3, max: 6 },
  { key: '6-10', label: '6-10%', min: 6, max: 10 },
  { key: '10+', label: '10% 以上', min: 10, max: Infinity }
]

// 全场总进球数筛选区间
const GOAL_RANGES = [
  { key: '0', label: '0 球', min: 0, max: 0 },
  { key: '1', label: '1 球', min: 1, max: 1 },
  { key: '2', label: '2 球', min: 2, max: 2 },
  { key: '3', label: '3 球', min: 3, max: 3 },
  { key: '4', label: '4 球', min: 4, max: 4 },
  { key: '5', label: '5 球', min: 5, max: 5 },
  { key: '6', label: '6 球', min: 6, max: 6 },
  { key: '7+', label: '7 球以上', min: 7, max: Infinity }
]

// 由比分字符串 "X:Y" 换算全场总进球
function scoreGoals(score) {
  const [h, a] = score.split(':').map(Number)
  return h + a
}

// 胜平负展示顺序
const WDL_KEYS = ['胜', '平', '负']

export default {
  name: 'FootballJingcai',
  components: { BifenDetail, WinloseDetail },
  data() {
    return {
      range: [],
      activeQuick: 8,
      loading: false,
      errorMsg: '',
      matches: [],
      totalMatches: 0,
      lastUpdateTime: '',
      tab: 'size',
      selectedScores: [],
      selectedCountRanges: [],
      selectedProbRanges: [],
      selectedGoalRanges: [],
      // 比分详情弹窗参数
      detail: { visible: false, score: '', mode: 'week', week: '', dateRange: [] },
      // 胜平负详情弹窗参数
      wdlDetail: { visible: false, outcome: '', mode: 'week', week: '', dateRange: [] },
      // 比赛详情 tab：联赛筛选（多选，空数组=全部）
      selectedLeagues: [],
      // 联赛胜平负 tab：联赛筛选（多选，空数组=全部）
      selectedWdlLeagues: [],
      // 比赛详情 tab：主队/客队列筛选的选中值（两列取合集）
      homeTeamFilter: [],
      awayTeamFilter: [],
      // 比分赔率开关：打开才逐场计算并展示比分赔率
      calcScoreOdds: false,
      scoreOddsMap: {},
      scoreOddsLoading: false,
      COUNT_RANGES,
      PROB_RANGES,
      GOAL_RANGES,
      SIZE_BUCKETS,
      WDL_KEYS,
      // 图表配置
      sizeSettings: {
        stack: { '总进球': SIZE_BUCKETS }
      }
    }
  },
  computed: {
    isCustom() {
      return this.activeQuick === 0
    },
    // 大小球柱状图 extend 配置（computed 以便响应式访问）
    sizeExtend() {
      const periods = this.periods
      return {
        series: {
          type: 'bar',
          stack: '总进球',
          barWidth: '60%',
          label: {
            show: true,
            formatter: p => {
              if (!p.value) return ''
              const total = periods[p.dataIndex]?.matches?.length || 0
              const count = Math.round(p.value * total / 100)
              return `${count}场 ${p.value}%`
            }
          }
        },
        legend: { top: 0 },
        grid: { top: 40, left: 50, right: 20, bottom: 40 }
      }
    },
    // 快捷模式按周分组，自定义模式按天分组
    periods() {
      return this.isCustom ? groupByDay(this.matches) : groupByWeek(this.matches)
    },
    // 图表/表头 X 轴维度名
    axisKey() {
      return this.isCustom ? '日期' : '周次'
    },
    scoreMatches() {
      return this.matches.filter(m => m.full).length
    },
    // 大小球：每周期 x 各档占比（百分比堆叠）
    sizeChart() {
      const axisKey = this.axisKey
      const rows = this.periods.map(p => {
        const counts = { '0-1球': 0, '2-3球': 0, '4-5球': 0, '6+球': 0 }
        let scored = 0
        p.matches.forEach(m => {
          if (!m.full) return
          scored++
          counts[sizeBucket(m.full.total)]++
        })
        const row = { [axisKey]: `${p.label} (${p.matches.length}场)` }
        SIZE_BUCKETS.forEach(b => {
          row[b] = scored ? Math.round((counts[b] / scored) * 1000) / 10 : 0
        })
        return row
      })
      const columns = [axisKey, ...SIZE_BUCKETS]
      return { columns, rows }
    },
    // 饼图容器高度：根据饼图数量自适应
    // 单个时较大（480px），多个时随数量增加适度缩小，保持视觉协调
    pieHeight() {
      const n = this.scorePies.length
      if (n <= 1) return '460px'
      if (n <= 2) return '420px'
      if (n <= 4) return '380px'
      if (n <= 6) return '340px'
      return '300px'
    },
    // 比分概率分布（饼图数组）
    // 全区间所有可选比分（按出现频次降序）
    scoreOptions() {
      const freq = new Map()
      this.matches.forEach(m => {
        if (!m.full) return
        const key = `${m.full.home}:${m.full.away}`
        freq.set(key, (freq.get(key) || 0) + 1)
      })
      return [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([score]) => score)
    },
    // 自定义模式：全区间一个饼图；周模式：每周一个饼图
    scorePies() {
      const isCustom = this.isCustom
      const selectedScores = this.selectedScores
      const countRanges = this.selectedCountRanges.map(key => COUNT_RANGES.find(r => r.key === key))
        .filter(Boolean)
      const probRanges = this.selectedProbRanges.map(key => PROB_RANGES.find(r => r.key === key))
        .filter(Boolean)
      const goalRanges = this.selectedGoalRanges.map(key => GOAL_RANGES.find(r => r.key === key))
        .filter(Boolean)

      const groups = isCustom
        ? [{ label: '', matches: this.matches }]
        : this.periods.map(p => ({ label: `${p.label} (${p.matches.length}场)`, matches: p.matches }))

      return groups
        .map(g => {
          const scored = g.matches.filter(m => m.full)
          const total = scored.length

          // 统计当前周期所有比分出现次数
          const freq = new Map()
          scored.forEach(m => {
            const key = `${m.full.home}:${m.full.away}`
            freq.set(key, (freq.get(key) || 0) + 1)
          })

          // 获取要展示的比分条目
          let entries
          if (selectedScores.length > 0) {
            entries = selectedScores.map(score => [score, freq.get(score) || 0])
          } else {
            entries = [...freq.entries()]
            if (!entries.length) return null
          }

          // 场次筛选（多选 OR）
          if (countRanges.length > 0) {
            entries = entries.filter(([, count]) =>
              countRanges.some(r => count >= r.min && count <= r.max)
            )
          }

          // 概率筛选（多选 OR）
          if (probRanges.length > 0) {
            entries = entries.filter(([, count]) => {
              const pct = total ? Math.round((count / total) * 1000) / 10 : 0
              return probRanges.some(r => pct >= r.min && pct <= r.max)
            })
          }

          // 进球数筛选（多选 OR），按比分换算全场总进球
          if (goalRanges.length > 0) {
            entries = entries.filter(([score]) => {
              const goals = scoreGoals(score)
              return goalRanges.some(r => goals >= r.min && goals <= r.max)
            })
          }

          const countsMap = {}
          const rows = entries
            .sort((a, b) => b[1] - a[1])
            .map(([score, count]) => {
              const pct = total ? Math.round((count / total) * 1000) / 10 : 0
              const label = `${score} (${pct}%)`
              countsMap[label] = count
              return { 比分: label, 概率: pct, 次数: count }
            })

          // 该饼图实际比赛覆盖的日期范围（YYYY-MM-DD，按字符串比较），
          // 详情弹窗据此精确限定时间：周被查询区间截断时即为周的局部
          let dMin = null
          let dMax = null
          g.matches.forEach(m => {
            if (!m.matchDate) return
            if (dMin === null || m.matchDate < dMin) dMin = m.matchDate
            if (dMax === null || m.matchDate > dMax) dMax = m.matchDate
          })

          // 不返回 null：即使筛选后无数据也保留饼图
          return {
            label: g.label,
            // 周模式记录该周起始日期，供饼图点击跳转详情时定位到对应周
            weekKey: g.weekStart ? fmt(g.weekStart) : '',
            // 该饼图实际覆盖的起止日期
            dateRange: dMin && dMax ? [dMin, dMax] : [],
            data: { columns: ['比分', '概率', '次数'], rows },
            settings: {
              labelMap: { 比分: '比分', 概率: '出现概率(%)' },
              dimensionIndex: 1
            },
            extend: {
              legend: {
                type: 'scroll',
                top: 0,
                left: 'center',
                textStyle: { fontSize: 11 },
                show: selectedScores.length === 0 || entries.length > 1
              },
              tooltip: {
                formatter: params => {
                  const item = Array.isArray(params) ? params[0] : params
                  const score = item.name.split(' (')[0]
                  return `${score}<br/>次数：${countsMap[item.name]}次<br/>概率：${item.value}%`
                }
              },
              series: {
                label: {
                  formatter: p => {
                    const score = p.name.split(' (')[0]
                    return `${score} (${countsMap[p.name]}次)`
                  }
                }
              }
            }
          }
        })
        .filter(Boolean)
    },
    periodDetail() {
      return this.periods.map(p => {
        const sizeCount = { '0-1球': 0, '2-3球': 0, '4-5球': 0, '6+球': 0 }
        const scoreCount = new Map()
        const wdl = { 胜: 0, 平: 0, 负: 0 }
        let scored = 0
        let wdlScored = 0
        p.matches.forEach(m => {
          if (!m.full) return
          scored++
          sizeCount[sizeBucket(m.full.total)]++
          const key = `${m.full.home}:${m.full.away}`
          scoreCount.set(key, (scoreCount.get(key) || 0) + 1)
          const outcome = WDL_MAP[m.winFlag]
          if (outcome) {
            wdlScored++
            wdl[outcome]++
          }
        })
        const sizePct = {}
        SIZE_BUCKETS.forEach(b => {
          sizePct[b] = scored ? Math.round((sizeCount[b] / scored) * 100) : 0
        })
        // 胜平负概率（以有胜平负结果的场次为分母）
        const wdlPct = {}
        WDL_KEYS.forEach(k => {
          wdlPct[k] = wdlScored ? Math.round((wdl[k] / wdlScored) * 100) : 0
        })
        const topScores = [...scoreCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([score, count]) => ({ score, count }))
        // 自定义（按天）模式下，日期右侧加括号标注星期几；周模式无单日不标注
        const label = p.date ? `${p.label} (${this.weekdayOf(p.date)})` : p.label
        // 该周期实际覆盖的日期范围（按 YYYY-MM-DD 字符串比较），
        // 胜平负详情弹窗据此精确限定时间（周被查询区间截断时即为周的局部）
        let dMin = null
        let dMax = null
        p.matches.forEach(m => {
          if (!m.matchDate) return
          if (dMin === null || m.matchDate < dMin) dMin = m.matchDate
          if (dMax === null || m.matchDate > dMax) dMax = m.matchDate
        })
        return {
          label,
          count: p.matches.length,
          sizeCount,
          sizePct,
          wdl,
          wdlPct,
          topScores,
          weekKey: p.weekStart ? fmt(p.weekStart) : '',
          dateRange: dMin && dMax ? [dMin, dMax] : []
        }
      })
    },
    // 比赛详情 tab：当前区间内出现的联赛（按拼音/字符排序去重）
    matchLeagues() {
      const set = new Set()
      this.matches.forEach(m => {
        if (m.league) set.add(m.league)
      })
      return [...set].sort()
    },
    // 联赛胜平负 tab：按联赛筛选后的结果（空数组即全部）
    leagueWdlRows() {
      if (!this.selectedWdlLeagues.length) return this.leagueWdl
      return this.leagueWdl.filter(r => this.selectedWdlLeagues.includes(r.league))
    },
    // 比赛详情 tab：按联赛筛选后的比赛（多选 OR，空数组即全部）
    matchRows() {
      if (!this.selectedLeagues.length) return this.matches
      return this.matches.filter(m => this.selectedLeagues.includes(m.league))
    },
    // 比赛详情 tab：主队/客队筛选后的比赛（两列取合集：主队在选中集合 或 客队在选中集合）
    teamRows() {
      const home = this.homeTeamFilter
      const away = this.awayTeamFilter
      if (!home.length && !away.length) return this.matchRows
      return this.matchRows.filter(m => home.includes(m.homeTeam) || away.includes(m.awayTeam))
    },
    // 比赛详情 tab：比分列筛选选项（当前展示行里出现过的比分，按频次降序）
    matchScoreFilters() {
      const freq = {}
      this.matchRows.forEach(m => {
        if (!m.full) return
        const key = `${m.full.home}:${m.full.away}`
        freq[key] = (freq[key] || 0) + 1
      })
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([score]) => ({ text: score, value: score }))
    },
    // 比赛详情 tab：主队列筛选选项（当前展示行里出现过的队伍，按频次降序）
    homeTeamFilters() {
      const freq = {}
      this.matchRows.forEach(m => {
        if (!m.homeTeam) return
        freq[m.homeTeam] = (freq[m.homeTeam] || 0) + 1
      })
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([team]) => ({ text: team, value: team }))
    },
    // 比赛详情 tab：客队列筛选选项（当前展示行里出现过的队伍，按频次降序）
    awayTeamFilters() {
      const freq = {}
      this.matchRows.forEach(m => {
        if (!m.awayTeam) return
        freq[m.awayTeam] = (freq[m.awayTeam] || 0) + 1
      })
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .map(([team]) => ({ text: team, value: team }))
    },
    // 联赛胜平负：按当前加载区间内的已开奖场次，统计各联赛胜/平/负及正/冷场数与占比
    leagueWdl() {
      const map = new Map()
      this.matches.forEach(m => {
        if (!m.full) return
        const outcome = WDL_MAP[m.winFlag]
        if (!outcome) return
        const league = m.league || '未知'
        if (!map.has(league)) {
          map.set(league, { league, total: 0, 胜: 0, 平: 0, 负: 0, 正: 0, 冷: 0, hotTotal: 0 })
        }
        const row = map.get(league)
        row.total++
        row[outcome]++
        // 正/冷：结果赔率是否为胜平负三项中最低（与场次详情 isColdResult 同一标准；缺赔率不计入）
        const { h, d, a } = m.odds || {}
        const target = { 胜: h, 平: d, 负: a }[outcome]
        const present = target !== undefined && target !== '' && target !== null
        const nums = present ? [h, d, a].map(Number).filter(n => !Number.isNaN(n)) : []
        if (present && nums.length) {
          row.hotTotal++
          if (Number(target) > Math.min(...nums)) row['冷']++
          else row['正']++
        }
      })
      return [...map.values()]
        .map(r => ({
          ...r,
          胜率: r.total ? Math.round((r['胜'] / r.total) * 1000) / 10 : 0,
          平率: r.total ? Math.round((r['平'] / r.total) * 1000) / 10 : 0,
          负率: r.total ? Math.round((r['负'] / r.total) * 1000) / 10 : 0,
          正率: r.hotTotal ? Math.round((r['正'] / r.hotTotal) * 1000) / 10 : 0,
          冷率: r.hotTotal ? Math.round((r['冷'] / r.hotTotal) * 1000) / 10 : 0
        }))
        .sort((a, b) => b.total - a.total)
    },
    // 当前加载区间文案（用于提示）
    rangeText() {
      return this.range && this.range.length === 2 ? `${this.range[0]} ~ ${this.range[1]}` : ''
    }
  },
  watch: {
    // 联赛筛选变化时清除比分筛选，避免选中比分在新联赛里不存在导致空表
    selectedLeagues() {
      this.$nextTick(() => {
        if (this.$refs.matchTable) this.$refs.matchTable.clearFilter()
      })
      // 未选任何联赛（全部联赛）时强制关闭比分赔率，避免一次计算所有场次，需手动打开
      if (!this.selectedLeagues.length) {
        this.calcScoreOdds = false
        this.scoreOddsMap = {}
        this.scoreOddsLoading = false
        return
      }
      // 比分赔率开关打开时，补拉新联赛里尚未取到赔率的场次
      if (this.calcScoreOdds) this.fetchScoreOddsForRows(this.matchRows)
    }
  },
  created() {
    this.onQuick(8)
  },
  methods: {
    addDays(date, n) {
      const d = new Date(date)
      d.setDate(d.getDate() + n)
      return d
    },
    // 由 Date 计算星期中文（本地时区，避免字符串构造的偏移）
    weekdayOf(d) {
      if (!d) return '-'
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]
    },
    // 由 YYYY-MM-DD 字符串算星期中文（按年月日数字构造，避免时区偏移）
    weekdayOfMatch(dateStr) {
      if (!dateStr) return '-'
      const [y, m, d] = dateStr.split('-').map(Number)
      if (!y || !m || !d) return '-'
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date(y, m - 1, d).getDay()]
    },
    // 胜平负：由 winFlag 转中文，未知返回 '-'
    wdlOf(m) {
      return WDL_MAP[m.winFlag] || '-'
    },
    // 比分列筛选：命中该比分的行保留
    filterMatchScore(value, row) {
      if (!row.full) return false
      return `${row.full.home}:${row.full.away}` === value
    },
    // 主队/客队列筛选：实际过滤在 teamRows 中按"合集"处理，这里返回 true 让 el-table 不再列内过滤
    filterTeamUnion() {
      return true
    },
    // 主队/客队列筛选变更：el-table 的 filter-change 只带当前变更列，只更新出现的那一列，避免覆盖另一列
    onTeamFilterChange(filters) {
      if ('home' in filters) this.homeTeamFilter = filters.home || []
      if ('away' in filters) this.awayTeamFilter = filters.away || []
    },
    // 联赛胜平负表：按指定字段（胜/平/负/正/冷）的场数排序
    sortByField(field) {
      return (a, b) => a[field] - b[field]
    },
    // 胜平负列：赛果的赔率不是三者最小值时标"冷"（冷门）；赛果或赔率缺失则不标
    isColdResult(m) {
      const { h, d, a } = m.odds || {}
      const result = WDL_MAP[m.winFlag]
      if (!result) return false
      const target = { 胜: h, 平: d, 负: a }[result]
      const present = target !== undefined && target !== '' && target !== null
      if (!present) return false
      const nums = [h, d, a].map(Number).filter(n => !Number.isNaN(n))
      if (!nums.length) return false
      return Number(target) > Math.min(...nums)
    },
    // 比分赔率开关：打开则对当前列表逐场计算比分赔率；关闭则清空不展示
    async onCalcScoreOdds(val) {
      if (!val) {
        this.scoreOddsMap = {}
        return
      }
      await this.fetchScoreOddsForRows(this.matchRows)
    },
    // 逐场串行拉取比分赔率并写入 scoreOddsMap
    // （复用接口层 matchId 缓存，重复打开/切换联赛不重复请求；串行+间隔避免触发体彩限流）
    async fetchScoreOddsForRows(rows) {
      if (this.scoreOddsLoading) return
      this.scoreOddsLoading = true
      try {
        for (const r of rows) {
          if (!r.full || !r.matchId) continue
          if (this.scoreOddsMap[r.matchId]) continue
          let odds = null
          try {
            const v = await fetchScoreOdds(r.matchId)
            odds = v ? extractScoreOdds(v, r.full.home, r.full.away) : null
          } catch (e) {
            // 可能被限流，稍等后重试一次
            await new Promise(res => setTimeout(res, 1200))
            try {
              const v = await fetchScoreOdds(r.matchId)
              odds = v ? extractScoreOdds(v, r.full.home, r.full.away) : null
            } catch (e2) { /* 仍失败则保持 null */ }
          }
          this.scoreOddsMap = { ...this.scoreOddsMap, [r.matchId]: odds }
          await new Promise(res => setTimeout(res, 400))
        }
      } finally {
        this.scoreOddsLoading = false
      }
    },
    onTabClick(tab) {
      // ECharts 在隐藏容器中初始化时尺寸为 0，切到该 tab 后派发 resize 事件强制重绘
      const name = typeof tab === 'object' ? tab.name : tab
      if (name === 'score' || name === 'size' || name === 'detail') {
        this.$nextTick(() => {
          setTimeout(() => window.dispatchEvent(new Event('resize')), 30)
        })
      }
    },
    // 每个饼图绑定自己的 click 事件（闭包捕获该饼图对应的周期）
    pieEvents(pie) {
      return {
        click: params => this.onPieClick(pie, params)
      }
    },
    // 点击饼图扇区 -> 遮罩弹窗展示该比分在该饼图周期内的比赛详情
    onPieClick(pie, params) {
      const name = params && (params.name || (params.data && params.data.name))
      if (!name) return
      const score = String(name).split(' (')[0]
      if (!score || !this.range || this.range.length !== 2) return
      this.detail = {
        visible: true,
        score,
        mode: this.isCustom ? 'day' : 'week',
        // 周模式：带上该饼图对应周的起始日期，弹窗内据此过滤到该周
        week: pie.weekKey || '',
        // 该饼图实际覆盖的起止日期，弹窗内据此精确限定时间
        dateRange: pie.dateRange || []
      }
    },
    // 点击周明细/日明细里的胜平负场数 -> 遮罩弹窗展示该结果在该周期内的比赛详情
    onWdlClick(row, k) {
      if (!this.range || this.range.length !== 2) return
      this.wdlDetail = {
        visible: true,
        outcome: k,
        mode: this.isCustom ? 'day' : 'week',
        // 该周期实际覆盖的起止日期，弹窗内据此精确限定时间
        week: row.weekKey || '',
        dateRange: row.dateRange || []
      }
    },
    onQuick(weeks) {
      this.activeQuick = weeks
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const start = this.addDays(today, -weeks * 7 + 1)
      this.range = [fmt(start), fmt(today)]
      this.query()
    },
    onCustom() {
      // 切到自定义模式：保留当前区间供用户修改，但不自动查询
      this.activeQuick = 0
      // 自定义模式只有 1 个饼图，布局从多列变为单列，
      // 若当前正停留在比分 tab，需派发 resize 让饼图撑满整行宽度
      this.$nextTick(() => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 30)
      })
    },
    onRangeChange(val) {
      // 自定义模式下，修改日期后自动查询
      if (this.activeQuick === 0 && val && val.length === 2) {
        this.query()
      }
    },
    async query() {
      if (!this.range || this.range.length !== 2) {
        this.errorMsg = '请选择日期区间'
        return
      }
      this.loading = true
      this.errorMsg = ''
      try {
        const [start, end] = this.range
        const { matches, total, lastUpdateTime } = await fetchMatches(start, end)
        this.matches = matches
        this.totalMatches = total
        this.lastUpdateTime = lastUpdateTime
        // 数据换新后清除比分筛选，避免残留
        this.$nextTick(() => {
          if (this.$refs.matchTable) this.$refs.matchTable.clearFilter()
        })
        // 比分赔率开关打开时，补拉新区间里尚未取到赔率的场次
        if (this.calcScoreOdds) this.fetchScoreOddsForRows(this.matchRows)
        if (!matches.length) this.errorMsg = '该区间内无比赛数据'
      } catch (e) {
        this.errorMsg = '查询失败：' + (e.message || e)
        this.matches = []
        this.totalMatches = 0
        this.lastUpdateTime = ''
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.jc-page {
  padding: 16px 20px;
  color: #333;
}
.jc-filter {
  background: #fff;
  padding: 14px 16px;
  border-radius: 6px;
  margin-bottom: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    &:last-child { margin-bottom: 0; }
  }
  &__label {
    font-size: 13px;
    color: #666;
    white-space: nowrap;
  }
}
.jc-error {
  color: #f56c6c;
  margin-left: 10px;
  font-size: 13px;
}
.jc-stats {
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
  &__item {
    flex: 1;
    background: #fff;
    border-radius: 6px;
    padding: 14px 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__num {
    font-size: 26px;
    font-weight: 600;
    color: #409eff;
    line-height: 1.2;
    &--sm { font-size: 15px; color: #888; font-weight: 500; }
  }
  &__label {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
}
.jc-tabs {
  background: #fff;
  padding: 10px 16px 20px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.jc-chart-hint {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}
.jc-score-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}
.jc-score-filter__group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.jc-score-filter__label {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
}
.jc-score-pies {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.jc-score-pies--single {
  grid-template-columns: 1fr;
}
.jc-score-pie-block {
  min-width: 0;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
}
.jc-score-pie-title {
  text-align: center;
  font-size: 13px;
  color: #606266;
  font-weight: 500;
  margin-bottom: 4px;
}
.jc-score-pie-empty {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 13px;
}
.jc-match-filter {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  &__label {
    font-size: 13px;
    color: #666;
    white-space: nowrap;
  }
  &__count {
    font-size: 12px;
    color: #999;
  }
}
.jc-full {
  font-weight: 600;
  font-size: 14px;
}
.jc-odds {
  display: inline-block;
  font-size: 12px;
  margin: 0 3px;
  &--h { color: #67c23a; }
  &--d { color: #909399; }
  &--a { color: #f56c6c; }
}
.jc-cold {
  font-style: normal;
  color: #9c27b0;
  font-size: 12px;
}
.jc-score-odds {
  font-weight: 600;
  color: #409eff;
}
.jc-match-filter__group {
  display: flex;
  align-items: center;
  gap: 6px;
}
.jc-pct {
  color: #999;
  font-size: 12px;
}
.jc-league-count {
  font-weight: 600;
  font-size: 13px;
}
.jc-league-bar {
  height: 4px;
  background: #f4f4f5;
  border-radius: 2px;
  margin: 4px 0 3px;
  overflow: hidden;
  &__inner {
    height: 100%;
    border-radius: 2px;
    &--胜 { background: #67c23a; }
    &--平 { background: #909399; }
    &--负 { background: #f56c6c; }
    &--正 { background: #409eff; }
    &--冷 { background: #9c27b0; }
  }
}
.jc-wdl {
  line-height: 1.9;
  white-space: nowrap;
  &__count {
    color: #409eff;
    cursor: pointer;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
  &__tag {
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 3px;
    font-size: 12px;
    margin-right: 6px;
    &--胜 { background: #f0f9eb; color: #67c23a; }
    &--平 { background: #f4f4f5; color: #909399; }
    &--负 { background: #fef0f0; color: #f56c6c; }
    &--正 { background: #ecf5ff; color: #409eff; }
    &--冷 { background: #f3e5f5; color: #9c27b0; }
  }
}
</style>
