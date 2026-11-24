export default function EtatRequete({chargement, erreur,children,}) {
  if(chargement) return <p className="etat">Chargement...</p>;
  if(erreur) return <p className="etat">Erreur : {erreur}</p>;
  return children;
}