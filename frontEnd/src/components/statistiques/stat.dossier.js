import axios from "../../api/axios.js";
import getDataUtilisateur from "../../api/udata";
import React from "react";
import { useEffect, useState } from "react";
import { AjoutLibrary, libraryList } from "../../api/file.js";

import { BsArrowClockwise } from "react-icons/bs";

import ChartDossier from "../../contexts/statistiques/Chart.Dossier.Context.js";
const URL_DE_BASE = `stat/stats_sigle/`;

export default function StatisiqueDossier() {
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
      {/* {libraryList.forEach((x) => AjoutLibrary(x))} */}

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Statistique dossiers</h4> 
            <p className="card-category">Statistique des dossier par SIGLE. (Unité en jour)</p>
          </div>
          <div className="card-body">
            <ChartDossier
              labels={data.length == 0 ? ["pink"] : data[0].labels}
              data1={
                data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values
              }
              data2={
                data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[1].values
              }
              data3={
                data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[2].values
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
