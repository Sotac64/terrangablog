function ArticleCard({ article }) {
  return(
    <article className="article-card">
      <h3>{article.title}</h3>
      <p>{article.body.slice(0, 80)}...</p>
    </article>
  );
  
}

export default ArticleCard;