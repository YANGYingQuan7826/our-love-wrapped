export const story = {
  anniversaryPassword: import.meta.env.VITE_ANNIVERSARY_PASSWORD ?? "0102",
  anniversaryDate: "2026.01.02",
  days: 229,
  backgroundTrack: import.meta.env.VITE_BACKGROUND_TRACK ?? "",
  cover: "/media/core/cover.webp",
  wall: "/media/core/wall.webp",
};

export const trips = [
  {
    index: "01",
    city: "镇江",
    kicker: "第一次出发",
    line: "路第一次变远，我们第一次并肩。",
    placeholder: "[ 留给你：镇江最难忘的一句话 ]",
    images: [
      "/media/trips/zhenjiang-1.webp",
      "/media/trips/zhenjiang-2.webp",
      "/media/trips/zhenjiang-3.webp",
    ],
    tone: "#bd452e",
  },
  {
    index: "02",
    city: "常熟",
    kicker: "第二次出发",
    line: "树影很慢，喜欢也开始有了日常。",
    placeholder: "[ 留给你：常熟最难忘的一句话 ]",
    images: [
      "/media/trips/changshu-1.webp",
      "/media/trips/changshu-2.webp",
      "/media/trips/changshu-3.webp",
    ],
    tone: "#597355",
  },
  {
    index: "03",
    city: "桐庐",
    kicker: "第三次出发",
    line: "目的地不同，身边的人相同。",
    placeholder: "[ 留给你：桐庐最难忘的一句话 ]",
    images: [
      "/media/trips/tonglu-1.webp",
      "/media/trips/tonglu-2.webp",
      "/media/trips/tonglu-3.webp",
    ],
    tone: "#334c4c",
  },
  {
    index: "04",
    city: "昆明",
    kicker: "第四次出发",
    line: "风景越来越多，我们也越来越像我们。",
    placeholder: "[ 留给你：昆明最难忘的一句话 ]",
    images: [
      "/media/trips/kunming-1.webp",
      "/media/trips/kunming-2.webp",
      "/media/trips/kunming-3.webp",
    ],
    tone: "#708d3e",
  },
] as const;

export const memories = [
  { image: "/media/memories/movie.webp", label: "一起看过的电影" },
  { image: "/media/memories/clay-1.webp", label: "一起捏过的泥巴" },
  { image: "/media/memories/flowers.webp", label: "一起留下的花" },
  { image: "/media/memories/blocks.webp", label: "一起拼起的小世界" },
  { image: "/media/memories/home.webp", label: "一点一点，点缀成家" },
] as const;

export const food = [
  "sukiyaki",
  "bistro",
  "puffer",
  "birthday",
  "hotpot",
  "mushroom",
  "oyster",
  "luosifen",
  "guizhou",
].map((name) => `/media/food/${name}.webp`);

export const couple = [
  "/media/couple/booth.webp",
  "/media/couple/metro.webp",
  "/media/couple/changshu.webp",
  "/media/couple/tonglu.webp",
  "/media/couple/zhouzhuang.webp",
  "/media/couple/clay.webp",
  "/media/couple/train.webp",
];

export const songs = [
  { title: "让暖风给你送去个拥抱", artist: "", line: "睡吧，靠近我，拥抱我，要快乐。" },
  { title: "这是我一生中最勇敢的瞬间", artist: "棱镜", line: "勇敢，是从此把未来说成我们。" },
  { title: "蝴蝶", artist: "陶喆", line: "[ 留给你：这首歌让你想到的画面 ]" },
  { title: "特别的人", artist: "方大同", line: "给那个无可替代的、特别的人。" },
  { title: "麦恩莉", artist: "方大同", line: "[ 留给你：最想放在这里的一句话 ]" },
] as const;

export const dogPhotos = Array.from(
  { length: 7 },
  (_, index) => `/media/dog/maomao-${index + 1}.webp`,
);

export const petPoem = [
  "爱是臭臭，总想跳上1.5m的衣橱。",
  "爱是山葵，上完厕所总是不埋。",
  "爱是花卷，总是在水碗里洗jiojio。",
] as const;

export const letter = [
  "我想把这229天，做成一个可以反复打开的地方。",
  "那些远方、晚餐和普通下午，因为身边是你，才被认真记住。",
  "你一定会成为那个又敏锐细心、又开放积极的人。",
  "有锋芒，也勇敢；有灵气，也有足够的真朋友。",
  "身体健康，生活幸福，逆境全部渡过的未来的人类学家。",
  "[ 留给你：整封信最后的一句话 ]",
] as const;
