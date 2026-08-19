# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 2 sandbox/experiment project ("ceshi") for testing and prototyping various UI features, libraries, and CSS effects. This is not a production app — it's a learning and demo playground.

## Commands

- **Dev server:** `npm run serve`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **SVG icons:** `npm run svg` (generates SVG icon components from `src/assets/svg` into `src/icons`)

No test suite exists in this project.

## Architecture

**Vue 2 + Vue CLI 5** app with hash-mode routing. Path alias `@` maps to `src/`.

### Key libraries
- **Element UI** — primary UI component library
- **v-charts** (wraps echarts 4.x) — chart components
- **@jiaminghi/data-view** — DataV border/chart components for dashboard-style layouts
- **vue-i18n** — bilingual (zh/en) i18n, locale persisted in localStorage
- **vue-dplayer + hls.js** — video playback (HLS streaming)
- **vue-svgicon** — SVG icon system

### Directory layout
- `src/router/index.js` — All routes defined in a flat `routesData` array with lazy-loaded components. No nested route structure or layout wrappers.
- `src/views/50projects/` — 41 standalone CSS/JS demo pages (01–41project.vue), each implementing a single UI effect from the "50 Projects" series
- `src/views/zujian/` — Component demos (autocomplete, cascader, tabpane, layout variants)
- `src/views/` (root level) — Misc demos: video players, i18n, layouts, reactive experiments
- `src/Plugins/` — Vue plugin registrations: DataV components (`datav.js`), echarts/v-charts (`echartV.js`, mostly commented out), DPlayer (`dyPlayerV.js`)
- `src/i18n/` — i18n setup with `config/zh.js` and `config/en.js` language packs, Element UI locale integration
- `src/components/` — Reusable components: HelloWorld, DataV wrapper, EchartsV wrapper, IconPicker
- `src/icons/` — Auto-generated SVG icon registration (via `vue-svgicon`)
- `src/assets/svg/` — Source SVG files for icon generation
- `src/utils/icons.js` — Manual icon registration helper
- `src/js/studentForm.js` — D365 integration snippet (SangforJS)

### Notable patterns
- `vue.config.js` disables lint-on-save (`lintOnSave: false`)
- ESLint config is inline in `package.json` (not a separate `.eslintrc` file), extends `plugin:vue/essential` + `eslint:recommended`
- App.vue has several imported components that are currently commented out in the template — only `<router-view>` is active
- Router has a push-error suppression hack (`VueRouter.prototype.push` catch)
- `Vue._watchers = Vue.prototype._watchers = []` in main.js is a workaround for an echarts 4.x + v-charts + bmap console error