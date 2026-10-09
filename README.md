# Dandelion Tides · v0.3

这是基于你上传的**本地版本**制作的升级版，不是重新用模板生成。
原来的个人介绍、吐槽、实验室文本和灵感语录都保留了。

**完全静态**：HTML + CSS + JavaScript，支持 GitHub Pages。

## 1. 这次增加了什么

- `gallery.html`：独立的 Gallery 画廊页面。
- `assets/gallery.js`：点击查看大图、显眼的关闭按钮、Esc 退出、键盘左右键、手机左右滑动。
- 首页增加 Gallery 预览和入口，实验室增加 Gallery 导航。
- `assets/images/gallery/`：放示例截图（优化成 WebP，适合移动端加载）。
- 预留首页背景图设置，但**没有将游戏截图强制用作背景图**，原先的柔和背景保留。
- 适配窄屏导航；放大照片时会限制底层页面滚动。

## 2. 更新 GitHub 仓库（推荐用 GitHub Desktop）

1. 先给当前仓库做一次 commit / push，确保你自己的新修改已保存。
2. 下载 v0.3 压缩包并解压。
3. 在 GitHub Desktop 中打开 `dandeliontides.github.io` 仓库。
4. 选择 `Repository → Show in Explorer`（macOS 上是 Finder）。
5. **复制解压后文件夹里面的内容**到仓库根目录：`index.html`、`lab.html`、`gallery.html`、`assets`、`README.md`、`CNAME`。
   - 不是把 ZIP 文件直接丢进去。
   - 不要删除或覆盖本地的 `.git/` 文件夹；新 ZIP 中本来就不含 `.git/`。
   - `CNAME` 内是 `dandeliontides.com`，和你原来一样。
6. 在 GitHub Desktop 中确认 Changes，然后提交：
   `feat: add photo gallery and optional background`
7. 点击 `Push origin`，等 GitHub Pages 部署。

之后可访问：
- 首页：`https://dandeliontides.com/`
- 画廊：`https://dandeliontides.com/gallery.html`
- 实验室：`https://dandeliontides.com/lab.html`

如果自定义域名暂时有 HTTPS / DNS 问题，用：
`https://dandeliontides.github.io/gallery.html`

## 3. 以后如何更换首页背景图

首页默认保留旧版的浅绿色视觉效果，因为你目前只给了一张**画廊示例截图**。

只需要操作两处：

**第一步**：把喜欢的背景照片复制到 `assets/images/`。
例如，放成 `assets/images/my-background.jpg`。

**第二步**：打开 `assets/site.js`，找到这一行：

```js
const HERO_BACKGROUND = "";
```

改成：

```js
const HERO_BACKGROUND = "assets/images/my-background.jpg";
```

保存、commit、push，首页顶部就会出现这张背景图，并自动叠加暗色遮罩来保证文字可读。

想撤销背景图？把它重新改回空字符串 `""` 即可。

- 推荐横图（例如 1920 × 1080）、压缩过的 JPEG/WebP。
- 手机端图片会为了铺满区域而适当裁剪两侧，所以不要把关键主体放在图片边缘。
- 如果图片很亮，首页会自动叠加半透明深色遮罩。

## 4. 如何往 Gallery 加新照片

把照片放到 `assets/images/gallery/`。

打开 `gallery.html`，找到这一段：

```html
<figure class="gallery-card gallery-card--featured">
  ...
</figure>
```

复制整个 `<figure>...</figure>` 块粘贴在同一个 `gallery-grid` 中，然后：

- `data-full="..."` 改成新照片高清版的路径
- `<img src="...">` 改成新照片缩略图路径；小型照片可以直接用同一个文件
- 修改 `alt`、`aria-label`、`photo-title` 和 `photo-description`
- 如果不是大横图，把 `gallery-card--featured` 去掉，让图片按普通网格排列
- 保存、commit、push，就会自动出现在画廊

放大预览会**自动读取所有 `.gallery-card`**，不需要改 JavaScript。

## 5. 画廊怎么退出？

- 电脑：点右上角「关闭 ✕」、按 Esc，或点图片周围的黑色空白。
- 手机：点顶部「关闭 ✕」。有多张图片时，还能左右滑动看下一张/上一张。
- 键盘：有多张图片时，用左右方向键切换。
- 只有一张图时，上一张/下一张按钮会自动隐藏。
- 关闭大图后，键盘焦点会回到你原来点开的照片。

## 6. 文件结构

```text
index.html
lab.html
gallery.html
CNAME
README.md
assets/
  style.css
  site.js
  gallery.js
  images/
    gallery/
      game-moment.webp
      game-moment-thumb.webp
```

**特别注意：** 网站是公开的，上传照片前请留意截图里是否有不想公开的账号名、聊天记录或其他信息。
