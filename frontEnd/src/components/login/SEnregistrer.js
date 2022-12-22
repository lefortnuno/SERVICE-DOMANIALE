import FormulaireEnregistrement from "./Form.Enregistrement";
import Context from "../../contexts/Context";
import HeaderContext from "../../contexts/header/header.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import FooterContext from "../../contexts/footer/footer.context";

export default function SEnregistrer() {
  return (
    <>
      <Context>
        <div className="monContainer">
          <header>Création nouveau compte</header>

          <FormulaireEnregistrement />
        </div>
      </Context>
    </>
  );
}
