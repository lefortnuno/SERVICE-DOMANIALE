import FormulaireSeConnecter from "./Form.SeConnecter";
import HeaderContext from "../../contexts/header/header.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import FooterContext from "../../contexts/footer/footer.context";
import { AjoutLibrary, libraryList } from "../../api/file.js";

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
									src={process.env.PUBLIC_URL + `/picture/logo/fanjakana.jpg`}
									alt="image"
									// style={{ width: "100%", height: "80%", borderRadius: "0%" }}
									style={{ marginTop: "16%" }}
								/>
							</div>

							<FormulaireSeConnecter />
						</div>
					</div>
					<FooterContext />
				</div>
			</div>
			{libraryList.forEach((x) => AjoutLibrary(x))}
		</>
	);
}
