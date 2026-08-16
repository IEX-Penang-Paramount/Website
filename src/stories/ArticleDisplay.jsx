import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { stories } from "./Assets/StoryData.js";
import "./ArticleDisplay.css";

const images = import.meta.glob("./Assets/Images/*", { eager: true });
const contentModules = import.meta.glob("./Assets/Content/*.jsx");

function getArticleImage(articleID) {
  for (const [path, mod] of Object.entries(images)) {
    const filename = path.split("/").pop();
    const name = filename.substring(0, filename.lastIndexOf("."));
    if (name === articleID) {
      return mod.default;
    }
  }
  return null;
}

function getContentComponent(articleID) {
  const key = `./Assets/Content/${articleID}.jsx`;
  if (!contentModules[key]) return null;
  return lazy(contentModules[key]);
}

function ArticleDisplay() {
  const { articleID } = useParams();
  const article = stories.find((s) => s.articleID === articleID);

  if (!article) {
    return (
      <div className="article-page">
        <Link className="article-back" to="/story">
          ← Back to Stories
        </Link>
        <div className="article-not-found">Article not found.</div>
      </div>
    );
  }

  const heroImage = getArticleImage(articleID);
  const Content = getContentComponent(articleID);

  return (
    <div className="article-page">
      <Link className="article-back" to="/story">
        ← Back to Stories
      </Link>

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
        {Content ? (
          <Suspense fallback={<p>Loading...</p>}>
            <Content />
          </Suspense>
        ) : (
          <p>No content available yet.</p>
        )}
      </div>
    </div>
  );
}

export default ArticleDisplay;
