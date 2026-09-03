import "./PageHeader.css";

/**
 * Field-note header for a subpage.
 *
 * @param {string}  title     large display title
 * @param {string} [eyebrow]  mono kicker above the title
 * @param {string} [subtitle] one-line blurb (kept for older call sites)
 * @param {string} [lead]     a longer lead statement, shown below the title
 * @param {{k: string, v: string}[]} [meta]  small tabular figures
 * @param {string} [mark]     one or two characters, stamped large behind the
 *                            header — the same brush-mark device the landing
 *                            uses (潮 / 海), giving each section its own glyph
 * @param {React.ReactNode} [children]  extra controls, right-aligned on wide screens
 */
function PageHeader({ title, eyebrow, subtitle, lead, meta, mark, children }) {
  return (
    <header className="page-header">
      {mark && (
        <span className="page-header__mark" aria-hidden="true">
          {mark}
        </span>
      )}
      <div className="container page-header__inner">
        <div className="page-header__lede">
          {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
          <h1 className="page-header__title">{title}</h1>
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
          {lead && <p className="page-header__lead">{lead}</p>}
          {meta && meta.length > 0 && (
            <dl className="page-header__meta">
              {meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {children && <div className="page-header__aside">{children}</div>}
      </div>
    </header>
  );
}

export default PageHeader;
