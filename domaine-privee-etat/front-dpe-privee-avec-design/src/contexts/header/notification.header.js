

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
            <div className="dropdown-title">You have 4 new notification</div>
          </li>
          <li>
            <div className="notif-center">
              <a href="#">
                <div className="notif-icon notif-primary">
                  <i className="la la-user-plus"></i>
                </div>
                <div className="notif-content">
                  <span className="block">New user registered</span>
                  <span className="time">5 minutes ago</span>
                </div>
              </a>
              <a href="#">
                <div className="notif-icon notif-success">
                  <i className="la la-comment"></i>
                </div>
                <div className="notif-content">
                  <span className="block">Rahmad commented on Admin</span>
                  <span className="time">12 minutes ago</span>
                </div>
              </a>
              <a href="#">
                <div className="notif-img">
                  <img src="assets/img/profile2.jpg" alt="Img Profile" />
                </div>
                <div className="notif-content">
                  <span className="block">Reza send messages to you</span>
                  <span className="time">12 minutes ago</span>
                </div>
              </a>
              <a href="#">
                <div className="notif-icon notif-danger">
                  <i className="la la-heart"></i>
                </div>
                <div className="notif-content">
                  <span className="block">Farrah liked Admin</span>
                  <span className="time">17 minutes ago</span>
                </div>
              </a>
            </div>
          </li>
          <li>
            {/* <a className="see-all" href="javascript:void(0);"> */}
            <a className="see-all" href="#">
              <strong>See all notifications</strong>
              <i className="la la-angle-right"></i>
            </a>
          </li>
        </ul>
      </li>
    </>
  );
}
