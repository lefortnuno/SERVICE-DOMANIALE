import { useState } from "react";
import Context from "../Context";
import { libraryList, AjoutLibrary } from "../../api/file.js.js";
import { DrapeauFanjakana } from "../../components/accueil/drapeauGov";
import GoogleMap from "../../components/GoogleMapIntegration/GoogleMap";

function MapsForFtsoa() {
	//#region // MES VARIABLE
	const terrainLatitude = -21.454443;
	const terrainLongitude = 47.114209;

	const [data, setData] = useState("No data");
	const GetData = (value) => {
		console.log(value, "got-value");
		setData(value);
	};
	//#endregion
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
							<GoogleMap
								latitude={terrainLatitude}
								longitude={terrainLongitude}
							/>
						</div>
					</div>
				</div>
			</Context>
		</>
	);
}

export default MapsForFtsoa;
