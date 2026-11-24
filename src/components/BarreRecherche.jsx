export default function
BarreRecherche({ valeur, onChangement }) {
  return (
    <div className="barre-recherche">
      <label htmlFor="recherche">Rechercher un article :</label>
      <input
      id="recherche"
      type="text"
      value={valeur}
      placeholder="Titre..."
      onChange={(e) => onChangement(e.target.value)}
      />
    </div>
  );
}
  