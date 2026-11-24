import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";
import { API_URL } from "../constants";

export default function Auteur() {
  const { id } = useParams();
  const { favoris, toggleFavori } = useOutletContext();

  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setChargement(true);
    setErreur("");

    Promise.all([
      fetch(`${API_URL}/users/${id}`, { signal: controller.signal }),
      fetch(`${API_URL}/posts?userId=${id}`, { signal: controller.signal }),
    ])
      .then(([resUser, resPosts]) => {
        if (!resUser.ok) throw new Error("Auteur introuvable.");
        if (!resPosts.ok) throw new Error("Articles introuvables.");
        return Promise.all([resUser.json(), resPosts.json()]);
      })
      .then(([dataUser, dataPosts]) => {
        setAuteur(dataUser);
        setArticles(dataPosts);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setErreur(err.message);
        }
      })
      .finally(() => {
        setChargement(false);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <section>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {auteur && (
          <>
            <h1>{auteur.name}</h1>
            <p>{auteur.email}</p>
            <p>{auteur.phone}</p>
            <p>{auteur.company?.name}</p>

            <h2>Ses articles</h2>
            <ListeArticles
              articles={articles}
              favoris={favoris}
              onToggleFavori={toggleFavori}
            />
          </>
        )}
      </EtatRequete>
    </section>
  );
}