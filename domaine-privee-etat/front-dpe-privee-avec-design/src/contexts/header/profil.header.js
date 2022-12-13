

export default function ProfilHeader() {
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
          <span>Trofel</span>
        </a>
        <ul className="dropdown-menu dropdown-user">
          <li>
            <div className="user-box">
              <div className="u-img">
                <img src="assets/img/profile.jpg" alt="user" />
              </div>
              <div className="u-text">
                <h4>Trofel</h4>
                <p className="text-muted">Lefort@gmail.com</p>
                <a
                  href="profile.html"
                  className="btn btn-rounded btn-danger btn-sm"
                >
                  View Profile
                </a>
              </div>
            </div>
          </li>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="ti-user"></i> My Profile
          </a>
          <a className="dropdown-item" href="#">
            <i className="ti-user"></i> My Balance
          </a>
          <a className="dropdown-item" href="#">
            <i className="ti-email"></i> Inbox
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="ti-settings"></i> Account Setting
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            <i className="fa fa-power-off"></i> Logout
          </a>
        </ul>
      </li>
    </>
  );
}
