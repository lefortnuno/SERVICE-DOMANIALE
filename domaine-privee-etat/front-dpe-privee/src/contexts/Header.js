import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  BsChevronRight,
  BsChevronLeft,
  BsSearch,
  BsToggleOff,
  BsToggleOn,
  BsMoon,
  BsSun,
  BsBoxArrowLeft,
  BsBoxArrowInRight,
} from "react-icons/bs";

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
    <div className="navbar navbar-expand-sm navbar-dark justify-content-center">
      <nav >
        <header>
          <div className="image-text">
            <div className="image">{/* <img src="logo.png" alt=""> */}</div>

            <div className="text logo-text">
              <span className="name"> e-Tokotany</span>
              <span className="profession"> by Trofel </span>
            </div>
          </div>
        </header>

        <div className="menu-bar">
          {u_info.u_token ? (
            <>
              <div className="menu">
                <ul className="navbar-nav">
                  <li className="nav-link">
                    <Link to="/utilisateur/" className="link-name">
                      {u_info.u_attribut} {u_info.u_numCompte} : {u_info.u_nom}
                    </Link>
                  </li>

                  <li className="nav-link">
                    <Link to="/utilisateur/" className="text nav-text">
                      Gestion des Utilisateurs
                    </Link>
                  </li>

                  <li className="nav-link">
                    <ul className="nav-links">
                      <li className="nav-link">
                        <Link to="/individu/" className="text nav-text">
                          Gestion des Individus
                        </Link>
                      </li>
                      <li className="nav-link">
                        <Link to="/requerant/" className="text nav-text">
                          Gestion des Requerant
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-link">
                    <Link to="/dossier/" className="text nav-text">
                      Gestion des Nouvelles Demande
                    </Link>
                  </li>

                  <li className="nav-link">
                    <ul className="nav-links">
                      <li>
                        <Link to="/procedure/" className="text nav-text">
                          Gestion des Procedures
                        </Link>
                      </li>
                      <li className="nav-link">
                        <Link to="/bureau/" className="text nav-text">
                          Gestion des Bureaux
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-link">
                    <ul className="nav-links">
                      <li>
                        <Link to="/C_I/" className="text nav-text">
                          Cahier Interne
                        </Link>
                      </li>
                      <li className="nav-link">
                        <Link to="/C_D/" className="text nav-text">
                          Cahier de Depart
                        </Link>
                      </li>
                      <li className="nav-link">
                        <Link to="/C_A/" className="text nav-text">
                          Cahier d'Arriver
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <ul className="navbar-nav">
                <li className="" onClick={seDeconnecter}>
                  <BsBoxArrowLeft />
                  <span className="link-name"> Deconnection </span>
                </li>
              </ul>
            </>
          ) : (
            <ul className="nav-links">
              <li>
                <Link to="/" className="link-name">
                  Creer un compte
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
