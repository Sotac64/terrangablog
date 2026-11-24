import ArticleCard from "./ArticleCard";

export default function ListeArticles({ articles, favoris, onToggleFavori }) {
  if (articles.length === 0) {
    return <p>Aucun article ne correspond à votre recherche.</p>;
     }

  return (
    <div className="liste-articles">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          estFavori={favoris.some((fav) => fav.id === article.id)}

          onToggleFavori={onToggleFavori}
        />
      ))}
    </div>
  );
}
