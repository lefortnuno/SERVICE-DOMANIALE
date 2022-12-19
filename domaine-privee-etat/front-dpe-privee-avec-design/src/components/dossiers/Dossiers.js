import Context from "../../contexts/Context";
import { libraryList, AjoutLibrary } from "../../api/file.js";
import { AccessCahierND } from "../access/accessAll";
import { NouvelleDemande } from "../access/accessAll";
import ListDossier from "./listDossier";

export default function Dossier() {
  return (
    <>
      <Context>
        <div className="row">
          <AccessCahierND />
          <NouvelleDemande />
        </div>
        <ListDossier />

      </Context>
        {libraryList.forEach((x) => AjoutLibrary(x))}
    </>
  );
}
