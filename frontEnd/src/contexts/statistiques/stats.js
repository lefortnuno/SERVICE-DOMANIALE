import axios from "../../api/axios";
import React from "react";
import { useEffect, useState } from "react";
import { AjoutLibrary, libraryList } from "../../api/file.js";

import HeaderContext from "../header/header.context"; 
import SidebarContext from "../sidebar/sidebar.context";
import FooterContext from "../footer/footer.context";

import { BsHouseFill } from "react-icons/bs";

import Chart from "../Chart";
const URL_DE_BASE = `procedure_cin/stats/`;

export default function Statisique() {
  const [data, setData] = useState([]);

  //#region // DONNEE
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await axios.get(URL_DE_BASE).then(function (response) {
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
              <button onClick={statRefresh}>
                Actualiser les stats <BsHouseFill />
              </button>

              <Chart
                // labels={data.length == 0 ? ["pink"] : data[0].labels}
                // data1={
                //   data.length === 0
                //     ? [0, 0, 0, 0, 0, 0]
                //     : data[0].data[0].values
                // }
                // data2={
                //   data.length === 0
                //     ? [0, 0, 0, 0, 0, 0]
                //     : data[0].data[1].values
                // }
                // data3={
                //   data.length === 0
                //     ? [0, 0, 0, 0, 0, 0]
                //     : data[0].data[2].values
                // }
              />
            </div>
          </div>

          <FooterContext />
        </div>
      </div>
    </>
  );
}
