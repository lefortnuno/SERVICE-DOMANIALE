import axios from "../../api/axios.js";
import getDataUtilisateur from "../../api/udata";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { AjoutLibrary, libraryList } from "../../api/file.js";

import HeaderContext from "../../contexts/header/header.context.js";
import SidebarContext from "../../contexts/sidebar/sidebar.context.js";
import FooterContext from "../../contexts/footer/footer.context.js";

import { BsArrowClockwise, BsPrinterFill } from "react-icons/bs";

import ChartGenerale from "../../contexts/statistiques/Chart.Context";
import StatisiqueDossier from "./stat.dossier.js";
import StatisiqueProcedure from "./stat.procedure.js";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";

const URL_DE_BASE = `stat/all_stats_procedure_month/`;

export default function StatisiqueGenerale() {
	const u_info = getDataUtilisateur();
	const [data, setData] = useState([]);

	//#region // IMPRIMER UN DOC
	const compRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => compRef.current,
		documentTitle: "Decompte Prix du Terrain",
		onAfterPrint: () => toast.success("Impression du document Reussi"),
	});
	//#endregion

	//#region // DONNEE
	useEffect(() => {
		getUsers();
	}, []);

	const getUsers = async () => {
		const result = await axios
			.get(URL_DE_BASE, u_info.opts)
			.then(function (response) {
				console.log(response.data);
				setData(response.data);
			});
	};

	const statRefresh = async () => {
		getUsers();
	};

	//#endregion

	return (
		<>
			{libraryList.forEach((x) => AjoutLibrary(x))}

			<div className="wrapper">
				<HeaderContext>
					<form className="navbar-left navbar-form nav-search mr-md-3">
						<div className="input-group">
							<input
								type="text"
								name="searchValue"
								placeholder="Rechercher ...."
								className="form-control"
								autoComplete="off"
							/>
							<div className="input-group-append">
								<span className="input-group-text">
									<i className="la la-search search-icon"></i>
								</span>
							</div>
						</div>
					</form>
				</HeaderContext>
				<SidebarContext />

				<div className="main-panel">
					<div className="content">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-12">
									<div className="card">
										<div className="card-header">
											<h4 className="card-title">
												Statistique générale{" "}
												<BsPrinterFill
													style={{ cursor: "pointer" }}
													onClick={handlePrint}
													className="text-success"
												/>
												{/* <button onClick={statRefresh}>
                          {" "}
                          <BsArrowClockwise />
                        </button> */}
											</h4>
											<p className="card-category">
												Statistique de consommation de temps par procédure et
												par mois (Unité en jour)
											</p>
										</div>

										<div className="card-body" ref={compRef}>
											<ChartGenerale
												labels={data.length == 0 ? ["pink"] : data[0].labels}
												data1={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[0].values
												}
												data2={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[1].values
												}
												data3={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[2].values
												}
												data4={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[3].values
												}
												data5={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[4].values
												}
												data6={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[5].values
												}
												data7={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[6].values
												}
												data8={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[7].values
												}
												data9={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[8].values
												}
												data10={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[9].values
												}
												data11={
													data.length === 0
														? [0, 0, 0, 0, 0, 0]
														: data[0].data[10].values
												}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Users Statistics</h4>
                      <p className="card-category">
                        Users statistics this month
                      </p>
                    </div>
                    <div className="card-body">
                      <div id="monthlyChart" className="chart chart-pie"></div>
                    </div>
                  </div>
                </div>

                <div className="col-md-8">
                  <StatisiqueProcedure />
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <StatisiqueDossier />
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Users Statistics</h4>
                      <p className="card-category">
                        Users statistics this month
                      </p>
                    </div>
                    <div className="card-body">
                      <div id="monthlyChart" className="chart chart-pie"></div>
                    </div>
                  </div>
                </div>
              </div> */}
						</div>
					</div>

					<FooterContext />
				</div>
			</div>
		</>
	);
}
