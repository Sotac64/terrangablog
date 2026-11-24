import { useState } from "react";
import { useNavigate} from "react-router";

export default function Connexion() {
  const {setConnecte } = useOutletcontext();
  const [Pseudo, setPseudo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
if (pseudo.trim()=== "") return;
    setConnecte(true);
    navigate("/mon-espace");
  };

  return(
    <section>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Votre pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </section>

  );
  }