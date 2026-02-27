
import React from "react";
import "./GlossaryPreview.css";

function NamePreviewPanel({ name }) {
  return (
    <div className="wordFrame" title={name}>
      {name}
    </div>
  );
}

function DescriptionPreviewPanel({ pDescription }) {
  return (
    <div className="namePrevFrame">
      <p className="pDescription">{pDescription}</p>
    </div>
  );
}

export function GlossaryPreview({ name, pDescription }) {
  return (
    <div className="despPrevFrame">
      <NamePreviewPanel name={name} />
      <DescriptionPreviewPanel pDescription={pDescription} />
    </div>
  );
}