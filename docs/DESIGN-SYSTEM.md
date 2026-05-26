# TERM/UI Design System

终端 CLI 风格的 React 组件库。视觉语言基于 CRT 磷光屏 + Unix shell:等宽字体、方括号包动作、反相 hover、闪烁块光标、扫描线 overlay、主色辉光。

> 这份文档是这套设计系统的「规则书」。任何要在这个风格下做事的人或 AI 都应当先读这份。

---

## 1. Philosophy

**关键视觉签名**

- 全站等宽字体(`JetBrains Mono`),UI 控件也是等宽
- 动作用方括号包裹:`[ EXECUTE ]`
- hover = 反相视频(inverted video):背景填主色,文字变背景色
- 块状光标 `▮` 当心跳,blink 用 `steps(1)` 跳变而不是淡入淡出
- `border-radius: 0`,任何元素都不圆角
- 1px 实线边框,或 1px 虚线分隔
- 主色辉光:`text-shadow: 0 0 5px rgba(primary, .5)`
- CRT 扫描线全屏 overlay(覆盖整个视口,`pointer-events: none`)

**绝对红线**

1. **0 圆角**。任何元素。
2. **只支持深色**。不做 light mode。
3. **颜色读 token**。禁止硬编码 hex。
4. **组件 class 必须 `tm-` 前缀**。
5. **等宽字体覆盖全站**,包括 button / input / 表格。
6. **不引入 Tailwind / shadcn / Radix**。纯 CSS + CSS variables。

---

## 2. Tokens

### 2.1 Colour (4 phosphor presets + custom HEX)

每套预设是 `tokens.css` 里的一个 `[data-theme="..."]` 块,切换 = 改 `<html data-theme>` 一个属性。自定义取色靠 `colorUtils.js#generatePalette()` 从单个 hex 用 HSL 推导整套色板。

| Token | green (默认) | amber | ice | red |
|---|---|---|---|---|
| `--tm-bg` | `#0a0a0a` | `#0c0a06` | `#060810` | `#0c0606` |
| `--tm-bg-elevated` | `#101410` | `#15110a` | `#0c1020` | `#160a0a` |
| `--tm-bg-inset` | `#060806` | `#080603` | `#04050c` | `#080303` |
| `--tm-primary` | `#33ff00` | `#ffb000` | `#7df9ff` | `#ff3b3b` |
| `--tm-secondary` | `#ffb000` | `#33ff00` | `#c4b6ff` | `#ffb000` |
| `--tm-fg` | `#c6f9b8` | `#f4d79b` | `#bfe6ee` | `#f6b9b9` |
| `--tm-dim` | `#5f8f54` | `#9a7a3c` | `#5e8c98` | `#9a5454` |
| `--tm-muted` | `#1f521f` | `#5c3f12` | `#1f4450` | `#5c1f1f` |
| `--tm-border` | `#214a1c` | `#5a3f11` | `#1e4655` | `#5e2020` |
| `--tm-border-bright` | `#2f6e26` | `#7d5a1c` | `#2c6478` | `#842e2e` |
| `--tm-error` | `#ff3333` | `#ff5630` | `#ff5c7c` | `#ff8a3b` |

**色阶语义**(跨主题不变)

- `bg` 视口底 / `bg-elevated` pane · card / `bg-inset` input · 凹陷
- `primary` 强调 · 活跃 · 链接 · 辉光 / `secondary` 警告 · 次强调
- `fg` 正文 / `dim` 次要文本 / `muted` 失活 · 占位
- `border` 默认描边 / `border-bright` hover · 强化
- `error` 错误状态

### 2.2 Typography

```
font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace

text-xs:   11px    text-sm:  13px    text-base: 15px    text-md:  17px
text-lg:   21px    text-xl:  27px    text-2xl:  38px    text-3xl: 52px

leading-tight: 1.1    leading-snug: 1.35    leading-normal: 1.65
tracking-caps: 0.14em    tracking-wide: 0.04em
```

**规则**

- 标题、标签、按钮文字 → uppercase + `tracking-wide`
- 字号是离散刻度,不允许中间值(终端不做平滑字号)
- 字重只用 `400 / 700 / 800`,不用 `500/600`(避免 web 字体那种「半粗」感)

### 2.3 Spacing (4px 字符网格)

```
space-1: 4px    space-2: 8px    space-3: 12px    space-4: 16px
space-5: 24px   space-6: 32px   space-7: 48px    space-8: 64px    space-9: 96px
```

所有 `padding / margin / gap` 必须用 token,禁止任意 px 值。

### 2.4 Geometry

```
--tm-radius:    0px       /* 不变 */
--tm-border-w:  1px
--tm-grid:      14px      /* 字符网格背景大小 */
--tm-maxw:      1240px    /* 内容 max-width */
--tm-sidebar-w: 248px
--tm-nav-h:     60px
```

### 2.5 Effects

```
--tm-glow:        0 0 5px  rgba(primary, .5)
--tm-glow-soft:   0 0 8px  rgba(primary, .22)
--tm-glow-strong: 0 0 12px rgba(primary, .7)
```

辉光 = 主色低透明 + 模糊。禁止彩色渐变、3D、Material 阴影。

### 2.6 Motion

```
--tm-snap: 80ms steps(1, end)              /* 像素跳变 */
--tm-fast: 120ms linear                     /* 颜色 / 边框切换 */
--tm-base: 200ms cubic-bezier(.2,0,0,1)    /* 主要过渡 */
```

动画语言

- 用 `steps()` 实现跳变(光标 blink、字符出现),不用平滑插值
- `tm-boot-in` 关键帧:CRT 开机展开(scaleY 从极扁到 1)
- `tm-glitch-x` 关键帧:轻微 X 抖动,用于 hover 噱头
- 必须遵守 `prefers-reduced-motion`

