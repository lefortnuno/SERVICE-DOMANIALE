import Context from "../../../contexts/Context";
import FormulaireNouveauRequerant from "./FormulaireRequerant";

export default function AjoutRequerant() {
  return (
    <>
      <Context>
        <div className="monContainer">
          <header>Ajout nouveau requerant</header>

          <FormulaireNouveauRequerant />
        </div>
      </Context>
    </>
  );
}
