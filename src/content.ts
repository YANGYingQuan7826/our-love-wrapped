const BASE = import.meta.env.BASE_URL;

export const story = {
  anniversaryPassword: import.meta.env.VITE_ANNIVERSARY_PASSWORD ?? "0102",
  anniversaryDate: "2026.01.02",
  backgroundTrack: import.meta.env.VITE_BACKGROUND_TRACK ?? "",
  cover: `${BASE}media/core/cover.webp`,
  wall: `${BASE}media/core/wall.webp`,
  heroBackground: `${BASE}media/core/hero-bg.webp`,
};

export const trips = [
  {
    index: "01",
    city: "镇江",
    kicker: "第一次出发",
    line: "路第一次变远，我们第一次并肩。",
    placeholder: "谢谢你，将我纳入你的生活",
    layout: "hero" as const,
    spots: ["西津渡", "金山寺", "北固山"],
    images: [
      `${BASE}media/trips/zhenjiang-1.webp`,
      `${BASE}media/trips/zhenjiang-2.webp`,
      `${BASE}media/trips/zhenjiang-3.webp`,
    ],
    tone: "#bd452e",
  },
  {
    index: "02",
    city: "常熟",
    kicker: "第二次出发",
    line: "树影很慢，喜欢也开始有了日常。",
    placeholder: "也是一起爬山了呢 哈哈哈哈哈哈",
    layout: "split" as const,
    spots: ["兴福禅寺", "虞山", "燕园", "方塔园", "赵园曾园"],
    images: [
      `${BASE}media/trips/changshu-1.webp`,
      `${BASE}media/trips/changshu-2.webp`,
      `${BASE}media/trips/changshu-3.webp`,
    ],
    tone: "#597355",
  },
  {
    index: "03",
    city: "桐庐",
    kicker: "第三次出发",
    line: "目的地不同，身边的人相同。",
    placeholder: "散步（徒步），和你感受江边的风",
    layout: "carousel" as const,
    spots: ["石舍村", "马岭古道", "江南龙门湾"],
    images: [
      `${BASE}media/trips/tonglu-1.webp`,
      `${BASE}media/trips/tonglu-2.webp`,
      `${BASE}media/trips/tonglu-3.webp`,
      `${BASE}media/trips/tonglu-4.webp`,
    ],
    tone: "#334c4c",
  },
  {
    index: "04",
    city: "昆明",
    kicker: "第四次出发",
    line: "风景越来越多，我们也越来越像我们。",
    placeholder: "忙碌中浅浅感受一下昆明的美食与美景",
    layout: "gallery" as const,
    spots: ["滇池", "斗南花市", "翠湖", "捞渔河湿地公园"],
    images: [
      `${BASE}media/trips/kunming-1.webp`,
      `${BASE}media/trips/kunming-2.webp`,
      `${BASE}media/trips/kunming-3.webp`,
    ],
    tone: "#708d3e",
  },
] as const;

export const stats = [
  { number: "5", caption: "次共同出发" },
  { number: "47", caption: "张便利贴" },
  { number: "138+", caption: "个打卡点" },
  { number: "33", caption: "公里的距离" },
  { number: "61+", caption: "顿好吃的" },
  { number: "6", caption: "部电影" },
  { number: "2", caption: "场话剧" },
  { number: "40+", caption: "张拍立得" },
] as const;

export const statsSummary = "共同组成了我们独一无二的回忆";

export const lyricsWarmWind = [
  "我让暖风",
  "给你送去个拥抱",
  "睡吧",
  "靠近我",
  "拥抱我",
  "要快乐",
] as const;

export const lyricsBraveMoment = [
  "这是我一生中最勇敢的瞬间",
  "远在世界尽头的你站在我面前",
  "这是我一生中最勇敢的瞬间",
  "我的眼中藏着星点嘴角有弧线",
  "这是我一生中最勇敢的瞬间",
  "你是黎明地平线是我永恒的终点",
  "我想把时间揉成碎片捧在我手心",
  "再见面就是永远",
] as const;

export const memories = [
  { image: `${BASE}media/memories/movie.webp`, label: "一起看过的电影" },
  { image: `${BASE}media/memories/clay-1.webp`, label: "一起捏过的泥巴" },
  { image: `${BASE}media/memories/flowers.webp`, label: "一起留下的花" },
  { image: `${BASE}media/memories/blocks.webp`, label: "一起拼起的小世界" },
  { image: `${BASE}media/memories/home.webp`, label: "一点一点，点缀成家" },
] as const;

