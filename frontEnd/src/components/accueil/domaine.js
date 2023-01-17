import { Link } from "react-router-dom";
import GoogleMap from "../GoogleMapIntegration/GoogleMap";

export default function Domaine() {
	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">
								Circonscription Domaniale et Foncière  de Fianarantsoa
							</h4>
							<p className="card-category text-justify">
								Un organisme public responsable de la gestion et de la mise en
								valeur des biens fonciers et domaniaux dans la région de
								Fianarantsoa à Madagascar. 
								Il a pour mission de gérer les
								terrains et les biens immobiliers de l'État, de veiller à leur
								utilisation optimale et de percevoir les droits et les taxes qui
								y sont liés. Il peut également être chargé de la délivrance de
								titres de propriété et de l'enregistrement des transactions
								immobilières.  
							</p>
						</div>
						<GoogleMap latitude={-21.455757} longitude={47.084194} />
							<p className="card-category text-justify">
								Si vous avez des questions ou des problèmes liés à
								la gestion de vos biens fonciers ou domaniaux dans la région de
								Fianarantsoa, vous pouvez vous rendre au Service de
								Circonscription Domaniale et Foncière de Fianarantsoa ou vous
								renseigner auprès de ses agents pour obtenir de l'aide.
							</p>
					</div>
				</div>
			</div>
		</>
	);
}
