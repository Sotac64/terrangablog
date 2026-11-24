import { useState } from "react";

export default function CommentaireForm({ onAjout }) {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (nom.trim() === "" || message.trim().length < 5) {
      setErreur("Le nom est requis et le message doit faire au moins 5 caractères.");
      return;
    }
    onAjout({ nom: nom.trim(), message: message.trim() });
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form className="commentaire-form" onSubmit={handleSubmit}>
      {erreur && <p className="erreur">{erreur}</p>}
      <input
        type="text"
        placeholder="Votre nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <textarea
        placeholder="Votre message (5 caractères min.)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}