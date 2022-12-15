
import getDataUtilisateur from "../../api/udata";
import { useNavigate } from "react-router-dom";

export default function ProfilHeader() {

  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  const seDeconnecterDuSession = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="dropdown-toggle profile-pic"
          data-toggle="dropdown"
          href="#"
          aria-expanded="false"
        >
          <img
            src="assets/img/profile.jpg"
            alt="user-img"
            width="36"
            className="img-circle"
          />
          <span> {u_info.u_identification} </span>
        </a>
        <ul className="dropdown-menu dropdown-user">
          <li>
            <div className="user-box">
              <div className="u-img">
                <img src="assets/img/profile.jpg" alt="user" />
              </div>
              <div className="u-text">
                <h4> {u_info.u_identification} </h4>
                <p className="text-muted">{u_info.u_identification}t@gmail.com</p>
                <a
                  href="profile.html"
                  className="btn btn-rounded btn-danger btn-sm"
                >
                  Voir Profile
                </a>
              </div>
            </div>
          </li>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="ti-user"></i> Mon Profile
          </a>
          <a className="dropdown-item" href="#">
            <i className="ti-user"></i> Mes Dossiers
          </a>
          <a className="dropdown-item" href="#">
            <i className="ti-email"></i> Mes Taches
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="ti-settings"></i> Paramètre de compte 
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#" onClick={(e) => seDeconnecterDuSession(e)}>
            <i className="fa fa-power-off"></i> Se déconnecter
          </a>
        </ul>
      </li>
    </>
  );
}
