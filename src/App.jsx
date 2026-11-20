import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_PROJECTS } from "./projects/Project.js";
import "./App.css";

/* ==========================================================================
   Landing — "Listening at Paramount"
   Act 1 is one continuous scroll: the boat photo stays under you while the
   field note, the horizon and the first recording drift past. Then two
   full-screen snap slides — "another kind of heritage" and "the record".
   Copy lives in the objects below so it can be rewritten without touching
   the deck code. Photographs are in public/paramount-photos/.
   ========================================================================== */

const PHOTOS = {
  boat: "paramount-photos/outSea_expanded.jpg", // the boat-POV hero, panned through act 1
  protected: "paramount-photos/protected.jpg", // the gazetted building on slide 4
};

const NOTE = {
  kicker: "VOICES FROM THE WATER · 海上来声",
  title: "PARAMOUNT",
  zh: ["每天，海都会带走一些声音。", "引擎声、风声、渔网落水的声音，", "还有那些没有被写下来的故事。", "在 Paramount，", "我们沿着潮汐，记录一群以海为生的人。"],
  en: ["Every day, the sea carries a few more voices away.", "The engine, the wind, the sound of nets meeting water,", "and the stories that were never written down.", "In Paramount, we followed the tide", "to record the people whose lives are shaped by the sea,"],
};

const BEAT = {
  kicker: "The tide · 潮汐",
  lines: [
    {
      zh: "趁这些声音还在，趁这片海仍然记得。",
      en: "While their voices can still be heard, and while the water still remembers.",
    },
  ],
};

const RECORDING = {
  label: "Interview excerpts · Paramount",
  language: "Spoken in Chinese 中文",
  attribution: "— 梁明德 · interview notes · English translated",
  duration: 24,
  transcript: [
    {
      t: 0,
      zh: "捕鱼不是科技、不是科研。",
      en: "Fishing is neither technology nor science.",
    },
    {
      t: 8,
      zh: "最要紧是你要了解到这里的海哪里会比较多一点点，",
      en: "What matters most is knowing where this sea holds a little more fish.",
    },
    {
      t: 16,
      zh: "这些靠经验和运气。涨潮退潮，顺其自然",
      en: "It takes experience and luck. The tide rises and falls; you go with its flow.",
    },
  ],
};

const LINE = {
  kicker: "Heritage · 遗产",
  title: "Another kind of heritage",
  lines: [
    {
      zh: "乔治市的遗产大多是看得见的：老房子、庙宇、招牌。几百米外就有一栋，挂着「受保护地段」。",
      en: "George Town's heritage is mostly things you can see: old houses, temples, painted signs. One of them stands a few hundred metres inland, marked “Protected Place”.",
    },
    {
      zh: "Paramount 这边的遗产是一套知识：怎么读潮水，怎么看天。没有牌子，所以我们把它写下来。",
      en: "Here it's a set of knowledge: how to read the tide, how to read the sky. There's no sign for that, so we wrote it down.",
    },
  ],
};

const GATEWAY = [
  { to: "/paramount/cultural-map", k: "Where it sits", t: "Cultural Map", d: "The shore against the coastline it belongs to." },
  { to: "/paramount/glossary", k: "How they read it", t: "Glossary", d: "Local terms for tide, weather and luck." },
  { to: "/paramount/story", k: "In their words", t: "Stories", d: "Recorded accounts, kept close to the telling." },
];

const DOTS = ["The shore", "The horizon", "The recording", "Another kind of heritage", "The record"];
const TIDES = [
  "16:40 · 退潮 −0.4m",
  "17:04 · 退潮 −0.7m",
  "17:28 · 退潮 −0.9m",
  "17:42 · 退潮 −1.0m",
  "17:55 · 退潮 −1.1m",
];

