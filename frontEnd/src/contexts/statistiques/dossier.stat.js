import axios from "../../api/axios";
import React from "react";
import { useEffect, useState } from "react";

import ChartDOSSIER from "./ChartDossier";

import { BsHouseFill } from "react-icons/bs";
const URL_DE_BASE = `stat/stats_sigle/`;

export function StatDossier() {
  const [data, setData] = useState([]);

  //#region // DONNEE
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await axios.get(URL_DE_BASE).then(function (response) {
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
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title"> Statistique pour Dossier</h4>
            <p className="card-category">Statistique Siegle Dossier par Mois</p>
          </div>
          <div className="card-body">
            <button onClick={statRefresh}>
              Actualiser les stats <BsHouseFill />
            </button>

            <ChartDOSSIER
            //   labels={data.length == 0 ? ["pink"] : data[0].labels}
            //   data1={
            //     data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values
            //   }
            //   data2={
            //     data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[1].values
            //   }
            //   data3={
            //     data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[2].values
            //   }
            />
          </div>
        </div>
      </div>
    </>
  );
}
