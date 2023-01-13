import axios from "../../api/axios.js";
import getDataUtilisateur from "../../api/udata";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import ChartProcedure from "../../contexts/statistiques/Chart.Procedure.js";
const URL_DE_BASE = `stat/stats_temps_perdu_dossier_procedure/`;

export default function StatisiqueProcedureUneDossier(props) {
	const u_info = getDataUtilisateur();
	const [data, setData] = useState([]);
	const { numeroDossier } = useParams();

	//#region // DONNEE
	useEffect(() => {
		getOneUser();
	}, []);

	function getOneUser() {
		axios
			.get(URL_DE_BASE + `${numeroDossier}`, u_info.opts)
			.then(function (response) {
				setData(response.data);
				console.log("ddddddddddddd", response.data);
			});
	}
	//#endregion

	return (
		<>
			<ChartProcedure
				labels={data.length == 0 ? ["pink"] : data[0].labels}
				data1={data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values}
			/>
		</>
	);
}
