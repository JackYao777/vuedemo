import axios from 'axios'

// 体彩足球赛果接口（dev 代理：/sporttery-api -> https://webapi.sporttery.cn）
const BASE = '/sporttery-api/gateway/uniform/football/getUniformMatchResultV1.qry'

/**
 * 解析比分字符串 "1:2" -> { home: 1, away: 2, total: 3 }
 * 未开奖/异常返回 null
 */
function parseScore(str) {
  if (!str || typeof str !== 'string') return null
  const parts = str.split(':')
  if (parts.length !== 2) return null
  const home = parseInt(parts[0], 10)
  const away = parseInt(parts[1], 10)
  if (Number.isNaN(home) || Number.isNaN(away)) return null
  return { home, away, total: home + away }
}

/**
 * 取某单页数据
 */
async function fetchPage({ startDate, endDate, pageNo = 1, pageSize = 30 }) {
  const params = {
    matchBeginDate: startDate,
    matchEndDate: endDate,
    leagueId: '',
    pageSize,
    pageNo,
    isFix: 0,
    matchPage: 1,
    pcOrWap: 1
  }
  const { data } = await axios.get(BASE, { params })
  // 体彩接口 errorCode 可能为字符串 "0"，用宽松比较
  if (data.errorCode != 0) {
    throw new Error(data.errorMessage || `接口返回错误码 ${data.errorCode}`)
  }
  return data.value || {}
}

/**
 * 分页拉取整段日期内的全部比赛，返回归一化后的数组
 * 每条: { matchDate, league, homeTeam, awayTeam, half, full, winFlag, totalGoals }
 */
export async function fetchMatches(startDate, endDate, onProgress) {
  const all = []
  let pageNo = 1
  const pageSize = 30
  // 先取第一页拿到 total / pages
  const first = await fetchPage({ startDate, endDate, pageNo, pageSize })
  const total = first.total || 0
  const pages = first.pages || 1
  const lastUpdateTime = first.lastUpdateTime || ''
  let list = Array.isArray(first.matchResult) ? first.matchResult : []
  all.push(...list)
  if (onProgress) onProgress(all.length, total)
  for (pageNo = 2; pageNo <= pages; pageNo++) {
    const v = await fetchPage({ startDate, endDate, pageNo, pageSize })
    list = Array.isArray(v.matchResult) ? v.matchResult : []
    all.push(...list)
    if (onProgress) onProgress(all.length, total)
    if (!list.length) break
  }
  const normalized = all.map(m => ({
    matchDate: m.matchDate,
    league: m.leagueNameAbbr || m.leagueName || '',
    homeTeam: m.homeTeam || m.allHomeTeam || '',
    awayTeam: m.awayTeam || m.allAwayTeam || '',
    half: parseScore(m.sectionsNo1),
    full: parseScore(m.sectionsNo999),
    winFlag: m.winFlag || '',
    matchNum: m.matchNum || m.matchNumStr || '',
    matchId: m.matchId,
    // 胜平负赔率（主胜/平/客胜）
    odds: { h: m.h, d: m.d, a: m.a },
    // 让球数
    goalLine: m.goalLine || '',
    // 单关标识：1=单关
    bettingSingle: m.bettingSingle,
    raw: m
  }))
  return { matches: normalized, total, lastUpdateTime }
}

/**
 * 胜平负：接口 winFlag H=主胜 D=平 A=客胜（即主负）
 */
export const WDL_MAP = { H: '胜', D: '平', A: '负' }

/**
 * 获取指定比赛的固定奖金/赔率（含比分赔率 crsList、胜平负 hadList 等）
 * matchId 与赛果接口返回的 matchId 一致，历史已结束比赛也可查询
 */
// 固定奖金接口按 matchId 缓存（同场比赛多次打开详情/跨比分共享时不重复请求）
const _scoreOddsCache = new Map()

