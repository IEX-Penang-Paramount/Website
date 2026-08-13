import "./EmptyState.css";

/** Placeholder panel for a section whose content has not been added yet. */
function EmptyState({ message }) {
  return <p className="empty-state">{message}</p>;
}

export default EmptyState;
