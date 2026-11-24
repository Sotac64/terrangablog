import {useOutletContext, Navigate} from "react-router";

export default function MonEspace(){
  const {connecte} = useOutletContext();
  if(!connecte){
    return <Navigate to="/connexion" replace />;
  }
  return (
    <section>
      <h2>Mon espace</h2>
      <p>Bienvenue, tu es connecté.</p>
    </section>
  );
}