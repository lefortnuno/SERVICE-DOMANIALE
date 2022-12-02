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
    <nav>
      <div className="logo-name">
        <div className="logo-image"></div>

        <span className="logo_name"> e-Tokotany </span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          {u_info.u_token ? (
            <>
              <li>
                <Link to="/utilisateur/" className="link-name">
                  {u_info.u_attribut} {u_info.u_numCompte} : {u_info.u_nom}
                </Link>
              </li>
              <li>
                <Link to="/utilisateur/" className="link-name">
                  Gestion des Utilisateurs
                </Link>
              </li>

              <li>
                <ul className="nav-links">
                  <li>
                    <Link to="/individu/" className="link-name">
                      Gestion des Individus
                    </Link>
                  </li>
                  <li>
                    <Link to="/requerant/" className="link-name">
                      Gestion des Requerant
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/dossier/" className="link-name">
                  Gestion des Nouvelles Demande
                </Link>
              </li>
              
              <li>
                <ul className="nav-links">
                  <li>
                    <Link to="/procedure/" className="link-name">
                      Gestion des Procedures
                    </Link>
                  </li>
                  <li>
                    <Link to="/bureau/" className="link-name">
                      Gestion des Bureaux
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <ul className="nav-links">
                  <li>
                    <Link to="/C_I/" className="link-name">
                      Cahier Interne
                    </Link>
                  </li>
                  <li>
                    <Link to="/bureau/" className="link-name">
                      Cahier de Depart
                    </Link>
                  </li>
                  <li>
                    <Link to="/bureau/" className="link-name">
                      Cahier d'Arriver
                    </Link>
                  </li>
                </ul>
              </li>

              <li onClick={seDeconnecter}>
                <span className="link-name"> Deconnection </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="link-name">
                  Creer un compte
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