export async function fetchScoreOdds(matchId) {
  if (!matchId) return null
  if (_scoreOddsCache.has(matchId)) return _scoreOddsCache.get(matchId)
  const params = { clientCode: '3001', matchId }
  const { data } = await axios.get(
    '/sporttery-api/gateway/uniform/football/getFixedBonusV1.qry',
    { params }
  )
  if (data.errorCode != 0) {
    throw new Error(data.errorMessage || `接口返回错误码 ${data.errorCode}`)
  }
  const value = data.value || null
  _scoreOddsCache.set(matchId, value)
  return value
}

/**
 * 从 getFixedBonusV1 返回的 value 中取某比分（主队 home 客队 away）的赔率
 * 标准比分键为 sHHsAA（如 s02s02=2:2）；非标准比分归入胜/平/负其它
 * crsList 取最后一期（临场/结算赔率）
 */
export function extractScoreOdds(value, home, away) {
  const oh = value && value.oddsHistory
  if (!oh || !Array.isArray(oh.crsList) || !oh.crsList.length) return null
  const crs = oh.crsList[oh.crsList.length - 1]
  const H = String(home).padStart(2, '0')
  const A = String(away).padStart(2, '0')
  const key = `s${H}s${A}`
  if (crs[key] !== undefined) {
    return { odds: crs[key], bucket: `${home}:${away}`, isOther: false }
  }
  const bucket = home > away ? '胜其它' : home < away ? '负其它' : '平其它'
  const otherKey = home > away ? 's-1sh' : home < away ? 's-1sa' : 's-1sd'
  return { odds: crs[otherKey], bucket, isOther: true }
}

/**
 * 以周二为一周起始，返回该周周二日期 Date
 * 即周二~周一算作一周
 */
export function getWeekStart(date) {
  const d = new Date(date)
  // getDay(): 0=日 1=一 2=二 ... 6=六
  // 周二起始：偏移 = (当前星期 - 2 + 7) % 7
  const offset = (d.getDay() - 2 + 7) % 7
  d.setDate(d.getDate() - offset)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * 格式化日期 YYYY-MM-DD
 */
export function fmt(date) {
  const d = new Date(date)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/**
 * 生成周标签 "MM-DD~MM-DD"（周二~周一）
 */
export function weekLabel(tuesday) {
  const start = new Date(tuesday)
  const end = new Date(tuesday)
  end.setDate(end.getDate() + 6)
  const f = d => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return `${f(start)}~${f(end)}`
}

/**
 * 按周分组，返回 [{ weekStart: Date, label, matches: [...] }]，按时间升序
 */
export function groupByWeek(matches) {
  const map = new Map()
  matches.forEach(m => {
    if (!m.matchDate) return
    const start = getWeekStart(m.matchDate)
    const key = start.getTime()
    if (!map.has(key)) map.set(key, { weekStart: start, label: weekLabel(start), matches: [] })
    map.get(key).matches.push(m)
  })
  return [...map.values()].sort((a, b) => a.weekStart - b.weekStart)
}

/**
 * 按天分组，返回 [{ date: Date, label: 'MM-DD', matches: [...] }]，按时间升序
 */
export function groupByDay(matches) {
  const map = new Map()
  matches.forEach(m => {
    if (!m.matchDate) return
    const d = new Date(m.matchDate)
    d.setHours(0, 0, 0, 0)
    const key = d.getTime()
    if (!map.has(key)) {
      const label = `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      map.set(key, { date: d, label, matches: [] })
    }
    map.get(key).matches.push(m)
  })
  return [...map.values()].sort((a, b) => a.date - b.date)
}

/**
 * 大小球分档（按全场总进球）
 */
export function sizeBucket(totalGoals) {
  if (totalGoals <= 1) return '0-1球'
  if (totalGoals <= 3) return '2-3球'
  if (totalGoals <= 5) return '4-5球'
  return '6+球'
}

export const SIZE_BUCKETS = ['0-1球', '2-3球', '4-5球', '6+球']
