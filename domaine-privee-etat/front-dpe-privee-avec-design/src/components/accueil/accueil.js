import Context from "../../contexts/Context";
import { AccessBureau, AccessProcedures } from "../access/accessAll";
import { libraryList, AjoutLibrary } from "../../api/file.js";

export default function Accueil() {
  return (
    <>
      <Context>
        <AccessBureau />
        <AccessProcedures/>

        {libraryList.forEach(x=>AjoutLibrary(x))}
      </Context>
    </>
  );
}
