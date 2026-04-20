# 首页问题分析与改进建议

> 分析对象：`index.html` 及关联的 `css/style.css`、`js/main.js`
> 对照基准：`企业官网需求文档.md` + 通用最佳实践

---

## 一、SEO 问题

| # | 问题 | 严重度 | 位置 | 建议 |
|---|------|--------|------|------|
| S-1 | 缺少 `<link rel="canonical">` | 高 | `<head>` | 添加 `<link rel="canonical" href="https://www.technova.cn/index.html">`，防止重复内容索引 |
| S-2 | 缺少 Open Graph `og:image` | 高 | `<head>` | 添加 `<meta property="og:image" content="…">`，社交分享无封面图将严重影响传播效果 |
| S-3 | 缺少 Open Graph `og:url` | 中 | `<head>` | 添加 `<meta property="og:url" content="https://www.technova.cn/">` |
| S-4 | 缺少 Twitter Card 元标签 | 中 | `<head>` | 添加 `twitter:card`、`twitter:title`、`twitter:description`、`twitter:image` |
| S-5 | 缺少 JSON-LD 结构化数据 | 高 | `<head>` 或 `<body>` 末尾 | 需求文档明确要求 Organization + BreadcrumbList，当前完全缺失 |
| S-6 | 缺少 sitemap.xml | 高 | 项目根目录 | 需求文档要求生成 sitemap.xml，当前不存在 |
| S-7 | 缺少 favicon | 中 | `<head>` | 无 `<link rel="icon">`，浏览器标签页无图标，影响品牌识别 |
| S-8 | Google Fonts URL 缺少 `display=swap` | 中 | `<head>:13` | 当前 URL 为 `…&display=swap` 已包含，但 Playfair Display 加载4种字重(400/600/700)可能过重，建议精简为仅 700 |

---

## 二、可访问性 (Accessibility) 问题

| # | 问题 | 严重度 | 位置 | 建议 |
|---|------|--------|------|------|
| A-1 | Emoji 作为图标使用 | 高 | 全页多处 | ⚡🛡🔗🎯☁🧠📊 等emoji在屏幕阅读器上会被读出不可控的描述（如"闪电emoji"），需求文档要求使用 SVG/Icon Font，应替换为语义明确的 SVG 图标 |
| A-2 | 汉堡菜单用 `<div>` + `role="button"` | 高 | `index.html:34` | 应使用原生 `<button>` 元素，`role="button"` 无法提供原生按钮的键盘交互和语义 |
| A-3 | 汉堡菜单缺少 `aria-expanded` | 高 | `index.html:34` | 需动态更新 `aria-expanded="true/false"` 以告知屏幕阅读器菜单展开状态 |
| A-4 | 移动菜单关闭时缺少 `aria-hidden` | 中 | `index.html:39-46` | 菜单关闭时仍可被屏幕阅读器遍历，应添加 `aria-hidden="true"` 并在展开时移除 |
| A-5 | Logo Wall 项为纯 `<div>` 文本 | 中 | `index.html:179-186` | 无语义、不可聚焦、无链接，屏幕阅读器无法识别为合作伙伴列表。应使用 `<ul>/<li>` 结构或 `<a>` 链接 |
| A-6 | 新闻卡片图片无 `<alt>` | 中 | `index.html:200,208` | "新闻图片"占位文本作为 `alt` 无意义，应提供描述性 alt 或使用 `alt=""`（装饰性图片） |
| A-7 | 产品卡片图片用 emoji 无 alt | 中 | `index.html:138,146,154` | ☁🧠📊 emoji 作为视觉标识，屏幕阅读器无法正确解读 |
| A-8 | 页脚社交链接内容为单字 | 低 | `index.html:242-244` | "微""博""抖" 作为链接文本，虽有 `aria-label` 但视觉上不直观，建议使用 SVG 图标 + `aria-label` |
| A-9 | 页脚联系方式用 emoji | 低 | `index.html:268-270` | 📞✉📍 同 A-1，应替换为 SVG 图标 |

---

## 三、性能问题

