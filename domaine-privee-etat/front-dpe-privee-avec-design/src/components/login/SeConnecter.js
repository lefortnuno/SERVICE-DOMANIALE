import FormulaireSeConnecter from "./Form.SeConnecter";
import HeaderContext from "../../contexts/header/header.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import FooterContext from "../../contexts/footer/footer.context";

// Create the function
// export function AddLibrary(urlOfTheLibrary) {
//   const script = document.createElement("script");
//   script.src = urlOfTheLibrary;
//   script.async = true;
//   document.body.appendChild(script);
// }

// const tab = [
//   "/assets/js/core/jquery.3.2.1.min.js",
//   "/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js",
//   "/assets/js/core/popper.min.js",
//   "/assets/js/core/bootstrap.min.js",
//   "/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
//   "/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js",
//   "/assets/js/plugin/jquery-mapael/jquery.mapael.min.js",
//   "/assets/js/plugin/jquery-mapael/maps/world_countries.min.js",
//   "/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
//   "/assets/js/ready.min.js",
//   "/assets/js/demo.js",
//   "/logins/vendor/select2/select2.min.js",
//   "/logins/vendor/tilt/tilt.jquery.min.js",
//   "/logins/js/main.js",
// ];

export default function SeConnecter() {
  return (
    <>
      <div className="wrapper">
        <HeaderContext />
        <SidebarContext />

        <div className="main-panel">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="login100-pic js-tilt" data-tilt>
                <img
                  src={process.env.PUBLIC_URL + `/logins/images/img-01.png`}
                  alt="image"
                />
              </div>

              <FormulaireSeConnecter />
            </div>
          </div>
          <FooterContext />
        </div>

        {/* {AddLibrary(tab[0])}
        {AddLibrary(tab[1])}
        {AddLibrary(tab[2])}
        {AddLibrary(tab[3])}
        {AddLibrary(tab[4])}
        {AddLibrary(tab[5])}
        {AddLibrary(tab[6])}
        {AddLibrary(tab[7])}
        {AddLibrary(tab[8])}
        {AddLibrary(tab[9])}
        {AddLibrary(tab[10])}
        {AddLibrary(tab[11])}
        {AddLibrary(tab[12])}
        {AddLibrary(tab[13])} */}
      </div>
    </>
  );
}
