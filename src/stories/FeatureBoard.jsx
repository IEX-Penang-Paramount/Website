import { useMemo } from "react";
import { Link } from "react-router-dom";
import { stories } from "./Assets/StoryData.js";
import "./FeatureBoard.css";

function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function FeatureBoard() {
  const featured = useMemo(() => pickRandom(stories, 3), []);

  return (
    <div className="feature-board">
      {featured.map((story) => (
        <Link
          key={story.articleID}
          className="feature-card"
          to={`/story/${story.articleID}`}
        >
          <p className="feature-card__quote">
            {story.abstractQuote || story.title}
          </p>
          <span className="feature-card__title">{story.title}</span>
        </Link>
      ))}
    </div>
  );
}

export default FeatureBoard;
