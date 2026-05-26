# TERM/UI

终端 CLI 风格的 React 组件库 + 展示站。绿磷光屏的视觉语言，20 个核心组件，4 套预设主题 + 自定义 HEX 取色，像素小手光标，全站 token 驱动。

```
>_ 20 components // 4 presets + custom hex // react + vite // 0 deps beyond react
```

## 快速开始

```bash
npm install
npm run dev      # 本地开发，默认 http://localhost:5173
npm run build    # 产物输出到 dist/
npm run preview  # 预览生产构建
```

构建产物是纯静态文件，`dist/` 可直接丢到 GitHub Pages / Vercel / 任意静态托管。`vite.config.js` 里 `base: './'` + HashRouter，部署到任意子路径都不会断链。

## 站点结构

```
/                      首页：打字机 hero + boot log + 主题切换
/components/:id         组件文档：侧边栏文件树 + 实时预览 + 代码复制
/templates              整页模板索引
/preview/landing        模板：ACME_SYS 落地页（全屏预览）
/preview/dashboard      模板：NODE-01 运维面板（全屏预览）
/showcase               作品画廊
/login                  终端风格登录页
```

## 目录

```
src/
├─ styles/
│  ├─ tokens.css        所有 design token（颜色/字号/间距/辉光）
│  └─ global.css        reset + 扫描线/辉光/光标等共享原语
├─ theme/
│  ├─ themes.js         主题元数据
│  ├─ colorUtils.js     单 hex → 整套磷光色板的颜色推导
│  └─ ThemeProvider.jsx 主题 context（含自定义取色）+ 持久化
├─ components/
│  ├─ ui/               20 个核心组件（可独立复制使用）
│  └─ site/             站点框架：导航/Logo/CRT/预览窗等
├─ pages/               4 个页面 + 2 个整页模板
└─ data/
   └─ componentDocs.jsx 组件文档与示例代码注册表
```

## 主题系统

颜色不在任何组件里硬编码。每套预设是 `tokens.css` 里的一个 `[data-theme]` 块，切换 = 改 `<html data-theme>` 一个属性，CSS 变量级联，全站（含组件、模板）瞬间换肤。

4 套预设：`green`（默认）· `amber` · `ice` · `red`。

### 自定义 HEX 取色

导航栏 `--theme` 下拉里有取色器：系统取色盘 + HEX 输入框 + 快捷色；首页主题区也有一个自定义入口。

原理在 `colorUtils.js`：你只给一个主色 hex，`generatePalette()` 用 HSL 推导出整套磷光色板——背景带微弱色相、正文/暗调/边框是去饱和的色阶、扫描线取主色低透明度。算出的一组 CSS 变量内联写到 `<html>` 上，覆盖预设。因为所有组件都读这些变量，加一个颜色不用改任何组件代码。

## 组件清单（20）

- **forms** — `Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch`
- **layout** — `Card` · `Accordion` · `Tabs` · `WindowTabs` · `Table` · `Sidebar`
- **feedback** — `Modal` · `Tooltip` · `Alert` · `Badge` · `Toast` · `Loading` · `Typewriter`

均为受控组件，键盘可达，带 ARIA 角色。`Tabs` / `Radio` / `WindowTabs` 方向键切换，`Select` 全键盘驱动，`Modal` 焦点陷阱 + Esc + 滚动锁，`Toast` 用 `ToastProvider` + `useToast()` 从任意位置推送，`Loading` 是跟随主题色的全屏开机动画。组件 class 统一 `tm-` 前缀，可整段复制到别的项目。

## 技术栈

React 18 · React Router 6（HashRouter）· Vite 5。运行期依赖只有 react / react-dom / react-router-dom，没有 UI 框架、没有 CSS 框架。
