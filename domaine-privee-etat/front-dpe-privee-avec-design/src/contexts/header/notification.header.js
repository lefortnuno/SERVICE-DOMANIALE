export default function NotificationHeader() {
  return (
    <>
      <li className="nav-item dropdown hidden-caret">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="la la-bell"></i>
          <span className="notification">3</span>
        </a>
        <ul
          className="dropdown-menu notif-box"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <div className="dropdown-title">Vous avez 3 notifications</div>
          </li>
          <li>
            <div className="notif-center">
              <a href="#">
                <div className="notif-icon notif-primary">
                  <i className="la la-comment"></i>
                </div>
                <div className="notif-content">
                  <span className="block">17 Validation Nouvelle Demande </span>
                  <span className="time">il y a 5 minutes </span>
                </div>
              </a>
              <a href="#">
                <div className="notif-icon notif-success">
                  <i className="la la-user-plus"></i>
                </div>
                <div className="notif-content">
                  <span className="block">2 Nouveau compte a approuvé</span>
                  <span className="time">il y a 12 minutes</span>
                </div>
              </a>
              {/* <a href="#">
                <div className="notif-img">
                  <img src="assets/img/profile2.jpg" alt="Img Profile" />
                </div>
                <div className="notif-content">
                  <span className="block">Approbation C.E.L</span>
                  <span className="time"> il y a 12 minutes </span>
                </div>
              </a> */}
            </div>
          </li>
          <li>
            {/* <a className="see-all" href="javascript:void(0);"> */}
            <a className="see-all" href="#">
              <strong>Voir toutes les notifications</strong>
              <i className="la la-angle-right"></i>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
}
