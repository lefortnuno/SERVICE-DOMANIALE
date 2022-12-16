import FormulaireSeConnecter from "./Form.SeConnecter";
import HeaderContext from "../../contexts/header/header.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import FooterContext from "../../contexts/footer/footer.context";

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
      </div>
    </>
  );
}