| # | 问题 | 严重度 | 位置 | 建议 |
|---|------|--------|------|------|
| P-1 | 外部字体阻塞渲染 | 中 | `<head>:11-13` | Google Fonts 2个 preconnect + 1个 CSS 请求阻塞首屏，建议：① 仅加载必要字重 ② 使用 `font-display:swap`（已有）③ 考虑本地托管字体文件 |
| P-2 | 无图片懒加载机制 | 中 | 全页 | 需求文档要求图片懒加载，当前所有图片为占位符但未来替换真实图片时需添加 `loading="lazy"` |
| P-3 | CSS/JS 未压缩 | 中 | `css/style.css`, `js/main.js` | 需求文档要求 CSS/JS 压缩合并，当前为开发版本，需构建流程 |
| P-4 | 无关键资源预加载 | 低 | `<head>` | 缺少 `<link rel="preload" as="style" href="css/style.css">` 等预加载提示 |
| P-5 | JS 中新闻详情使用内联样式 | 低 | `main.js:236-249` | `openNewsDetail` 函数用内联 `style=` 构建内容，不利于维护和性能（无法缓存样式），应改用 CSS 类 |

---

## 四、设计 / UI 问题

| # | 问题 | 严重度 | 位置 | 建议 |
|---|------|--------|------|------|
| D-1 | Logo Wall 为纯文字方块 | 高 | `index.html:179-186` | 企业官网合作伙伴展示用纯文字方块极不专业，应使用真实 Logo 图片（SVG/PNG），需求文档明确要求"Logo墙" |
| D-2 | 产品卡片图片为 emoji 占位 | 高 | `index.html:138,146,154` | ☁🧠📊 emoji 作为产品视觉标识不专业，应使用产品截图或精心设计的 SVG 插画 |
| D-3 | 新闻卡片图片为文字占位 | 高 | `index.html:200,208` | "新闻图片"灰色方块无实际内容，应使用真实新闻配图 |
| D-4 | Hero 区域无背景图/视频 | 中 | `index.html:51-67` | 需求文档要求"背景图/视频"，当前仅用 CSS 渐变+网格线，视觉冲击力不足 |
| D-5 | 全站图标统一使用 emoji | 高 | 全页 | 需求文档要求"SVG / Icon Font"，当前所有图标(优势卡片、产品卡片、页脚联系方式、社交链接)均为 emoji，风格不统一且不专业 |
| D-6 | 缺少 favicon | 中 | — | 无网站图标，影响品牌一致性和用户识别 |
| D-7 | Hero badge 使用 ✦ 特殊符号 | 低 | `index.html:55` | "✦ 数字化转型引领者"中的 ✦ 在部分系统字体下可能渲染异常 |

---

## 五、代码质量问题

| # | 问题 | 严重度 | 位置 | 建议 |
|---|------|--------|------|------|
| C-1 | IIFE 泄露全局函数 | 中 | `main.js:154,230,256,277` | `openModal`、`closeModal`、`openNewsDetail`、`searchNews`、`showToast` 通过 `window.xxx =` 暴露到全局，违背 IIFE 封闭意图。建议使用事件委托或 data-attribute 驱动 |
| C-2 | 移动端菜单链接重复硬编码 | 低 | `index.html:40-45` | 与桌面菜单 `index.html:27-32` 内容完全重复，应通过 JS 动态生成或使用单一数据源 |
| C-3 | 新闻数据硬编码在 JS 中 | 中 | `main.js:191-228` | 6条新闻数据直接写在 JS 里，无法动态更新，实际项目应从后端 API 或 CMS 获取 |
| C-4 | 滚动指示器动画仅用 CSS | 低 | `style.css:615-618` | `heroFloat` 动画持续运行，即使用户已滚动离开 Hero 区域，浪费 GPU 资源。建议滚动后停止动画 |
| C-5 | Counter 动画无取消机制 | 低 | `main.js:69-88` | `requestAnimationFrame` 链无取消引用，若组件被移除可能产生幽灵回调 |

---

## 六、需求文档合规差距

