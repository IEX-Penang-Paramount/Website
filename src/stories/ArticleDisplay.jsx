import { Suspense, createElement } from "react";
import { useParams, Link } from "react-router-dom";
import { useProject } from "../projects/ProjectContext.js";
import "./ArticleDisplay.css";

function ArticleDisplay() {
  const { articleID } = useParams();
  const project = useProject();
  const stories = project.getSection("stories");
  const article = stories.find(articleID);

  const back = (
    <Link className="article-back" to={project.pathTo(stories.getPath())}>
      ← Back to Stories
    </Link>
  );

  if (!article) {
    return (
      <div className="article-page">
        {back}
        <div className="article-not-found">Article not found.</div>
      </div>
    );
  }

  const heroImage = stories.getImage(articleID);
  const content = stories.getContent(articleID);

  return (
    <div className="article-page">
      {back}

      {heroImage && (
        <img
          className="article-hero"
          src={heroImage}
          alt={article.title}
        />
      )}

      <header className="article-header">
        <h1 className="article-header__title">{article.title}</h1>
        <div className="article-header__meta">
          <span>By {article.author}</span>
          <span>{article.time}</span>
        </div>
      </header>

      <div className="article-body">
        {content ? (
          <Suspense fallback={<p>Loading...</p>}>{createElement(content)}</Suspense>
        ) : (
          <p>No content available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ArticleDisplay;
