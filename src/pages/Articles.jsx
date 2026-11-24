import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles";
import BarreRecherche from "../components/BarreRecherche";
import EtatRequete from "../components/EtatRequete";
import { API_URL } from "../constants";

export default function Articles() {
  const { favoris, toggleFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/posts?_limit=12`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement.");
        return res.json();
      })
      .then(setArticles)
      .catch((err) => {
        if (err.name !== "AbortError") setErreur(err.message);
      })
      .finally(() => setChargement(false));

    return () => controller.abort();
  }, []);

  const articlesFiltres = articles.filter((a) =>
    a.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <section>
      <h1>Articles</h1>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesFiltres}
          favoris={favoris}
          onToggleFavori={toggleFavori}
        />
      </EtatRequete>
    </section>
  );
}