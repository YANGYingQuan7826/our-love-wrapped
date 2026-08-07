import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "图片素材");
const outputRoot = path.join(root, "public", "media");

const groups = {
  core: [
    ["封面照片.jpg", "cover"],
    ["照片墙.jpg", "wall", "inside"],
    ["合照/大头贴-合照.jpg", "hero-bg", "hero"],
  ],
  trips: [
    ["镇江-第1次出去玩/镇江1.jpg", "zhenjiang-1"],
    ["镇江-第1次出去玩/镇江3.jpg", "zhenjiang-2"],
    ["镇江-第1次出去玩/镇江4.jpg", "zhenjiang-3"],
    ["常熟-第2次出去玩/常熟1.jpg", "changshu-1"],
    ["常熟-第2次出去玩/常熟2.jpg", "changshu-2"],
    ["常熟-第2次出去玩/常熟3.jpg", "changshu-3"],
    ["常熟-第2次出去玩/常熟4.jpg", "changshu-4"],
    ["桐庐-第3次出去玩/桐庐1.jpg", "tonglu-1"],
    ["桐庐-第3次出去玩/桐庐2.jpg", "tonglu-2"],
    ["桐庐-第3次出去玩/桐庐3.jpg", "tonglu-3"],
    ["桐庐-第3次出去玩/桐庐4.jpg", "tonglu-4"],
    ["昆明--第4次出去玩/昆明.jpg", "kunming-1"],
    ["昆明--第4次出去玩/昆明1.jpg", "kunming-2"],
    ["昆明--第4次出去玩/昆明2.jpg", "kunming-3"],
    ["昆明--第4次出去玩/昆明3.jpg", "kunming-4"],
    ["昆明--第4次出去玩/昆明4.jpg", "kunming-5"],
  ],
  couple: [
    ["合照/大头贴-合照.jpg", "booth", "inside"],
    ["合照/地铁上-合照.jpg", "metro"],
    ["合照/常熟-合照.jpg", "changshu"],
    ["合照/桐庐-合照.jpg", "tonglu"],
    ["合照/苏州-周庄-合照.jpg", "zhouzhuang"],
    ["合照/捏泥巴-合照.jpg", "clay"],
    ["合照/高铁上.jpg", "train"],
    ["合照/闵行的最后一张照片-合照.jpg", "minhang"],
  ],
  memories: [
    ["共同的经历/再次出发之纽约遇见你.jpg", "movie"],
    ["共同的经历/小家点缀.jpg", "home"],
    ["共同的经历/干花.jpg", "flowers"],
    ["共同的经历/捏泥巴.jpg", "clay-1"],
    ["共同的经历/春逝1.jpg", "spring"],
    ["共同的经历/积木.jpg", "blocks"],
  ],
  food: [
    ["吃的/寿喜锅.jpg", "sukiyaki"],
    ["吃的/弄堂里小酒馆.jpg", "bistro"],
    ["吃的/河豚.jpg", "puffer"],
    ["吃的/生日快乐.jpg", "birthday"],
    ["吃的/痛风锅.jpg", "hotpot"],
    ["吃的/菌子锅.jpg", "mushroom"],
    ["吃的/蚵仔煎.jpg", "oyster"],
    ["吃的/螺蛳粉.jpg", "luosifen"],
    ["吃的/贵州烙锅.jpg", "guizhou"],
  ],
  dog: Array.from({ length: 7 }, (_, index) => [
    `毛毛/毛毛${index + 1}.jpg`,
    `maomao-${index + 1}`,
  ]),
};

await rm(outputRoot, { recursive: true, force: true });

for (const [group, items] of Object.entries(groups)) {
  const groupDir = path.join(outputRoot, group);
  await mkdir(groupDir, { recursive: true });

  for (const [source, name, mode = "cover"] of items) {
    const input = path.join(sourceRoot, source);
    const output = path.join(groupDir, `${name}.webp`);
    const pipeline = sharp(input).rotate();

    if (group === "food") {
      pipeline.resize(800, 800, { fit: "cover", position: "attention" });
    } else if (mode === "inside") {
      pipeline.resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      });
    } else if (mode === "hero") {
      pipeline.resize(1080, 1920, {
        fit: "cover",
        position: "attention",
      });
    } else {
      pipeline.resize(900, 1200, {
        fit: "cover",
        position: "attention",
      });
    }

    await pipeline.webp({ quality: 82, effort: 5 }).toFile(output);
  }
}

console.log("Prepared web assets in public/media");
