import HeaderContext from "./header/header.context";
import SidebarContext from "./sidebar/sidebar.context";
import FooterContext from "./footer/footer.context";
import { AjoutLibrary,libraryList } from "../api/file.js";


export default function Context(CONTENU) {
  return (
    <>
      <div className="wrapper">
        <HeaderContext />
        <SidebarContext />

        <div className="main-panel">
          <div className="content">
            <div className="container-fluid">{CONTENU.children}</div>
          </div>

          <FooterContext />
        </div>
      </div>
        {libraryList.forEach((x) => AjoutLibrary(x))}
    </>
  );
}
