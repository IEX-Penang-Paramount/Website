import "./PeriodFilter.css";

/**
 * Switches the map between the periods found in the data (past, present, …).
 * The options are passed in, never assumed, so a new period in the data files
 * needs no change here.
 *
 * @param {{key: string, label: string}[]} options
 * @param {string} value  key of the selected option
 * @param {(key: string) => void} onChange
 */
function PeriodFilter({ options, value, onChange }) {
  if (options.length < 2) return null;

  return (
    <div className="period-filter">
      <span className="period-filter__label" id="period-filter-label">
        Period
      </span>
      <div
        className="period-filter__bar"
        role="group"
        aria-labelledby="period-filter-label"
      >
        {options.map((option) => {
          const on = option.key === value;
          return (
            <button
              key={option.key}
              type="button"
              className={`period-filter__btn ${on ? "period-filter__btn--on" : ""}`}
              aria-pressed={on}
              onClick={() => onChange(option.key)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PeriodFilter;
