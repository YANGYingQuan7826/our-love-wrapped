# Our Love Wrapped

《第229天》是一份为手机浏览器设计的私人爱情年度报告。项目使用 React、TypeScript、Vite 和 Framer Motion 构建。

## 本地运行

```bash
npm install
npm run prepare-assets
npm run dev
```

默认预览密码为 `0102`。可复制 `.env.example` 为 `.env.local` 后修改密码。

## 替换内容

- 所有文字、日期、歌曲和占位句位于 `src/content.ts`。
- 原始图片保存在 `图片素材/`，网页压缩副本由 `scripts/prepare-assets.mjs` 生成到 `public/media/`。
- 不要直接修改 `public/media/` 中的图片；调整选片后重新执行 `npm run prepare-assets`。
- `[ 留给你：…… ]` 是后续需要手工替换的个性化句子。

## 添加背景音乐

由于浏览器禁止未经交互自动播放有声内容，音乐会在用户输入密码并点击“打开回忆展”后播放。

1. 将有使用权限的音频放到 `public/media/audio/background.mp3`。
2. 在 `.env.local` 中设置：

```env
VITE_BACKGROUND_TRACK=/media/audio/background.mp3
```

## 构建

```bash
npm run build
```

生产文件输出到 `dist/`，可以部署到 Vercel、Cloudflare Pages 或其他静态托管平台。

## 隐私提示

当前密码主要提供开启仪式感。静态网站中的前端代码和媒体资源无法通过前端密码实现真正保密；如果需要严格访问控制，应在部署平台增加服务端认证或访问策略。
