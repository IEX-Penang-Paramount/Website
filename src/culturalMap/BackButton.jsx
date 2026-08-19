import "./BackButton.css";

function BackButton({ onClick }) {
  return (
    <button className="map-back-btn" onClick={onClick} aria-label="Back">
      &larr; Back
    </button>
  );
}

export default BackButton;
