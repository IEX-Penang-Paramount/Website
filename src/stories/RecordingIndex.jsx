import { Link } from "react-router-dom";
import { stories } from "./Assets/StoryData.js";
import "./RecordingIndex.css";

const pad = (n) => String(n).padStart(2, "0");

/* A stable pseudo-random waveform glyph, seeded from the recording id, so each
   recording reads as its own take of tape even before real audio is wired in. */
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}

function Waveform({ seed, bars = 32 }) {
  const base = hashStr(seed);
  const heights = Array.from({ length: bars }, (_, i) => {
    let x = (base ^ Math.imul(i + 1, 2654435761)) >>> 0;
    x = (x ^ (x >>> 15)) >>> 0;
    x = Math.imul(x, 2246822519) >>> 0;
    const r = ((x ^ (x >>> 13)) % 1000) / 1000;
    const env = Math.sin((i / (bars - 1)) * Math.PI);
    return 0.15 + r * 0.85 * (0.4 + 0.6 * env);
  });
  return (
    <span className="wf" aria-hidden="true">
      {heights.map((v, i) => (
        <i key={i} style={{ height: `${Math.round(v * 100)}%` }} />
      ))}
    </span>
  );
}

/** The full run of recordings, numbered like a field log. */
function RecordingIndex() {
  if (stories.length === 0) {
    return <p className="rec-empty">No recordings transcribed yet.</p>;
  }

  const [lead, ...rest] = stories;

  return (
    <div className="rec-index">
      <Link className="rec-lead" to={`/story/${lead.articleID}`} data-reveal>
        <div className="rec-lead__head">
          <span className="rec-lead__no">REC {pad(1)}</span>
          <Waveform seed={lead.articleID} bars={48} />
        </div>
        <p className="rec-lead__quote">{lead.abstractQuote || lead.title}</p>
        <span className="rec-lead__meta">
          {lead.title} — {lead.author}
          {lead.time ? ` · ${lead.time}` : ""}
        </span>
      </Link>

      <ol className="rec-list">
        {rest.map((s, i) => (
          <li key={s.articleID} data-reveal style={{ "--reveal-delay": `${i * 0.05}s` }}>
            <Link className="rec-row" to={`/story/${s.articleID}`}>
              <span className="rec-row__no">REC {pad(i + 2)}</span>
              <Waveform seed={s.articleID} bars={24} />
              <span className="rec-row__quote">{s.abstractQuote || s.title}</span>
              <span className="rec-row__meta">
                {s.author}
                {s.time ? ` · ${s.time}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default RecordingIndex;