export const food = [
  { key: "sukiyaki", name: "寿喜烧" },
  { key: "bistro",   name: "小酒馆" },
  { key: "puffer",   name: "河豚" },
  { key: "birthday", name: "生日蛋糕" },
  { key: "hotpot",   name: "火锅" },
  { key: "mushroom", name: "菌子" },
  { key: "oyster",   name: "生蚝" },
  { key: "luosifen", name: "螺蛳粉" },
  { key: "guizhou",  name: "贵州菜" },
].map((item) => ({
  src: `${BASE}media/food/${item.key}.webp`,
  name: item.name,
}));

export const couple = [
  `${BASE}media/couple/booth.webp`,
  `${BASE}media/couple/metro.webp`,
  `${BASE}media/couple/changshu.webp`,
  `${BASE}media/couple/tonglu.webp`,
  `${BASE}media/couple/zhouzhuang.webp`,
  `${BASE}media/couple/clay.webp`,
  `${BASE}media/couple/train.webp`,
];

export const songs = [
  { title: "让暖风给你送去个拥抱", artist: "", line: "睡吧，靠近我，拥抱我，要快乐。" },
  { title: "这是我一生中最勇敢的瞬间", artist: "棱镜", line: "我想把时间揉成碎片捧在我手心，再见面就是永远。" },
  { title: "蝴蝶", artist: "陶喆", line: "[ 留给你：这首歌让你想到的画面 ]" },
  { title: "特别的人", artist: "方大同", line: "给那个无可替代的、特别的人。" },
  { title: "麦恩莉", artist: "方大同", line: "[ 留给你：最想放在这里的一句话 ]" },
] as const;

export const wishes = [
  "你一定会成为",
  "又会读书写作",
  "又会做田野",
  "又有很多想法",
  "思考又深入",
  "又有很多积累",
  "又有好作品",
  "又有能量",
  "又敏锐细心",
  "又开放积极",
  "又温柔共情",
  "又有锋芒又勇敢",
  "又有灵气",
  "又有足够的真朋友",
  "身体又健康",
  "生活又幸福",
  "逆境全部渡过的",
  "未来的人类学家",
] as const;

export const letter = [
  "亲爱的科科，\n你好呀~\n\n这才是那封蓄谋已久的信，哈哈哈哈哈，但因为种种原因拖到了现在，包括但不限于有些话在那封纸质的信里面已经写过啦。所以这里想写一些不一样的 哈哈哈哈 我将从以下观点阐述爱的一些命题？（好奇怪的表达 哈哈哈哈哈，以下内容存在大量不严谨的因果关系和可能的偷换概念 哈哈哈哈哈（但我想到什么就写什么啦，科科不要嫌弃，求求",
  "爱是永恒的吗？如果是，那肯定不会有如此多诗词歌赋去渲染，山无陵，江水为竭，如此的时间跨度又怎会是人的一生短短几十年所能承受的。爱是一种感觉吗？我觉得也不是，无论是开心还是难过，感觉总是过一段时间就会消失的。爱可以变成永恒的吗？有办法，但很残忍，当两个人在最好的时候分开，我想这时候爱就变成了记忆，这样的记忆可能确实是永恒的。所以爱是会变化的？我想是的，爱是什么可能很难给出明确的定义吧。",
  "爱情和亲情的关系又是什么样的？我看到过这样的说法，为什么夫妻是财产的第一继承人而非子女，因为相比于本能的亲情，爱情是基于契约关系所形成的，因此法律更相信爱情所带来的理性的契约关系，而不是亲情所承载的父母与子女之间的关系。",
  "那爱情会变为亲情吗？我觉得会哎，并且相比于父母和子女之间的亲情，爱情所转化为的亲情更理性，也更有厚度（当然并不是所有的爱情和婚姻都是如此。恩爱这个词很神奇，似乎也只有中国才有这样的表达，而且恩排在爱之前，虽然可能是音律等各种因素的影响 哈哈哈哈 恩爱和浪漫爱应该是不一样的，当然这些概念受到各种国内外思潮的影响，其关系我也没办法理清，这里提到是因为想给你说谢谢你~",
  "在亲密关系中为什么会有对主体性的讨论，什么时候需要去讨论主体性，以及什么样的情况才是丧失了主体性呢？我想这里有一个小小的前提需要说明，就是我爱你，所以你的感受远比我要重要，我希望我们之间可以更好，所以我尊重你，不允许自己伤害你。我觉得当自己感觉活成了跟过去完全不一样的人（这里仅指比较差的方面，朋友、志向、爱好都消失了，我觉得这时候可以叫丧失了主体性。但是当我按照科科的生活节奏去生活的时候，我不觉得有哪些是我失去了的，我感受到的是前所未有的幸福呀~谢谢科科",
  "我知道我不是完美的，我爱你这句话说出来总显得轻薄，我爱你，我知道我们在这之前没有共同的经历，没有共同的社会网络，没有共同的爱好，但我想了解你，我也愿意把我的全部呈现给你，你愿意接纳我吗，爱你，不辞青山，相随与共。",
] as const;
