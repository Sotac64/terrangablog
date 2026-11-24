import {useOutletContext} from "react-router";

import ListeArticles from "../components/ListeArticles";
export default function Favoris() {
  const {favoris, toggleFavori} = useOutletContext();
  return (
    <section>
      <h1>Mes favoris
      ({favoris.length})</h1>
      {favoris.length === 0 ? (
        <p>Vous n'avez pas encore d'articles favoris.</p>
      ) : (
        <ListeArticles articles={favoris} onToggleFavori={toggleFavori} />
      )}
    </section>
  );
}