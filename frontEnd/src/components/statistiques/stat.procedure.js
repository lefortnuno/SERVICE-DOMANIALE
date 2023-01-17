import axios from "../../api/axios.js";
import getDataUtilisateur from "../../api/udata";
import React from "react";
import { useEffect, useState } from "react";

import ChartProcedure from "../../contexts/statistiques/Chart.Procedure.js";
const URL_DE_BASE = `stat/stats_temps_perdu_procedure/`;

export default function StatisiqueProcedure() {
  const u_info = getDataUtilisateur();
  const [data, setData] = useState([]);

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
  //#endregion

  return (
    <>

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Statistique des procédures</h4>
            <p className="card-category">Temps consommer par chaque procédure en nombre de jour</p>
          </div>
          <div className="card-body">
            <ChartProcedure
              labels={data.length == 0 ? ["pink"] : data[0].labels}
              data1={
                data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
