import LogoHeader from "./logo.header";
import SearchContext from "./search.context";
import MessageHeader from "./message.header";
import NotificationHeader from "./notification.header";
import ProfilHeader from "./profil.header";

export default function HeaderContext() {
  return (
    <>
      <div className="main-header">
        <LogoHeader />

        <nav className="navbar navbar-header navbar-expand-lg">
          <div className="container-fluid">
            <SearchContext />

            <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
              <MessageHeader />
              <NotificationHeader />
              <ProfilHeader />
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
