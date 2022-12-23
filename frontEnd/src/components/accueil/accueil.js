import Context from "../../contexts/Context";
import EnTete from "./enTete";
import Domaine from "./domaine";
import { AccessBureau, AccessProcedures } from "../access/accessAll";
import { libraryList, AjoutLibrary } from "../../api/file.js";

export default function Accueil() {
  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <Context>
        <EnTete />
        <div className="row">
          <AccessBureau />
          <AccessProcedures />
        </div>
        <Domaine />
      </Context>
    </>
  );
}