| # | 需求项 | 状态 | 差距说明 |
|---|--------|------|----------|
| R-1 | JSON-LD 结构化数据 (§6.1) | ❌ 缺失 | 未实现 Organization、BreadcrumbList |
| R-2 | sitemap.xml (§6.1) | ❌ 缺失 | 文件不存在 |
| R-3 | Open Graph 元标签 (§6.1) | ⚠️ 部分 | 有 title/description/type，缺 image/url |
| R-4 | Twitter Card 元标签 (§6.1) | ❌ 缺失 | 完全未添加 |
| R-5 | 图片 `<alt>` 属性完整 (§6.1) | ❌ 缺失 | 所有图片为占位符，无有意义 alt |
| R-6 | SVG / Icon Font 图标 (§2.1) | ❌ 未采用 | 全站使用 emoji |
| R-7 | WebP 图片格式 (§2.1) | ❌ 未采用 | 无任何真实图片 |
| R-8 | 图片懒加载 (§2.3) | ❌ 未实现 | 无 `loading="lazy"` |
| R-9 | CSS/JS 压缩合并 (§2.3) | ❌ 未实现 | 开发版本直接引用 |
| R-10 | Hero 背景图/视频 (§4.1) | ⚠️ 部分 | 仅 CSS 渐变，无真实背景图/视频 |
| R-11 | 客户案例/合作伙伴 Logo墙 (§4.1) | ⚠️ 部分 | 有模块但为纯文字，非 Logo |
| R-12 | WCAG 2.1 AA 合规 (§6.2) | ⚠️ 部分 | 有 skip-link 和 aria-label，但 emoji 图标和按钮语义不合规 |
| R-13 | 色彩对比度 ≥ 4.5:1 (§6.2) | ⚠️ 待验证 | Hero 区域白色文字在深蓝背景上对比度需验证；`--color-text-muted: #94a3b8` 在白色背景上对比度约 3.0:1，不满足正文 4.5:1 要求 |

---

## 七、改进建议优先级排序

### P0 — 必须修复（上线阻塞）

1. **替换 emoji 为 SVG 图标** — 影响可访问性、专业性、需求合规
2. **添加 JSON-LD 结构化数据** — SEO 核心要求
3. **添加 OG image + Twitter Card** — 社交传播必需
4. **添加 canonical + favicon** — SEO 基础
5. **汉堡菜单改用 `<button>` + `aria-expanded`** — 可访问性合规

### P1 — 应该修复（显著提升质量）

6. **Logo Wall 替换为真实 Logo 图片** — 企业官网核心视觉
7. **产品/新闻卡片替换为真实图片** — 内容可信度
8. **Hero 区域添加背景图/视频** — 首屏视觉冲击力
9. **验证色彩对比度，修正不达标处** — WCAG 合规
10. **添加 sitemap.xml** — SEO 完整性

### P2 — 建议优化（锦上添花）

11. **JS 全局函数改为事件委托模式** — 代码质量
12. **移动菜单动态生成** — 减少HTML重复
13. **CSS/JS 构建压缩流程** — 性能优化
14. **字体加载策略优化** — 首屏性能
15. **滚动后停止 Hero 动画** — GPU 节省

---

## 八、色彩对比度快速验证

| 元素 | 前景色 | 背景色 | 对比度 | 达标? |
|------|--------|--------|--------|-------|
| 正文 `--color-text` (#1e293b) | #1e293b | #ffffff | ~12.6:1 | ✅ |
| 辅助文字 `--color-text-secondary` (#475569) | #475569 | #ffffff | ~5.6:1 | ✅ |
| 弱化文字 `--color-text-muted` (#94a3b8) | #94a3b8 | #ffffff | ~3.0:1 | ❌ 正文不达标 |
| Hero 白色文字 | #ffffff | #0a1628 | ~15.4:1 | ✅ |
| Hero subtitle rgba(255,255,255,0.65) | ~#a6a6a6 | #0a1628 | ~5.5:1 | ✅ |
| CTA 区域文字同 Hero | — | — | — | ✅ |
| 页脚 rgba(255,255,255,0.6) | ~#999999 | #0a1628 | ~5.9:1 | ✅ |
| 页脚底部 rgba(255,255,255,0.4) | ~#666666 | #0a1628 | ~2.9:1 | ❌ |

> `--color-text-muted` (#94a3b8) 在白底上对比度仅 3.0:1，低于 WCAG AA 正文要求 4.5:1。该色值被广泛用于卡片描述、新闻摘要、标签等正文级内容，需调深至至少 #64748b (对比度 ~4.6:1)。
> 页脚底部 rgba(255,255,255,0.4) 对比度 ~2.9:1，低于大文字 3:1 要求，需调亮至至少 rgba(255,255,255,0.5)。