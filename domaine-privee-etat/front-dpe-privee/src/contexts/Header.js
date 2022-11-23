import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.u_nom,
    u_prenom: localStorage.u_prenom,
    u_attribut: localStorage.u_attribut,
    u_photoPDP: localStorage.u_photoPDP,
    u_numCompte: localStorage.u_numCompte,
    u_etatCompte: localStorage.u_etatCompte,
  };

  const seDeconnecter = () => {
    // localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-secondary justify-content-center">
      <ul className="navbar-nav">
        {u_info.u_token ? (
          <>
          <li className="nav-item">
            <Link to="/utilisateur/" className="nav-link">
          {u_info.u_attribut} {u_info.u_numCompte} : {u_info.u_nom}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/utilisateur/" className="nav-link">
              Gestion des Utilisateurs
            </Link>
          </li>
            <li className="nav-item" onClick={seDeconnecter}>
              <p className="nav-link"> Deconnection </p>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Connection
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
