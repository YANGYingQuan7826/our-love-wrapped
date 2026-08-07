# 项目交接说明

## 项目概况

- 项目名称：Our Love Wrapped /《第229天》
- 本地目录：`C:\Users\77203\Desktop\七夕礼物`
- GitHub 仓库：`https://github.com/YANGYingQuan7826/our-love-wrapped`（当前公开）
- GitHub Pages：`https://yangyingquan7826.github.io/our-love-wrapped/`
- Vercel 备用：`https://our-love-wrapped-three.vercel.app`
- 技术栈：React、TypeScript、Vite、Framer Motion
- 本地预览密码：`0102`
- 纪念日：`2026.01.02`

## 页面结构（当前 ~25 屏）

| 序号 | 场景 | 说明 |
|------|------|------|
| 1 | 🔒 密码入口 | 输入 `0102` 解锁 |
| 2 | 🎬 封面 | "第229天"，歌词点缀"我让暖风给你送去个拥抱" |
| 3 | 🔢 数字拼贴 | CSS Grid 拼贴（229/4/65/6/2），歌词点缀"勇敢，是从此把未来说成我们" |
| 4 | 📍 CHAPTER 01 标题 | "我们把喜欢带去了远方" |
| 5 | 🏙️ 镇江（hero） | 全屏大图 + 右下角拍立得贴角 |
| 6 | 🏙️ 常熟（split） | 左右双图不对称网格 |
| 7 | 🏙️ 桐庐（stack） | 三图纵向错落叠加 |
| 8 | 🏙️ 昆明（gallery） | 横向滑动图片画廊 |
| 9 | 📍 旅行收束 | "地图记录距离，我记住身边的你" |
| 10 | 📍 CHAPTER 02 标题 | "远方之外还有日常" |
| 11-15 | 🏠 共同日常 × 5 | 电影/泥巴/花/积木/小家 |
| 16 | 🍽️ 美食瀑布流 | 9 张食物图双列瀑布流 + 左下角中文名标签 |
| 17 | 📍 CHAPTER 03 标题 | "后来的我们" |
| 18 | 👫 合照轮播 | 歌词点缀"你像蝴蝶飞出废墟"、"我们是对方特别的人" |
| 19 | 💿 唱片过渡 | 旋转唱片 + "有些歌一响起就知道是你" |
| 20 | 🐕 毛毛 | 3 列网格瀑布流 + 彩蛋按钮 |
| 21 | 🌟 彩蛋弹窗 | 《臭葵卷儿之爱》隐藏笔记 |
| 22 | ✨ 科科的愿望 | 18 行诗句逐行浮现 + 歌词点缀"My only girl friend" |
| 23 | 💌 信件标题 | "给科科的一封信" |
| 24-26 | ✉️ 信件内容 × 3 | 拆屏信纸形式 |
| 27 | 🎞️ 照片墙结尾 | DAY 230 + "再看一次"按钮 |

## 核心文件

| 文件 | 用途 | 改动频率 |
|------|------|----------|
| `src/content.ts` | 所有文案、图片路径、日期、密码 | ⭐ 你只需改这个 |
| `src/App.tsx` | 页面结构、组件、动画逻辑 | 不改 |
| `src/styles.css` | 全部视觉样式 | 不改 |
| `vite.config.ts` | Vite 构建配置（base 路径） | 不改 |
| `.github/workflows/deploy.yml` | 自动部署到 GitHub Pages | 不改 |
| `.env.local` | 本地环境变量（音乐路径） | 不改 |

## 本地开发

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器（热更新）
npm run build        # 生产构建
```

## 部署方式

### 自动部署（已配置）
推送 `main` 分支 → GitHub Actions 自动构建 → 部署到 GitHub Pages

```bash
git add -A && git commit -m "描述" && git push origin main
```

等待 30-60 秒后刷新 `https://yangyingquan7826.github.io/our-love-wrapped/`

### 手动触发 Pages 刷新（如果 CDN 缓存不更新）
```bash
gh api repos/YANGYingQuan7826/our-love-wrapped/pages/builds -X POST
```

## 待完成事项

### 🔴 P0：文字占位替换（8 处）
搜索 `[ 留给你` 即可找到：
- 镇江最难忘的一句话
- 常熟最难忘的一句话
- 桐庐最难忘的一句话
- 昆明最难忘的一句话
- 最想对合照里的两个人说的一句话
- 《蝴蝶》对应画面的一句话
- 《麦恩莉》对应的一句话
- 整封信最后一句话

### 🔴 P0：打卡地点
搜索 `[打卡地点]` 替换为真实地名（格式在 `src/content.ts` 的 `spots` 数组中）

### 🟡 P1：隐私
- 使用完毕后将仓库改回私有：`gh repo edit YANGYingQuan7826/our-love-wrapped --visibility private --accept-visibility-change-consequences`
- 或删除 GitHub Pages：`gh api repos/YANGYingQuan7826/our-love-wrapped/pages -X DELETE`

### 🟡 P1：内容微调
- 四次旅行的具体日期
- "第229天"目前写死，不会自动计算
- 旅行图片可增加到 5 张（目前已支持 3 张）

## 已知技术细节

- **字体**：CSS `@font-face` 直连 `fonts.gstatic.com` 加载中文字体，不依赖 `fonts.googleapis.com`
- **图片路径**：使用 `import.meta.env.BASE_URL` 前缀，同时兼容本地 `/` 和线上 `/our-love-wrapped/`
- **昆明画廊**：使用 CSS animation 而非 Framer Motion `whileInView`，因为后者与 scroll-snap 不兼容
- **背景音乐**：`public/media/audio/background.mp3`，本地 `.env.local` 配置路径，线上由 GitHub Actions 环境变量注入
- **图片比例**：人物/旅行 3:4，食物 1:1

## 构建产物大小

| 文件 | 大小 | Gzip |
|------|------|------|
| HTML | 0.62 kB | 0.42 kB |
| CSS | ~19 kB | ~4.9 kB |
| JS | ~341 kB | ~109 kB |
