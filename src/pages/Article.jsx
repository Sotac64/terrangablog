import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";
import EtatRequete from "../components/EtatRequete";
import CommentaireForm from "../components/CommentaireForm";
import ListeCommentaires from "../components/ListeCommentaires";
import { API_URL } from "../constants";

export default function Article() {
  const { id } = useParams();
  const { favoris, toggleFavori } = useOutletContext();

  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setChargement(true);
    setErreur("");

    Promise.all([
      fetch(`${API_URL}/posts/${id}`, { signal: controller.signal }),
      fetch(`${API_URL}/posts/${id}/comments`, { signal: controller.signal }),
    ])
      .then(([resArticle, resComms]) => {
        if (!resArticle.ok) throw new Error("Article introuvable.");
        if (!resComms.ok) throw new Error("Commentaires introuvables.");
        return Promise.all([resArticle.json(), resComms.json()]);
      })
      .then(([dataArticle, dataComms]) => {
        setArticle(dataArticle);
        setCommentaires(dataComms);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setErreur(err.message);
      })
      .finally(() => setChargement(false));

    return () => controller.abort();
  }, [id]);

  function ajouterCommentaire({ nom, message }) {
    const nouveau = {
      id: crypto.randomUUID(),
      nom,
      message,
    };
    setCommentaires((prec) => [nouveau, ...prec]);
  }

  const estFavori = article
    ? favoris.some((f) => f.id === article.id)
    : false;

  return (
    <section>
      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <button
              type="button"
              onClick={() => toggleFavori(article)}
            >
              {estFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
            </button>

            <h2>Commentaires</h2>
            <CommentaireForm onAjout={ajouterCommentaire} />
            <ListeCommentaires commentaires={commentaires} />
          </>
        )}
      </EtatRequete>
    </section>
  );
}