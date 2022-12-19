import HeaderContext from "./header/header.context";
import SidebarContext from "./sidebar/sidebar.context";
import FooterContext from "./footer/footer.context";
import { AjoutLibrary,libraryList } from "../api/file.js";


export default function Context(CONTENU) {
  return (
    <>
      <div className="wrapper">
        <HeaderContext URL_DE_BASE={CONTENU.URL_DE_BASE}/>
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


// export default function Context(props) {
//   return (
//     <>
//     <div >
//     <h1> okkkkk : {props.URL_DE_BASE}</h1>
//     <h1> child : {props.children}</h1>
//     </div>
//         {libraryList.forEach((x) => AjoutLibrary(x))}
//     </>
//   );
// }
