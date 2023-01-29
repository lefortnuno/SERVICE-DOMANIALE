import getDataUtilisateur from "../../api/udata";
import { BsFilterLeft } from "react-icons/bs";

export default function LogoHeader() {
	const u_info = getDataUtilisateur();
	return (
		<>
			<div className="logo-header">
				<p className="logo">
					<img
						src={process.env.PUBLIC_URL + `/picture/logo/e-TK.png`}
						alt="pdp"
						style={{ width: "auto", height: "100%", borderRadius: "0%" }}
					/>
					{/* e -Tokotany */}
				</p>

				{u_info.u_token ? (
					<>
						<button
							className="navbar-toggler sidenav-toggler ml-auto "
							type="button"
							data-toggle="collapse"
							data-target="collapse"
							aria-controls="sidebar"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon ">
								{/* <BsFilterLeft /> */}
							</span>
						</button>
						<button className="topbar-toggler more monToggleoption">
							<i className="la la-ellipsis-v"></i>
						</button>
					</>
				) : null}
			</div>
		</>
	);
}
