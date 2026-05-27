# TERM/UI — 交接文档

终端 CLI 风格的 React 组件库 + 展示站。绿磷光屏视觉,20 个核心组件,4 套预设主题 + 自定义 HEX 取色,像素小手光标,全站 token 驱动。**当前版本 v0.2.0**。

> 这份文档是「你或别人 3 个月后回来,该怎么继续」的速查表。

---

## 在哪能找到它

| 东西 | 地址 |
|---|---|
| 源码仓库 | https://github.com/23mnals/term-ui |
| 在线展示站 | https://23mnals.github.io/term-ui/ |
| 本地路径 | `/Users/ccbakala/Claude Cowork/OUTPUTS-输出/TERM-UI/` |

## 它有两个用途

1. **展示站** — 公开的组件库网站,带 docs + 主题切换 + 整页模板,跑在 GitHub Pages。
2. **npm 包** — 任何 React 项目可以装它用:`npm install github:23mnals/term-ui#main` → `import { Button } from 'term-ui'`。

---

## 现在交付到什么程度

### ✅ 已交付

**20 个组件**,分三组:

- **forms** — `Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `RadioGroup` · `Switch`
- **layout** — `Card` · `Accordion` · `Tabs` · `WindowTabs` · `Table` · `Sidebar`
- **feedback** — `Modal` · `Tooltip` · `Alert` · `Badge` · `Toast` · `Loading` · `Typewriter`

**主题**:4 套预设(green / amber / ice / red)+ 自定义 HEX 取色(给一个颜色,系统从 HSL 推导整套色板)。

**其它**:全屏 Loading(主题色驱动)、像素小手光标(全站默认)、Logo + favicon(theme-aware 绿方块挖空 T)、4 个页面(Home / Components / Templates / Showcase)+ 登录页 + 2 个整页模板(Landing / Dashboard)。

**工程化**:抽成 npm 包(git-install 兼容,`prepare` hook 自动构建)、GitHub Actions 自动部署(push 自动发布)、Design spec + Figma tokens 都在 `docs/`。

### 🟡 待手动确认(都是网页里点几下的事)

- **repo Settings → Pages → Source = GitHub Actions** —— 一次性设置,设完之后每次 push 自动部署
- **`gh repo edit` 命令**填描述 + 14 个标签 + homepage URL(命令在 README 里有)
- **Contributors 关联** —— gmail 已经在 GitHub 验证了,Contributors 面板要等几小时自己刷新

### 📋 以后可选方向

- 把 `term-ui` 也发到公网 npm registry(现在只能 git-install)
- 买自定义域名(比如 `term-ui.dev`)替换 github.io 链接
- 加更多组件(NFT 卡片、ColorPicker、Pagination、Tag input 等)
- 做 Figma 组件库镜像(token JSON 已经在 `docs/figma-tokens.json`,组件得手画)

---

## 日常操作

### 在本地跑起来

```bash
cd "/Users/ccbakala/Claude Cowork/OUTPUTS-输出/TERM-UI"
npm install
npm run dev
```

浏览器打开终端打印的 `http://localhost:5173/`(端口可能是 5174 / 5175,看实际打印的)。

### 装到别的 React 项目里用

```bash
npm install github:23mnals/term-ui#main
```

然后:

```jsx
import { Button, ThemeProvider, ToastProvider } from 'term-ui'
import 'term-ui/style.css'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Button variant="primary">deploy</Button>
      </ToastProvider>
    </ThemeProvider>
  )
}
```

拉最新版:`npm update term-ui`(或者 `rm -rf node_modules/term-ui && npm install`)。

**Peer deps**:消费方项目自己装 `react@^18` + `react-dom@^18`,用到 `Sidebar` 还要 `react-router-dom@^6`。

### 推改动到线上

```bash
cd "/Users/ccbakala/Claude Cowork/OUTPUTS-输出/TERM-UI"
git add .
git commit -m "改了啥"
git push
```

