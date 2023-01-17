import { Link } from "react-router-dom";

import { BsFolderPlus, BsReceiptCutoff, BsHouseFill } from "react-icons/bs";

export function AccessBureau() {
	return (
		<>
			<div className="col-md-4">
				<div className="card card-stats">
					<Link to="/bureau">
						<div className="card-body ">
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="text-warning">
											<BsHouseFill />
										</i>
									</div>
								</div>
								<div className="col-7 d-flex align-items-center">
									<div className="numbers">
										<p className="card-category">liste</p>
										<h4 className="card-title">Bureaux</h4>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export function AccessProcedures() {
	return (
		<>
			<div className="col-md-4">
				<div className="card card-stats">
					<Link to="/procedure">
						<div className="card-body ">
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="text-warning">
											<BsReceiptCutoff />
										</i>
									</div>
								</div>
								<div className="col-7 d-flex align-items-center">
									<div className="numbers">
										<p className="card-category">liste</p>
										<h4 className="card-title">Procédures</h4>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export function NouvelleDemande() {
	return (
		<>
			<div className="col-md-4">
				<div className="card card-stats card-primary">
					<Link to="/nouvelleDemande">
						<div className="card-body ">
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center">
										<i>
											<BsFolderPlus />
										</i>
									</div>
								</div>
								<div className="col-7 d-flex align-items-center">
									<div className="numbers">
										<p className="card-category">Nouvelle</p>
										<h4 className="card-title">Demande</h4>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export function AccessAccueil() {
	return (
		<>
			<div className="col-md-4">
				<div className="card card-stats">
					<Link to="/accueil">
						<div className="card-body ">
							<div className="row">
								<div className="col-5">
									<div className="icon-big text-center icon-warning">
										<i className="la la-pie-chart text-warning"></i>
									</div>
								</div>
								<div className="col-7 d-flex align-items-center">
									<div className="numbers">
										<p className="card-category"></p>
										<h4 className="card-title">Accueil</h4>
									</div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}

export function LogoAppE_TK() {
	return (
		<>
			<div className="col-md-3">
				<Link to="/accueil/">
					<div>
						<img
							src={process.env.PUBLIC_URL + `/picture/logo/e-T.png`}
							alt="pdp"
							style={{
								width: "100%",
								height: "100%",
								borderRadius: "0%",
							}}
						/>
					</div>
				</Link>
			</div>
		</>
	);
}

export function AccessDrapeauFanjakanaImage() {
	return (
		<>
			<img
				src={process.env.PUBLIC_URL + `/picture/logo/fanjakana.jpg`}
				alt="pdp"
				style={{
					width: "100%",
					height: "100%",
					borderRadius: "0%",
				}}
			/>
		</>
	);
}

export function AccessLogoE_TokotanyImage() {
	return (
		<>
			<img
				src={process.env.PUBLIC_URL + `/picture/logo/e-TK.png`}
				alt="pdp"
				style={{
					width: "100%",
					height: "100%",
					borderRadius: "0%",
				}}
			/>
		</>
	);
}