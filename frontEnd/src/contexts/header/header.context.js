import LogoHeader from "./logo.header";
import SearchContext from "./search.context";
import NotificationHeader from "./notification.header";
import ProfilHeader from "./profil.header";
import getDataUtilisateur from "../../api/udata";

export default function HeaderContext(props) {
  const u_info = getDataUtilisateur();
  return (
    <>
      <div className="main-header">
        <LogoHeader />

        {u_info.u_token ? (
          <>
            <nav className="navbar navbar-header navbar-expand-lg">
              <div className="container-fluid">
                {/* <SearchContext /> */}
                {props.children}

                <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                  <NotificationHeader />
                  <ProfilHeader />
                </ul>
              </div>
            </nav>
          </>
        ) : null}
      </div>
    </>
  );
}