push 之后 GitHub Actions 自动跑构建,~2 分钟后 `https://23mnals.github.io/term-ui/` 更新完。部署进度看 [github.com/23mnals/term-ui/actions](https://github.com/23mnals/term-ui/actions)。

### 加一个新组件

让 Claude 做最省事,流程:

1. 跟 Claude 说要加什么(描述 + 参考)
2. Claude 在 `src/components/ui/` 加 `<Name>.jsx`、在 `components.css` 加样式、在 `index.js` + `lib.js` 加导出、在 `data/componentDocs.jsx` 加文档 demo
3. Claude 跑 `npm run build` + smoke 测试验证
4. 你 `git push` → 自动部署

**新组件必须遵守的规矩**(完整版看 `docs/DESIGN-SYSTEM.md`):

- class 前缀 `tm-`
- 颜色只能读 CSS 变量(`var(--tm-primary)` 之类),不能硬编码 hex
- `border-radius: 0`,任何元素都不圆角
- 等宽字体,UI 控件也是
- 加键盘可达 + ARIA 角色

### 改主题色

- **临时切换**:导航栏右上角 `--theme` 下拉,可以切预设或调任何颜色。
- **改默认色**:`src/styles/tokens.css` 里改 `[data-theme='green']` 块的 `--tm-primary` 等,push 之后所有人看到的默认色都变了。
- **加一套新预设**:在 `tokens.css` 加 `[data-theme='你的名字']` 块,在 `src/theme/themes.js` 的 `THEMES` 数组里加一条元数据,完事。

### 改 Logo / favicon

- 站内 Logo:`src/components/site/Logo.jsx`(theme-aware SVG,跟主题色变)
- Favicon:`public/favicon.svg`(浏览器标签页那个,静态绿色)
- **两份要同步改**,否则站点 logo 和浏览器 logo 会对不上

---

## 文件结构速查

```
TERM-UI/
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css            DNA(颜色 / 字号 / 间距 / 辉光 / 主题)
│  │  └─ global.css            reset + 扫描线 + 光标 + 字体 + 共享原语
│  ├─ theme/
│  │  ├─ themes.js             4 套主题元数据
│  │  ├─ colorUtils.js         单 hex → 整套色板的颜色推导
│  │  └─ ThemeProvider.jsx     主题 context + localStorage 持久化
│  ├─ components/
│  │  ├─ ui/                   20 个核心组件(可独立复用 / 抽包用)
│  │  │  └─ components.css     20 个组件的全部样式
│  │  └─ site/                 站点框架(导航 / Logo / CRT / 预览窗 / Footer)
│  ├─ pages/                   4 个页面 + 登录 + 2 个模板
│  ├─ data/
│  │  └─ componentDocs.jsx     组件文档注册表(每个组件的 demo + props 表)
│  ├─ App.jsx                  路由总装
│  ├─ main.jsx                 展示站入口(npm run dev)
│  └─ lib.js                   npm 包入口(给消费者 import)
├─ public/
│  └─ favicon.svg              浏览器标签页 logo
├─ docs/
│  ├─ DESIGN-SYSTEM.md         设计规则书(给设计 / AI 当上下文)
│  ├─ figma-tokens.json        Figma Tokens Studio 一键导入
│  └─ HANDOVER.md              本文档
├─ .github/workflows/
│  └─ deploy.yml               GitHub Actions 自动部署到 Pages
├─ vite.config.js              展示站构建配置
├─ vite.lib.config.js          npm 包构建配置(library mode)
├─ package.json                v0.2.0,含 exports / files / peerDeps / prepare
└─ README.md                   项目说明
```

---

## 已知的坑 / 注意事项

- **不要手动删 `node_modules`** —— 你长期跑着 dev server,删了它服务会立刻挂。要清理依赖只在彻底不用时做。
- **commit 邮箱要在 GitHub 验证** —— 本地 git 配的是 `dongzhizhang36@gmail.com`,这个 email 必须在你 GitHub 账号的「verified emails」里,否则 commit 不算你的(Contributors 面板不显示你)。
- **Vite + GH Pages 的 base 路径** —— `vite.config.js` 已经设 `base: './'` + HashRouter,不用动。
- **重启 dev 后端口可能变** —— `npm run dev` 如果之前的端口被占用会自动换下一个(5173 → 5174 → ...),浏览器要打终端实际打印的那个 URL。
- **`.zshrc` 第 4 行有个 cd 到不存在目录的报错** —— 不影响 git/gh,但每次开终端会闪一行。要消掉就把 `~/.zshrc` 那行删掉,或者新建那个目录(`~/Desktop/filesexport`)。

---

## 协作 / 风格约定

- 设计语言完整规则在 `docs/DESIGN-SYSTEM.md` —— 加新组件或者找 AI 帮忙之前先把这份给它当上下文,否则风格容易跑偏。
- 颜色 / 字号 / 间距全部走 token,任何新代码不能出现硬编码 hex。
- 组件 class 统一 `tm-` 前缀。
- **不引入** Tailwind / shadcn / Radix —— 纯 CSS + CSS variables。这是这套库跟 neobrutalism 那种模式最大的区别(那个是骑在 shadcn 上的皮肤,我们是独立组件库)。

---

**最后更新**:2026-05-26 · v0.2.0
