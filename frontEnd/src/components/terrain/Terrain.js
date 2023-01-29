import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { libraryList, AjoutLibrary } from "../../api/file.js";
import { AccessCahierND } from "../access/accessCahier";
import { NouvelleDemande } from "../access/accessAll";

import HeaderContext from "../../contexts/header/header.context";
import FooterContext from "../../contexts/footer/footer.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { BsEye, BsPencilSquare, BsTrash } from "react-icons/bs";

const base = `terrain`;
const URL_DE_BASE = base + `/`;

export default function Terrain() {
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  //#region //------------DONNEE UTILISATEUR------------
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
      if (response.status === 200) {
        setUsers(response.data);
        console.log(response.data);
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region   //----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(false);
  function rechercheElement(event) {
    const valeur = event.target.value;
    const valeurs = { value: valeur };

    if (!valeur) {
      getUsers();
      setContenuTab(false);
    } else {
      axios
        .post(URL_DE_BASE + `recherche/`, valeurs, u_info.opts)
        .then((response) => {
          if (response.data.success) {
            setUsers(response.data.res);
            setContenuTab(true);
          } else {
            setUsers(response.data.res);
            setContenuTab(false);
          }
        });
    }
  }
  //#endregion

  //#region  //----- MY PAGINATION -----
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  function retourALaPremierPage() {
    setcurrentPage(1);
    if (currentPage > 5) {
      setmaxPageNumberLimit(5);
      setminPageNumberLimit(0);
    }
  }

  const pages = [];
  const nbrPage = Math.ceil(users.length / itemsPerPage);
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if (currentPage - 2 < minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  //#endregion

  //#region //------------MODAL EDIT UTILISATEUR------------
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getUsers();
    setShowEdit(false);
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
                onClick={retourALaPremierPage}
                onChange={rechercheElement}
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
                    <div className="card-header ">
                      <h4 className="card-title">
                        Liste des {base}s Immatriculer, Titrer et Borner
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {contenuTab || users.length !== 0 ? (
                          currentItems.map((terrain, index) => (
                            <>
                              <div className="col-md-3" key={index}>
                                <div
                                  className={
                                    terrain.prixTerrain
                                      ? "card card-stats card-success"
                                      : "card card-stats card-info"
                                  }
                                >
                                  <Link
                                    to={`/viewTerrain/${terrain.numeroTitre}`}
                                  >
                                    <div className="card-body ">
                                      <div className="row">
                                        <div className="col-3">
                                          <div className="icon-big text-center">
                                            <i
                                              className={
                                                terrain.prixTerrain
                                                  ? "la la-check-circle"
                                                  : "la la-check-circle"
                                              }
                                            ></i>
                                          </div>
                                        </div>
                                        <div className="col-7 d-flex align-items-center">
                                          <div className="numbers">
                                            <p className="card-category">
                                              {terrain.immatriculationTerrain}
                                            </p>
                                            <h4 className="card-title">
                                              {terrain.nomPropriete}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </>
                          ))
                        ) : (
                          <>
                            <div className="col-md-4">
                              <div className="card card-stats card-danger">
                                <div className="card-body ">
                                  <div className="row">
                                    <div className="col-5">
                                      <div className="icon-big text-center">
                                        <i className="la la-times-circle-o text-danger"></i>
                                      </div>
                                    </div>
                                    <div className="col-7 d-flex align-items-center">
                                      <div className="numbers">
                                        <p className="card-category">Aucun</p>
                                        <h4 className="card-title">Terrain</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {nbrPage !== 1 && nbrPage !== 0 && users.length !== 0 ? (
                      <>
                        <ul className="pageNumbers">
                          <li>
                            <button
                              disabled={currentPage == pages[0] ? true : false}
                              onClick={handlePrevbtn}
                            >
                              Précédent
                            </button>
                          </li>
                          {renderPageNumbers}
                          <li>
                            <button
                              disabled={
                                currentPage == pages[pages.length - 1]
                                  ? true
                                  : false
                              }
                              onClick={handleNextbtn}
                            >
                              Suivant
                            </button>
                          </li>
                        </ul>
                        <br />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <FooterContext />
        </div>
      </div>
    </>
  );
}
