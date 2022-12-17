import NavbarContext from "./navbar.context";
import ProfilSidebar from "./profil.sidebar";
import getDataUtilisateur from "../../api/udata";

export default function SidebarContext() {
  const u_info = getDataUtilisateur();
  return (
    <>
      {u_info.u_token ? (
        <div className="sidebar">
          <div className="scrollbar-inner sidebar-wrapper">
            <ProfilSidebar />
            <NavbarContext />
          </div>
        </div>
      ) : null}
    </>
  );
}
