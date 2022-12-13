import NavbarContext from "./navbar.context";
import ProfilSidebar from "./profil.sidebar";

export default function SidebarContext() {
  return (
    <>
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          <ProfilSidebar />
          <NavbarContext />
        </div>
      </div>
    </>
  );
}