function App() {
  const deckRef = useRef(null);
  const act1Ref = useRef(null);
  const heritageRef = useRef(null);
  const recordRef = useRef(null);

  const hudRef = useRef(null);
  const noteRef = useRef(null);
  const brushRef = useRef(null);
  const cueRef = useRef(null);
  const bootRef = useRef(null);
  const beatRef = useRef(null);
  const listeningRef = useRef(null);
  const cardRef = useRef(null);
  const tideRef = useRef(null);
  const horizonRef = useRef(null);

  const waveRef = useRef(null);
  const transcriptRef = useRef(null);
  const curTimeRef = useRef(null);
  const playRef = useRef(null);
  const playIconRef = useRef(null);
  const cur = useRef(0);
  const playing = useRef(false);
  const recPlayed = useRef(false);

  const [active, setActive] = useState(0);

  /* ----- ambient shore sound ----- */
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  const wantSoundRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);
  const TARGET_VOL = 0.55;

  const fadeAudio = useCallback((to, ms, done) => {
    const el = audioRef.current;
    if (!el) return;
    clearInterval(fadeRef.current);
    const from = el.volume;
    const started = Date.now();
    fadeRef.current = setInterval(() => {
      const k = Math.min(1, (Date.now() - started) / ms);
      el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
      if (k >= 1) {
        clearInterval(fadeRef.current);
        if (done) done();
      }
    }, 40);
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    wantSoundRef.current = next;
    setSoundOn(next);
    const el = audioRef.current;
    if (!el) return;
    clearInterval(fadeRef.current);
    if (next) {
      el.volume = 0;
      el.play()
        .then(() => {
          if (wantSoundRef.current) fadeAudio(TARGET_VOL, 1400);
          else el.pause(); // turned off before playback started
        })
        .catch(() => {
          /* browser blocked playback — leave it off */
          wantSoundRef.current = false;
          setSoundOn(false);
        });
    } else {
      fadeAudio(0, 500, () => el.pause());
      setTimeout(() => {
        if (!wantSoundRef.current) el.pause();
      }, 600); // hard stop in case the fade was pre-empted
    }
  }, [soundOn, fadeAudio]);

  const goTo = useCallback((i) => {
    const deck = deckRef.current;
    if (!deck) return;
    const n = Math.max(0, Math.min(DOTS.length - 1, i));
    const a1 = Math.max(1, (act1Ref.current?.offsetHeight || 0) - deck.clientHeight);
    const targets = [
      0,
      a1 * 0.42,
      a1 * 0.78,
      heritageRef.current?.offsetTop || a1,
      recordRef.current?.offsetTop || a1,
    ];
    deck.scrollTo({ top: targets[n], behavior: "smooth" });
  }, []);

  useEffect(() => {
    const deck = deckRef.current;
    const audioEl = audioRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const smooth = (x) => {
      x = clamp(x, 0, 1);
      return x * x * (3 - 2 * x);
    };

    const prevBg = document.body.style.background;
    const prevOverflow = document.body.style.overflow;
    document.body.style.background = "#0f1519";
    document.body.style.overflow = "hidden";

    /* ---------- entrance ---------- */
    const timers = [];
    if (reduce) {
      [hudRef, noteRef, brushRef, cueRef].forEach((r) => r.current?.classList.add("is-in"));
      bootRef.current?.classList.add("is-gone");
      heritageRef.current?.classList.add("is-active");
      recordRef.current?.classList.add("is-active");
    } else {
      timers.push(setTimeout(() => bootRef.current?.classList.add("is-gone"), 150));
      timers.push(setTimeout(() => brushRef.current?.classList.add("is-in"), 700));
      timers.push(setTimeout(() => noteRef.current?.classList.add("is-in"), 1000));
      timers.push(setTimeout(() => hudRef.current?.classList.add("is-in"), 1500));
      timers.push(setTimeout(() => cueRef.current?.classList.add("is-in"), 2100));
    }

    /* ---------- horizon waveform ---------- */
    const hz = horizonRef.current;
    const hc = hz.getContext("2d");
    const HW = 1700;
    const HH = 120;
    const sizeHz = () => {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      hz.width = HW * d;
      hz.height = HH * d;
      hc.setTransform(d, 0, 0, d, 0, 0);
    };
    sizeHz();
    const drawHz = (t) => {
      hc.clearRect(0, 0, HW, HH);
      const mid = HH * 0.5;
      const path = () => {
        hc.beginPath();
        for (let x = 0; x <= HW; x += 3) {
          const nx = x / HW;
          const sw = Math.sin(nx * 3.4 + t * 0.0005) * 6 + Math.sin(nx * 9 - t * 0.0012) * 3;
          const pk = 0.5 + 0.5 * Math.sin(nx * 19 + t * 0.0014);
          const j =
            (Math.sin(x * 0.5 + t * 0.006) +
              Math.sin(x * 1.15 - t * 0.009) * 0.6 +
              Math.sin(x * 2.1 + t * 0.013) * 0.3) *
            5.5 *
            pk;
          const y = mid + sw + j;
          x === 0 ? hc.moveTo(x, y) : hc.lineTo(x, y);
        }
      };
      const g = hc.createLinearGradient(0, 0, HW, 0);
      g.addColorStop(0, "rgba(224,233,238,0)");
      g.addColorStop(0.5, "rgba(238,243,246,1)");
      g.addColorStop(1, "rgba(224,233,238,0)");
      hc.strokeStyle = g;
      hc.lineCap = "round";
      hc.lineJoin = "round";
      hc.globalAlpha = 0.15;
      hc.lineWidth = 13;
      path();
      hc.stroke();
      hc.globalAlpha = 0.4;
      hc.lineWidth = 5;
      path();
      hc.stroke();
      hc.globalAlpha = 1;
      hc.lineWidth = 2.2;
      path();
      hc.stroke();
      hc.globalAlpha = 1;
    };

    /* ---------- listening component ---------- */
    const wave = waveRef.current;
    const wc = wave.getContext("2d");
    const WN = 140;
    const bars = [];
    for (let i = 0; i < WN; i++) {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      const r = s - Math.floor(s);
      const env = Math.sin((i / WN) * Math.PI);
      bars.push(0.12 + r * 0.9 * (0.35 + 0.65 * env));
    }
    const DUR = RECORDING.duration;
    const lineEls = () => transcriptRef.current.querySelectorAll(".pm-line");
    let wW = 600;
    const wH = 52;
    const fmt = (x) => {
      const m = Math.floor(x / 60);
      const sc = Math.floor(x % 60);
      return m + ":" + (sc < 10 ? "0" : "") + sc;
    };
    const renderWave = () => {
      wc.clearRect(0, 0, wW, wH);
      const bw = wW / WN;
      const mid = wH / 2;
      const pr = cur.current / DUR;
      for (let i = 0; i < WN; i++) {
        const bh = bars[i] * wH * 0.9;
        wc.fillStyle = i / WN <= pr ? "#bf5730" : "rgba(143,154,160,0.5)";
        wc.fillRect(i * bw, mid - bh / 2, Math.max(1, bw - 1.3), bh);
      }
      wc.fillStyle = "rgba(238,243,246,.9)";
      wc.fillRect(pr * wW - 1, 0, 2, wH);
    };
    const highlight = () => {
      const els = lineEls();
      let a = -1;
      RECORDING.transcript.forEach((l, i) => {
        if (cur.current >= l.t) a = i;
      });
      els.forEach((el, i) => {
        const on = i === a;
        el.classList.toggle("is-on", on);
        if (on && playing.current) {
          transcriptRef.current.scrollTo({
            top: el.offsetTop - transcriptRef.current.clientHeight / 2 + el.clientHeight / 2,
            behavior: reduce ? "auto" : "smooth",
          });
        }
      });
      wave.setAttribute("aria-valuenow", Math.round(cur.current));
    };
    const frame = () => {
      renderWave();
      highlight();
      if (curTimeRef.current) curTimeRef.current.textContent = fmt(cur.current);
    };
    const playEl = playRef.current;
    const setPlaying = (v) => {
      playing.current = v;
      playEl?.setAttribute("aria-label", (v ? "Pause" : "Play") + " recording (simulated)");
      if (playIconRef.current) {
        playIconRef.current.innerHTML = v
          ? '<path d="M3 2h4v12H3zM9 2h4v12H9z"/>'
          : '<path d="M4 2l10 6-10 6z"/>';
      }
    };
    const sizeWave = () => {
      const d = Math.min(window.devicePixelRatio || 1, 1.5);
      wW = wave.getBoundingClientRect().width || 600;
      wave.width = wW * d;
      wave.height = wH * d;
      wc.setTransform(d, 0, 0, d, 0, 0);
      renderWave();
    };
    sizeWave();

    const tickId = setInterval(() => {
      if (!playing.current) return;
      cur.current += 0.1;
      if (cur.current >= DUR) {
        cur.current = DUR;
        setPlaying(false);
      }
      frame();
    }, 100);

    const onPlayClick = () => {
      if (cur.current >= DUR) cur.current = 0;
      setPlaying(!playing.current);
      if (!playing.current) frame();
    };
    const onWaveClick = (e) => {
      const r = wave.getBoundingClientRect();
      cur.current = clamp(((e.clientX - r.left) / r.width) * DUR, 0, DUR);
      frame();
    };
    const onWaveKey = (e) => {
      if (e.key === "ArrowRight") {
        cur.current = clamp(cur.current + 1, 0, DUR);
        frame();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        cur.current = clamp(cur.current - 1, 0, DUR);
        frame();
        e.preventDefault();
      } else if (e.key === " " || e.key === "Enter") {
        onPlayClick();
        e.preventDefault();
      }
    };
    playEl?.addEventListener("click", onPlayClick);
    wave.addEventListener("click", onWaveClick);
    wave.addEventListener("keydown", onWaveKey);

    /* ---------- act-1 progress (scroll-driven) + which section for the chrome ---------- */
    const beat = beatRef.current;
    const listening = listeningRef.current;
    const REC_AT = 0.74;
    const REC_W = 0.17;
    const BEAT_AT = 0.44;
    const BEAT_W = 0.17;

    let currentDot = -1;
    let inAct1 = true;
    const act1Range = () => Math.max(1, (act1Ref.current?.offsetHeight || 1) - deck.clientHeight);

    const render = (p) => {
      deck.style.setProperty("--p", p.toFixed(4));
      noteRef.current?.classList.toggle("is-out", p > 0.12);
      cueRef.current?.classList.toggle("is-out", p > 0.06);

      const bf = smooth(1 - Math.abs(p - BEAT_AT) / BEAT_W);
      beat.style.opacity = bf.toFixed(3);

      const rf = smooth(1 - Math.abs(p - REC_AT) / REC_W);
      listening.style.opacity = rf.toFixed(3);
      listening.style.background = `rgba(9, 13, 16, ${(rf * 0.5).toFixed(3)})`;
      if (cardRef.current) cardRef.current.style.transform = `translateY(${(28 - rf * 28).toFixed(1)}px)`;
      listening.classList.toggle("is-live", rf > 0.6);
      if (rf > 0.55 && !recPlayed.current) {
        recPlayed.current = true;
        setPlaying(true);
      }
      if (rf < 0.2 && playing.current) setPlaying(false);
    };

    const readScroll = () => {
      const p = clamp(deck.scrollTop / act1Range(), 0, 1);
      render(p);
      inAct1 = p < 0.999;

      const hTop = heritageRef.current?.offsetTop ?? Infinity;
      const rTop = recordRef.current?.offsetTop ?? Infinity;
      const st = deck.scrollTop + deck.clientHeight * 0.5;
      let dot;
      if (st >= rTop) dot = 4;
      else if (st >= hTop) dot = 3;
      else if (p > 0.6) dot = 2;
      else if (p > 0.28) dot = 1;
      else dot = 0;
      if (dot !== currentDot) {
        currentDot = dot;
        setActive(dot);
        if (tideRef.current) tideRef.current.textContent = TIDES[dot];
        deck.classList.toggle("is-paper", dot === 3);
        if (dot === 3) heritageRef.current?.classList.add("is-active");
        if (dot === 4) recordRef.current?.classList.add("is-active");
      }
    };

    let previousY = deck.scrollTop;
    const onDeckScroll = () => {
      const y = deck.scrollTop;
      const heritageTop = heritageRef.current?.offsetTop ?? Infinity;
      const recordTop = recordRef.current?.offsetTop ?? Infinity;
      const crossingIntoHeritage =
        previousY < heritageTop && y > previousY && y >= heritageTop - deck.clientHeight * 0.18;
      const crossingIntoRecord =
        previousY < recordTop && y > previousY && y >= recordTop - deck.clientHeight * 0.18;
      previousY = y;

      if (crossingIntoHeritage && y < heritageTop) {
        deck.scrollTo({ top: heritageTop, behavior: "instant" });
        previousY = heritageTop;
      } else if (crossingIntoRecord && y < recordTop) {
        deck.scrollTo({ top: recordTop, behavior: "instant" });
        previousY = recordTop;
      }

      if (deck.scrollTop >= heritageTop - 2 && wantSoundRef.current) {
        wantSoundRef.current = false;
        setSoundOn(false);
        fadeAudio(0, 450, () => audioEl?.pause());
      }
      readScroll();
    };
    deck.addEventListener("scroll", onDeckScroll, { passive: true });
    readScroll();

    /* the horizon line keeps moving; the rest is driven straight off scroll */
    let rafId = 0;
    if (reduce) {
      drawHz(3000);
    } else {
      const loop = (t) => {
        if (inAct1) drawHz(t);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    /* ---------- keyboard ---------- */
    let keyTarget = 0;
    let lastKeyAt = 0;
    const onKey = (e) => {
      if (e.target.closest("input, textarea, [contenteditable], .pm-wave")) return;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        keyTarget = (Date.now() - lastKeyAt < 900 ? keyTarget : currentDot) + 1;
        lastKeyAt = Date.now();
        goTo(keyTarget);
        e.preventDefault();
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        keyTarget = (Date.now() - lastKeyAt < 900 ? keyTarget : currentDot) - 1;
        lastKeyAt = Date.now();
        goTo(keyTarget);
        e.preventDefault();
      } else if (e.key === "Home") {
        goTo(0);
        e.preventDefault();
      } else if (e.key === "End") {
        goTo(DOTS.length - 1);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);

    let alive = true;
    const onResize = () => {
      if (!alive) return;
      sizeHz();
      sizeWave();
      readScroll();
    };
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) document.fonts.ready.then(onResize);

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
      clearInterval(tickId);
      cancelAnimationFrame(rafId);
      deck.removeEventListener("scroll", onDeckScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      playEl?.removeEventListener("click", onPlayClick);
      wave.removeEventListener("click", onWaveClick);
      wave.removeEventListener("keydown", onWaveKey);
      document.body.style.background = prevBg;
      document.body.style.overflow = prevOverflow;
      clearInterval(fadeRef.current);
      if (audioEl) audioEl.pause();
    };
  }, [goTo, fadeAudio]);

  const base = import.meta.env.BASE_URL;
  const rootStyle = {
    "--pm-boat": `url(${base}${PHOTOS.boat})`,
    "--pm-protected": `url(${base}${PHOTOS.protected})`,
  };

  return (
    <div className="landing" ref={deckRef} style={rootStyle}>
      <audio ref={audioRef} src={`${base}paramount-audio/shore.m4a`} loop preload="none" />
      <header className="pm-chapter-nav">
        <Link to={ALL_PROJECTS}>Penang Coastal Histories</Link>
        <span>Project Paramount</span>
        <Link to={ALL_PROJECTS}>Both projects <span aria-hidden="true">↗</span></Link>
      </header>

      {/* ---- fixed chrome ---- */}
      <div className="pm-hud" ref={hudRef} aria-hidden="true">
        <div className="pm-tl pm-mono">
          Paramount · <span className="pm-mark">Penang</span>
        </div>
        <div className="pm-tr pm-mono">
          Field notes<span className="pm-big">4 recordings</span>
        </div>
        <div className="pm-bl pm-mono">
          tide
          <span className="pm-big" ref={tideRef}>
            16:40 · 退潮 −0.4m
          </span>
        </div>
        <div className="pm-br pm-mono">
          5°28′N 100°17′E<span className="pm-big">Penang</span>
        </div>
      </div>

      <button
        className={`pm-sound ${soundOn ? "is-on" : ""}`}
        onClick={toggleSound}
        aria-pressed={soundOn}
      >
        <span className="pm-sound__dot" aria-hidden="true" />
        {soundOn ? "Sound on" : "Sound off"}
      </button>

      <nav className="pm-dots" aria-label="Sections">
        {DOTS.map((s, i) => (
          <button
            key={s}
            className={i === active ? "is-on" : ""}
            aria-label={`${i + 1}. ${s}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>

      {/* ---- act 1 · continuous scroll ---- */}
      <div className="pm-act1" ref={act1Ref}>
        <div className="pm-world">
          <div className="pm-bg pm-bg--photo" />
          <div className="pm-horizon">
            <canvas ref={horizonRef} />
          </div>
          <div className="pm-wash" />

          <div className="pm-note" ref={noteRef}>
            <p className="pm-k">{NOTE.kicker}</p>
            <h1 className="pm-wordmark">{NOTE.title}</h1>
            <div className="pm-intro">
              <p className="pm-lead" lang="zh">{NOTE.zh.map((line) => <span key={line}>{line}</span>)}</p>
              <p className="pm-lead pm-lead--en" lang="en">{NOTE.en.map((line) => <span key={line}>{line}</span>)}</p>
            </div>
            <Link className="pm-intro-cta" to="/paramount/story">进入他们的故事 · ENTER THEIR STORIES <span aria-hidden="true">↗</span></Link>
            <p className="pm-field-notes">FIELD NOTES <span>4 STORIES · 4 VOICES</span></p>
          </div>

          <div className="pm-brush" ref={brushRef} aria-hidden="true">
            潮
          </div>
          <div className="pm-cue" ref={cueRef}>
            故事从潮水开始 <small>FOLLOW THE TIDE</small><span />
          </div>

          <div className="pm-beat" ref={beatRef}>
            <div className="pm-scrim" />
            <div className="pm-col">
              <p className="pm-k">{BEAT.kicker}</p>
              {BEAT.lines.map((l, i) => (
                <p className="pm-beat-line" key={i}>
                  {l.zh}
                  <span className="pm-en">{l.en}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="pm-listening" ref={listeningRef}>
            <div className="pm-card" ref={cardRef}>
              <div className="pm-card-head">
                <span className="pm-mono">{RECORDING.label}</span>
                <span className="pm-mono">{RECORDING.language}</span>
              </div>
              <div className="pm-card-body">
                <button className="pm-play" ref={playRef} aria-label="Play recording (simulated)">
                  <svg ref={playIconRef} viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M4 2l10 6-10 6z" />
                  </svg>
                </button>
                <div className="pm-ww">
                  <canvas
                    className="pm-wave"
                    ref={waveRef}
                    role="slider"
                    aria-label="Seek recording"
                    aria-valuemin="0"
                    aria-valuemax={RECORDING.duration}
                    aria-valuenow="0"
                    tabIndex={0}
                  />
                  <div className="pm-clock">
                    <span ref={curTimeRef}>0:00</span>
                    <span>0:{String(RECORDING.duration).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
              <p className="pm-vh">Simulated playback — no audio yet. The transcript is the content.</p>
              <div className="pm-tr" ref={transcriptRef}>
                {RECORDING.transcript.map((l, i) => (
                  <div className="pm-line" key={i} data-t={l.t}>
                    <span className="pm-zh">{l.zh}</span>
                    <span className="pm-en">{l.en}</span>
                  </div>
                ))}
              </div>
              <p className="pm-attr">{RECORDING.attribution}</p>
            </div>
          </div>

          <div className="pm-boot" ref={bootRef} />
        </div>
      </div>

      {/* ---- slide · another kind of heritage ---- */}
      <section className="pm-slide pm-slide--heritage" ref={heritageRef}>
        <div
          className="pm-bg pm-bg--protected"
          role="img"
          aria-label="A gazetted heritage building a few hundred metres inland, marked 'Protected Place'"
        />
        <div className="pm-slide__in pm-slide__in--paper">
          <p className="pm-k">{LINE.kicker}</p>
          <h2>{LINE.title}</h2>
          {LINE.lines.map((l, i) => (
            <p key={i}>
              {l.zh}
              <span className="pm-en">{l.en}</span>
            </p>
          ))}
        </div>
      </section>

      {/* ---- slide · the record ---- */}
      <section className="pm-slide pm-slide--record" ref={recordRef}>
        <div className="pm-bg pm-bg--dark" />
        <div className="pm-slide__in">
          <p className="pm-k">The record · 记录</p>
          <h2 className="pm-record-h">
            这份记录还在做。
            <span className="pm-en">
              The record is still being made. The map, glossary and accounts are below.
            </span>
          </h2>
          <div className="pm-gateway">
            {GATEWAY.map((g) => (
              <Link to={g.to} key={g.to}>
                <span className="pm-gk">{g.k}</span>
                <span className="pm-gt">{g.t}</span>
                <span className="pm-gd">{g.d}</span>
              </Link>
            ))}
          </div>
          <div className="pm-foot">
            <Link to={ALL_PROJECTS}>← Both projects</Link>
            <span>Project Paramount · oral history</span>
            <span>recorded 2025-2026</span>
            <span>In partnership with JEDI</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
