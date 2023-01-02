import { Link } from "react-router-dom";

export default function NavbarContext() {
  return (
    <>
      <ul className="nav">
        <li className="nav-item active">
          <Link to="/accueil/">
            <i className="la la-dashboard"></i>
            <p> Accueil </p>
            <span className="badge badge-count">3</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dossier/">
            <i className="la la-dashboard"></i>
            <p> Dossiers </p>
            <span className="badge badge-count">1</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/utilisateur/">
            <i className="la la-dashboard"></i>
            <p> Personnes </p>
            <span className="badge badge-count">3</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/C_ND/">
            <i className="la la-dashboard"></i>
            <p> Cahiers </p>
            <span className="badge badge-count">5</span>
          </Link>
        </li>
        <br />
        <li className="nav-item">
          <Link to="/terrain/">
            <i className="la la-font"></i>
            <p>Terrain</p>
            <span className="badge badge-success">3</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/maps/">
            <i className="la la-font"></i>
            <p>Géographie</p>
            <span className="badge badge-danger">25</span>
          </Link>
        </li>
        <li className="nav-item" data-toggle="modal" data-target="#modalUpdate">
          <Link to="/accueil/">
            <i className="la la-dashboard"></i>
            <p> Aide </p>
          </Link>
        </li>
      </ul>
    </>
  );
}
