import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

function LayoutPrincipal() {
  const [favoris, setFavoris] = useState([]);

  function basculerFavori(article) {
    const dejaFavori = favoris.some((f) => f.id === article.id);
    if (dejaFavori) {
      setFavoris(favoris.filter((f) => f.id !== article.id));
    } else {
      setFavoris([...favoris, article]);
    }
  }

  return (
    <div>
      <header>
        <Link to="/">
          <img src="/logo-teranga-blog.png" alt="Logo Teranga Blog" height="40" />
        </Link>
        <nav>
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/auteurs">Auteurs</NavLink>
          <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
          </nav>
      </header>
      <main>
        <Outlet context={{ favoris, basculerFavori }} />

      </main>
    </div>
  
  );
}

export default LayoutPrincipal;