---

## 3. Component Patterns

### 3.1 Brackets

action button 用 `[ ]` 包文字。bracket 通过 CSS pseudo 渲染,不写进 children:

```css
.tm-btn--default::before { content: '['; opacity: .65; }
.tm-btn--default::after  { content: ']'; opacity: .65; }
```

`primary` 按钮用实心填充,**不**用方括号。

### 3.2 Inverted-video hover

```css
.tm-btn--default:hover {
  background: var(--tm-primary);
  color: var(--tm-bg);
  box-shadow: var(--tm-glow);
}
```

任何 hover / active 状态都是反相 + glow。这是这套语言的标志性互动。

### 3.3 Status tags

```
[ OK ]   [ ERR ]   [ WARN ]   [ i ]   [ ✓ ]   [ ! ]   [ ✕ ]
```

方括号 + 全大写 / 单字符。Toast / Alert / Card / Table 的状态全用这套。

### 3.4 ASCII iconography

不用图标字体,用 Unicode 字符。常用集:

```
方向 / 展开:   ▸  ▾
光标 / 块:     ▮  █
状态点:        ●  ○  ◆
填充 / 进度:   ▒  ░
框线:          ┌─┐  │  └─┘
菜单 / 关闭:   ≡  ✕
```

理由:跟正文同字体、跟主色 / 字号自动同步、零额外资源。

### 3.5 Progress bar (ASCII)

```
[████████····················] 32%
```

`█` 主色 + 辉光,`·` muted。CSS 之外不引入 SVG / canvas 进度条。

---

## 4. Component Inventory (20)

```
forms     Button Input Textarea Select Checkbox RadioGroup Switch
layout    Card Accordion Tabs WindowTabs Table Sidebar
feedback  Modal Tooltip Alert Badge Toast Loading Typewriter
```

每个组件 = `src/components/ui/<Name>.jsx`,所有样式集中在 `components.css`,统一 `tm-<name>` class 前缀。

**API 风格**

- 受控为主(`value` + `onChange`)
- 提供 `sm / md / lg` 三档(Button / Switch / Badge)
- 提供 `default / primary / dashed / ghost / link / danger` 等 variant(看组件)
- 所有交互组件支持键盘(role + 方向键 + Enter / Space / Esc)
- 所有交互组件带正确 ARIA 角色

---

## 5. Layout

### 5.1 Site shell

```
┌──────────────────────────────────┐
│ TopNav (sticky, h = 60px)        │
├──────────────────────────────────┤
│ Main                             │
│  └ .tm-shell (max-width 1240px)  │
├──────────────────────────────────┤
│ Footer                           │
├──────────────────────────────────┤
│ CRT overlay (fixed, pointer-none)│
└──────────────────────────────────┘
```

### 5.2 Responsive

- `≤ 920px` → sidebar 转单列 · hero 上下堆叠
- `≤ 620px` → 统计 4 列转 2 列 · 大标题降级
- Mobile 用 burger menu + drawer,不堆挤导航

### 5.3 Sticky 元素

- `TopNav`: `position: sticky; top: 0;`
- Components 页的左侧 `Sidebar`: `top: calc(nav-h + space-4)`

---

## 6. Effects & Atmosphere

### 6.1 CRT overlay

全屏 `position: fixed; pointer-events: none; z-index: 9000`。两层:

- 扫描线 1px 主色低透明,3px 间距,`repeating-linear-gradient`
- 径向 vignette(角落变暗,中心可读)

### 6.2 Pixel cursor

全站默认光标用像素风小手 SVG,通过 `--tm-cursor` token 内联在 `html` 上。`<input>` / `<textarea>` 单独 override 为 `cursor: text`。

### 6.3 Typewriter

`<Typewriter text="..." speed={42} />` —— 字符逐个打印,`steps(1)` 块光标常驻末尾闪烁。`prefers-reduced-motion: reduce` 时一次性显示。

### 6.4 Loading (full-screen)

`<Loading duration={2800} onComplete={...} />` —— 居中 logo + ASCII 进度条 + 状态行。跟随主题色。`z-index: 9500`(在 CRT overlay 之上)。

---

## 7. Accessibility

- 对比度满足 WCAG 2.1 AA(亮主色 + 深底)
- 所有交互元素可键盘到达
- ARIA `role` / `aria-*` 完整(`tab` / `tabpanel` / `dialog` / `combobox` / `listbox` / `radio` / `switch` / `checkbox` / `tooltip` / `status` / `alert` / `progressbar`)
- Focus ring: `outline: 2px solid var(--tm-primary); outline-offset: 2px`
- `prefers-reduced-motion: reduce`:扫描线 / 光束 / 字符动画 / 光标闪烁全停

---

## 8. Tech Notes (for frontend / AI 消费者)

- React 18+
- React Router 6 推荐用 `HashRouter`(部署任意子路径无断链)
- 没有 Tailwind / shadcn / Radix 依赖
- 纯 CSS + CSS variables,可被 Vite / Next / CRA 直接消费
- 主题切换 = 改 `<html data-theme>` 属性 + (custom 主题时) 内联 `--tm-*` CSS variables 到 `documentElement`

---

## 9. Hand-off Checklist

设计交付给前端必须包含:

1. `tokens.css`(本文档第 2 节的全部 token 实现)
2. **本文档**(规则 + 语法)
3. 组件库源码(`src/components/ui/`)或 npm 包链接
4. Figma 文件(组件 + 本项目页面 · 变量命名对齐 token · `--tm-primary` → Figma `primary`)
5. 项目专属配置 / 主题色(一行 hex,前端塞进 `themes.js` 即可)

---

文档版本 0.1 · 对应代码版本 `term-ui@0.1.0`
