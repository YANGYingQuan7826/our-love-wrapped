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
  food,
  letter,
  lyricsWarmWind,
  memories,
  songs,
  stats,
  statsSummary,
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

function LyricCarousel({
  lines,
  interval = 2400,
  className = "",
}: {
  lines: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (lines.length <= 1) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % lines.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [interval, lines.length]);

  return (
    <div className={`lyric-carousel ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function StampCarousel({
  images,
  alt,
  interval = 1800,
  className = "",
  reveal,
}: {
  images: readonly string[];
  alt: string;
  interval?: number;
  className?: string;
  reveal?: { delay?: number };
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || images.length <= 1) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      interval,
    );
    return () => window.clearInterval(timer);
  }, [active, interval, images.length]);

  return (
    <motion.div
      ref={rootRef}
      className={className}
      initial={reveal ? { y: 18, opacity: 0 } : undefined}
      whileInView={reveal ? { y: 0, opacity: 1 } : undefined}
      viewport={reveal ? { amount: 0.35 } : undefined}
      transition={
        reveal
          ? { duration: 0.8, delay: reveal.delay ?? 0, ease: [0.22, 1, 0.36, 1] }
          : undefined
      }
    >
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </AnimatePresence>
    </motion.div>
  );
}

function TripCarousel({ images, alt }: { images: readonly string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || images.length <= 1) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, [active, images.length]);

  return (
    <div ref={rootRef} className="trip-carousel">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          loading="lazy"
          className="trip-carousel__image"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="trip-carousel__dots">
        {images.map((_, dotIndex) => (
          <span key={dotIndex} className={dotIndex === index ? "is-active" : ""} />
        ))}
      </div>
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
        <p className="eyebrow">PRIVATE EXHIBITION · {story.anniversaryDate}</p>
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

  return (
    <div ref={rootRef} className="story">
      <motion.div className="story__progress" style={{ height: progress }} />
      <AudioControl started />

      <Scene className="hero">
        <img src={story.heroBackground} alt="我们的大头贴合照" className="hero__backdrop" loading="eager" />
        <div className="hero__shade" />
        <motion.div
          className="hero__halo"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
        <p className="eyebrow">OUR LOVE WRAPPED · {story.anniversaryDate}</p>
        <RevealText className="hero__title">至如彩虹般<br />绚烂的你</RevealText>
        <RevealText className="hero__headphone" delay={0.15}>
          戴上耳机打开声音观看效果更佳，如果没有声音请科科随便选一首歌曲播放~
        </RevealText>
        <motion.p
          className="hero__scroll"
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          向上滑动
        </motion.p>
        <LyricCarousel lines={lyricsWarmWind} interval={2000} className="hero__lyric" />
      </Scene>

      <Scene className="number-collage">
        <p className="number-collage__kicker">OUR NUMBERS</p>
        <motion.div
          className="number-collage__list"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((item) => (
            <motion.div
              key={item.caption}
              className="number-collage__row"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="number-collage__number">{item.number}</span>
              <span className="number-collage__caption">{item.caption}</span>
            </motion.div>
          ))}
        </motion.div>
        <RevealText className="number-collage__summary">{statsSummary}</RevealText>
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
          className={`trip trip--${trip.layout}`}
          key={trip.city}
          style={{ "--trip-tone": trip.tone } as React.CSSProperties}
        >
          <div className="trip__meta">
            <span>{trip.index}</span>
            <p>{trip.kicker}</p>
          </div>

          {trip.layout === "hero" && (
            <div className="trip-hero">
              <motion.img
                src={trip.images[0]} alt={`${trip.city}旅行`}
                className="trip-hero__main"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
              <StampCarousel
                images={trip.images.slice(1)}
                alt={`${trip.city}旅行`}
                className="trip-hero__stamp"
                interval={1800}
                reveal={{ delay: 0.2 }}
              />
            </div>
          )}

          {trip.layout === "split" && (
            <div className="trip__grid">
              <motion.div className="trip__grid-main"
                initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <img src={trip.images[0]} alt={`${trip.city}旅行`} loading="lazy" />
              </motion.div>
              <StampCarousel
                images={trip.images.slice(1)}
                alt={`${trip.city}旅行`}
                className="trip__grid-side"
                interval={1800}
                reveal={{ delay: 0.15 }}
              />
            </div>
          )}

          {trip.layout === "carousel" && (
            <TripCarousel images={trip.images} alt={`${trip.city}旅行`} />
          )}

          {trip.layout === "gallery" && (
            <div className="trip-gallery">
              {trip.images.map((img, i) => (
                <img key={img} src={img} alt={`${trip.city}旅行`}
                  className="trip-gallery__item"
                  style={{ animationDelay: `${i * 0.15}s` } as React.CSSProperties}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          <div className="trip__copy">
            <RevealText className="trip__city">{trip.city}</RevealText>
            <RevealText className="trip__line" delay={0.12}>{trip.line}</RevealText>
            <p className="placeholder">{trip.placeholder}</p>
          </div>
          <div className="trip__spots">
            {trip.spots.map((s, i) => <span key={i}>{s}</span>)}
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
        <p className="couple-scene__lyric">你像蝴蝶飞出废墟，让我找回生命的美丽。</p>
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
          <span>♡</span>
        </motion.div>
        <RevealText className="music-intro__copy">
          有些歌一响起<br />就知道是你
        </RevealText>
      </Scene>

      <Scene className="letter-intro">
        <RevealText className="letter-intro__title">给科科的一封信</RevealText>
      </Scene>

      {letter.map((paragraph) => (
        <Scene className="letter-screen" key={paragraph}>
          <RevealText className="letter-screen__copy">{paragraph}</RevealText>
        </Scene>
      ))}

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
        <p className="wish-poem__lyric">在有生之年，My only girl friend</p>
      </Scene>

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
        <RevealText className="finale__title" delay={0.12}>
          你愿意跟我一起<br />续写后面的故事吗？
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
