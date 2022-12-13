export default function ProfilSidebar() {
  return (
    <>
      <div className="user">
        <div className="photo">
          <img src="assets/img/profile.jpg" />
        </div>
        <div className="info">
          <a
            className=""
            data-toggle="collapse"
            href="#collapseExample"
            aria-expanded="true"
          >
            <span>
              Trofel
              <span className="user-level">Administrator</span>
              <span className="caret"></span>
            </span>
          </a>
          <div className="clearfix"></div>

          <div
            className="collapse in"
            id="collapseExample"
            aria-expanded="true"
            // style={{''}}
          >
            <ul className="nav">
              <li>
                <a href="#profile">
                  <span className="link-collapse">My Profile</span>
                </a>
              </li>
              <li>
                <a href="#edit">
                  <span className="link-collapse">Edit Profile</span>
                </a>
              </li>
              <li>
                <a href="#settings">
                  <span className="link-collapse">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
