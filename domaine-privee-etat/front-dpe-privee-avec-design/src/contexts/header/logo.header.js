import getDataUtilisateur from "../../api/udata";

export default function LogoHeader() {
  const u_info = getDataUtilisateur();
  return (
    <>
      <div className="logo-header">
        <a href="index.html" className="logo">
          e -Tokotany
        </a>

        {u_info.u_token ? (
          <>
          <button
            className="navbar-toggler sidenav-toggler ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="collapse"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
            <button className="topbar-toggler more">
              <i className="la la-ellipsis-v"></i>
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}
