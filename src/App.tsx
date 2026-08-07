import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  couple,
  dogPhotos,
  food,
  letter,
  memories,
  petPoem,
  songs,
  story,
  trips,
  wishes,
} from "./content";

type FrameProps = {
  src: string;
  alt: string;
  square?: boolean;
  contain?: boolean;
};

function PhotoFrame({ src, alt, square = false, contain = false }: FrameProps) {
  return (
    <motion.figure
      className={`photo-frame ${square ? "photo-frame--square" : ""}`}
      initial={{ y: 36 }}
      whileInView={{ y: 0 }}
      viewport={{ amount: 0.45, once: false }}
      transition={{ duration: 0.9, ease: [0.2, 0.75, 0.2, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={contain ? "photo-frame__image photo-frame__image--contain" : "photo-frame__image"}
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1.02 }}
        viewport={{ amount: 0.35 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
    </motion.figure>
  );
}

function Scene({
  children,
  className = "",
  id,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} className={`scene ${className}`} style={style}>
      {children}
    </section>
  );
}

function RevealText({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: "110%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ amount: 0.7, once: false }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CyclingPhoto({
  photos,
  alt,
  square = false,
  interval = 1200,
}: {
  photos: readonly string[];
  alt: string;
  square?: boolean;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.55 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % photos.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [active, interval, photos.length]);

  return (
    <div
      ref={rootRef}
      className={`photo-frame cycling-photo ${square ? "photo-frame--square" : ""}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={photos[index]}
          src={photos[index]}
          alt={`${alt} ${index + 1}`}
          className="photo-frame__image"
          initial={{ opacity: 0, scale: 1.06, filter: "blur(5px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      </AnimatePresence>
      <span className="cycling-photo__count">
        {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </span>
    </div>
  );
}

function AudioControl({ started }: { started: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const hasTrack = Boolean(story.backgroundTrack);

  useEffect(() => {
    if (!started || !hasTrack || !audioRef.current) return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [hasTrack, started]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      {hasTrack && <audio ref={audioRef} src={story.backgroundTrack} loop preload="metadata" />}
      <button
        className={`audio-control ${playing ? "audio-control--playing" : ""}`}
        type="button"
        onClick={toggle}
        aria-label={hasTrack ? (playing ? "暂停音乐" : "播放音乐") : "背景音乐待添加"}
        title={hasTrack ? undefined : "将音乐文件地址写入 VITE_BACKGROUND_TRACK 即可播放"}
        disabled={!hasTrack}
      >
        <span />
        <span />
        <span />
      </button>
    </>
  );
}

function Unlock({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (digits === story.anniversaryPassword) {
      onUnlock();
      return;
    }
    setError(true);
    window.setTimeout(() => setError(false), 1100);
  };

  return (
    <motion.main
      className="unlock"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.75 }}
    >
      <div className="unlock__ambient" />
      <motion.img
        src={story.cover}
        alt="故事封面"
        className="unlock__photo"
        initial={{ opacity: 0, rotate: -5, y: 28 }}
        animate={{ opacity: 1, rotate: -2, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="unlock__content"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        <p className="eyebrow">PRIVATE EXHIBITION · 229</p>
        <h1>请输入<br />故事开始的日期</h1>
        <form onSubmit={submit}>
          <motion.div
            className="date-input"
            animate={error ? { x: [-8, 8, -6, 6, 0] } : undefined}
          >
            <input
              value={digits}
              onChange={(event) =>
                setDigits(event.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              autoComplete="off"
              aria-label="四位纪念日密码"
              placeholder="MMDD"
            />
            <span>{digits.length}/4</span>
          </motion.div>
          <button type="submit" disabled={digits.length !== 4}>
            打开回忆展 <span>↗</span>
          </button>
        </form>
        <p className={`unlock__feedback ${error ? "is-visible" : ""}`}>
          不是这一天，再想想。
        </p>
      </motion.div>
    </motion.main>
  );
}

function Story() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: rootRef });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [poemOpen, setPoemOpen] = useState(false);

  return (
    <div ref={rootRef} className="story">
      <motion.div className="story__progress" style={{ height: progress }} />
      <AudioControl started />

      <Scene className="hero">
        <motion.div
          className="hero__halo"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
        <p className="eyebrow">OUR LOVE WRAPPED · {story.anniversaryDate}</p>
        <RevealText className="hero__title">
          第<span>229</span>天
        </RevealText>
        <RevealText className="hero__subtitle" delay={0.15}>
          一场只为科科开放的回忆展
        </RevealText>
        <motion.p
          className="hero__scroll"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          向上滑动
        </motion.p>
      </Scene>

      <Scene className="number-collage">
        <motion.div
          className="number-collage__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {[
            { number: "229", caption: "个一起醒来的日子", size: "lg", x: 0, y: 0 },
            { number: "4", caption: "次共同出发", size: "md", x: 46, y: 4 },
            { number: "65", caption: "个被留下的画面", size: "md", x: -38, y: 28 },
            { number: "6", caption: "首认真记住的歌", size: "sm", x: 50, y: 44 },
            { number: "2", caption: "才是最重要的数字", size: "xl", x: -8, y: 62 },
          ].map((item) => (
            <motion.div
              key={item.caption}
              className={`number-collage__card number-collage__card--${item.size}`}
              style={
                {
                  "--tx": `${item.x}%`,
                  "--ty": `${item.y}%`,
                } as React.CSSProperties
              }
              variants={{
                hidden: { opacity: 0, y: 24, rotate: -4 },
                visible: { opacity: 1, y: 0, rotate: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="number-collage__number">{item.number}</span>
              <span className="number-collage__caption">{item.caption}</span>
            </motion.div>
          ))}
        </motion.div>
      </Scene>

      <Scene className="chapter chapter--travel">
        <p className="chapter__index">CHAPTER 01</p>
        <RevealText className="chapter__title">
          我们把喜欢<br />带去了远方
        </RevealText>
        <motion.div
          className="route-line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 1.2 }}
        />
      </Scene>

      {trips.map((trip) => (
        <Scene
          className="trip"
          key={trip.city}
          style={{ "--trip-tone": trip.tone } as React.CSSProperties}
        >
          <div className="trip__meta">
            <span>{trip.index}</span>
            <p>{trip.kicker}</p>
          </div>
          <div className="trip__grid">
            <motion.div
              className="trip__grid-main"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={trip.images[0]} alt={`${trip.city}旅行`} loading="lazy" />
            </motion.div>
            <motion.div
              className="trip__grid-side"
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={trip.images[1]} alt={`${trip.city}旅行`} loading="lazy" />
            </motion.div>
          </div>
          <div className="trip__copy">
            <RevealText className="trip__city">{trip.city}</RevealText>
            <RevealText className="trip__line" delay={0.12}>{trip.line}</RevealText>
            <p className="placeholder">{trip.placeholder}</p>
          </div>
        </Scene>
      ))}

      <Scene className="route-finale">
        <motion.div
          className="route-finale__line"
          initial={{ width: 0 }}
          whileInView={{ width: "78vw" }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 1.2 }}
        />
        <RevealText className="route-finale__copy">
          地图记录距离<br />我记住身边的你
        </RevealText>
      </Scene>

      <Scene className="chapter chapter--daily">
        <p className="chapter__index">CHAPTER 02</p>
        <RevealText className="chapter__title">
          远方之外<br />还有日常
        </RevealText>
      </Scene>

      {memories.map((memory) => (
        <Scene className="memory" key={memory.label}>
          <PhotoFrame src={memory.image} alt={memory.label} />
          <RevealText className="memory__label">{memory.label}</RevealText>
        </Scene>
      ))}

      <Scene className="food-scene">
        <div className="food-scene__type" aria-hidden="true">吃</div>
        <div className="food-masonry">
          {food.map((item, index) => (
            <motion.div
              key={item.src}
              className="food-masonry__card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <img src={item.src} alt={item.name} loading="lazy" />
              <span className="food-masonry__label">{item.name}</span>
            </motion.div>
          ))}
        </div>
        <RevealText className="food-scene__copy">
          爱有时，也是一起研究<br />下一顿吃什么。
        </RevealText>
      </Scene>

      <Scene className="chapter chapter--couple">
        <p className="chapter__index">CHAPTER 03</p>
        <RevealText className="chapter__title">
          后来的<br />我们
        </RevealText>
      </Scene>

      <Scene className="couple-scene">
        <CyclingPhoto photos={couple} alt="我们的合照" interval={1650} />
        <RevealText className="couple-scene__copy">
          给那个无可替代的<br />特别的人
        </RevealText>
        <p className="placeholder">[ 留给你：最想对照片里的我们说的一句话 ]</p>
      </Scene>

      <Scene className="music-intro">
        <motion.div
          className="record"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
        >
          <span>229</span>
        </motion.div>
        <RevealText className="music-intro__copy">
          有些歌一响起<br />就知道是你
        </RevealText>
      </Scene>

      {songs.map((song, index) => (
        <Scene className="song" key={song.title}>
          <p className="song__index">TRACK {String(index + 1).padStart(2, "0")}</p>
          <RevealText className="song__title">{song.title}</RevealText>
          {song.artist && <p className="song__artist">{song.artist}</p>}
          <motion.div
            className="song__wave"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ amount: 0.65 }}
            transition={{ duration: 1 }}
          />
          <RevealText className="song__line" delay={0.15}>{song.line}</RevealText>
        </Scene>
      ))}

      <Scene className="dog-scene">
        <p className="chapter__index">SPECIAL GUEST</p>
        <CyclingPhoto photos={dogPhotos} alt="毛毛" interval={1350} />
        <RevealText className="dog-scene__title">毛毛说</RevealText>
        <RevealText className="dog-scene__copy" delay={0.12}>
          我观察了229天<br />批准他继续陪着你
        </RevealText>
        <button className="nose-button" type="button" onClick={() => setPoemOpen(true)}>
          点一下鼻子，有彩蛋
        </button>
      </Scene>

      <AnimatePresence>
        {poemOpen && (
          <motion.div
            className="poem-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPoemOpen(false)}
          >
            <motion.div
              className="poem-modal__paper"
              initial={{ y: 60, rotate: -3 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: 50 }}
              onClick={(event) => event.stopPropagation()}
            >
              <p className="eyebrow">HIDDEN NOTE</p>
              <h2>臭葵卷儿之爱</h2>
              {petPoem.map((line) => <p key={line}>{line}</p>)}
              <button type="button" onClick={() => setPoemOpen(false)}>收好这张纸条</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Scene className="wish-poem">
        <p className="wish-poem__title">科科的愿望</p>
        <motion.div
          className="wish-poem__lines"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.35 } },
          }}
        >
          {wishes.map((line, index) => (
            <motion.p
              key={index}
              className="wish-poem__line"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </Scene>

      <Scene className="letter-intro">
        <RevealText className="letter-intro__title">给科科的一封信</RevealText>
        <p className="letter-intro__hint">音乐到这里，会轻一点。</p>
      </Scene>

      {letter.map((line, index) => (
        <Scene className="letter-line" key={line}>
          <p className="letter-line__index">{String(index + 1).padStart(2, "0")}</p>
          <RevealText className="letter-line__copy">{line}</RevealText>
        </Scene>
      ))}

      <Scene className="finale">
        <motion.img
          src={story.wall}
          alt="我们的照片墙"
          className="finale__wall"
          initial={{ scale: 1.18, opacity: 0 }}
          whileInView={{ scale: 1.02, opacity: 0.38 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 2 }}
        />
        <div className="finale__shade" />
        <RevealText className="finale__day">DAY 230</RevealText>
        <RevealText className="finale__title" delay={0.12}>
          下一页<br />等我们一起写
        </RevealText>
        <RevealText className="finale__wish" delay={0.22}>
          七夕快乐，我的女朋友。
        </RevealText>
        <button className="replay" type="button" onClick={() => rootRef.current?.scrollTo({ top: 0, behavior: "smooth" })}>
          再看一次
        </button>
      </Scene>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {unlocked ? <Story key="story" /> : <Unlock key="unlock" onUnlock={() => setUnlocked(true)} />}
    </AnimatePresence>
  );
}
