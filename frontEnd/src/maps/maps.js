import { useState } from "react";
import Context from "../contexts/Context";
import { libraryList, AjoutLibrary } from "../api/file.js";
import { DrapeauFanjakana } from "../components/accueil/drapeauGov";
import GoogleMap from "../components/GoogleMapIntegration/GoogleMap";

function MapsForFtsoa() {
  const [data, setData] = useState("No data");
  const GetData = (value) => {
    console.log(value, "got-value");
    setData(value);
  };
  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <Context>
        <div className="row">
          <DrapeauFanjakana />
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  Les Terrains Immatriculer et Borner à Fianarantsoa
                </h4>
                <p className="card-category">
                  Liste non disponible pour le moment !
                </p>
              </div>
              <GoogleMap />
            </div>
          </div>
        </div>
      </Context>
    </>
  );
}

export default MapsForFtsoa;
