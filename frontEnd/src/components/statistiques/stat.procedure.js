import axios from "../../api/axios.js";
import getDataUtilisateur from "../../api/udata";
import React from "react";
import { useEffect, useState } from "react";
import { AjoutLibrary, libraryList } from "../../api/file.js";

import { BsArrowClockwise } from "react-icons/bs";

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

  const statRefresh = async () => {
    getUsers();
  };

  //#endregion

  return (
    <>
      {/* {libraryList.forEach((x) => AjoutLibrary(x))} */}

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Statistique des Procedures</h4>
            {/* <button onClick={statRefresh}>
              {" "}
              <BsArrowClockwise />
            </button> */}
            <p className="card-category">Temps consommer par chaque procedure en nombre de jour</p>
          </div>
          <div className="card-body">
            {/* <ChartProcedure
              labels={data.length == 0 ? ["pink"] : data[0].labels}
              data1={
                data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values
              }
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
