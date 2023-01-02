import Context from "../../contexts/Context";
import { DrapeauFanjakana } from "./drapeauGov";
import Domaine from "./domaine";
import { AccessBureau, AccessProcedures } from "../access/accessAll";
import { libraryList, AjoutLibrary } from "../../api/file.js";

export default function Accueil() {
  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <Context>
        <div className="row">
          <DrapeauFanjakana />
          <AccessBureau />
          <AccessProcedures />
        </div>
        <Domaine />
      </Context>
    </>
  );
}
