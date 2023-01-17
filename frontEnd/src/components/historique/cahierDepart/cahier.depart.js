import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";
import { AjoutLibrary, libraryList } from "../../../api/file.js";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import HeaderContext from "../../../contexts/header/header.context";
import SidebarContext from "../../../contexts/sidebar/sidebar.context";
import FooterContext from "../../../contexts/footer/footer.context";
import ModalAjout from "../ModalAjout";
import ModalRetour from "../ModalRetour";

import {
  AccessCahierArriver,
  AccessCahierInterne,
  AccessCahierRDV,
  AccessCahierND,
} from "../../access/accessCahier";

import { BsArrowDownUp, BsCapslockFill } from "react-icons/bs";

const base = `Cahier de départ`;
const URL_DE_BASE = `historique/C_D/`;

export default function CahierDepart() {
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  //#region //------------DONNEE C_ ------------
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get(URL_DE_BASE, u_info.opts).then(function (response) {
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region //------------ MODAL AJOUT C_ ------------
  const [numCompteAjout, setNumCompteAjout] = useState("");
  const [show, setShow] = useState(false);
  const showAddModal = (numCompte) => {
    setNumCompteAjout(numCompte);
    setShow(true);
  };
  const closeAddModal = () => {
    getUsers();
    setShow(false);
  };
  //#endregion

  //#region //------------ MODAL RETOUR C_ ------------
  const [numRetour, setNumRetour] = useState("");
  const [showRetour, setShowRetour] = useState(false);
  const showReturnModal = (num) => {
    setNumRetour(num);
    setShowRetour(true);
  };
  const closeReturnModal = () => {
    getUsers();
    setShowRetour(false);
  };
  //#endregion

  //#region   //----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(false);
  function rechercheDossier(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      axios
        .get(URL_DE_BASE + `recherche/${valeur}`, u_info.opts)
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
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  return (
    <>
      {libraryList.forEach((x) => AjoutLibrary(x))}
      <div className="wrapper">
        <ModalAjout show={show} onHide={closeAddModal}>
          {numCompteAjout}
        </ModalAjout>

        <ModalRetour show={showRetour} onHide={closeReturnModal}>
          {numRetour}
        </ModalRetour>

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
                onChange={rechercheDossier}
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
                <AccessCahierArriver />
                <AccessCahierND />
                <AccessCahierInterne />
                <AccessCahierRDV />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">{base}</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive text-nowrap">
                        <table className="table table-striped w-auto">
                          <thead>
                            <tr>
                              <th scope="col">Réf</th>
                              <th scope="col">Numéro_d'affaire</th>
                              <th scope="col">Requérant</th>
                              <th scope="col">Date_de_départ</th>
                              <th scope="col">Date_rendez-vous</th>
                              <th scope="col">Procédure</th>
                              <th scope="col">Destinataire</th>
                              <th scope="col">Observation</th>
                              <th scope="col">Agent</th>
                              <th scope="col"> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab || users.length !== 0 ? (
                              currentItems.map((user, key) => (
                                <tr key={key}>
                                  <th scope="row">{user.numeroHisto} </th>
                                  <td>{user.h_numeroAffaire}</td>
                                  <td>
                                    {user.nom} {user.prenom}
                                  </td>
                                  <td>{user.dateDepotSD}</td>
                                  <td>{user.dateRDV}</td>
                                  <td>{user.nomProcedure}</td>
                                  <td>{user.nomBureau}</td>
                                  <td>{user.observationSD}</td>
                                  <td>{user.identification}</td>
                                  <td>
                                    {/* {user.accomplissement ? null : (
                                      <p
                                        type="button"
                                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                                        variant="default"
                                        name="numCompteEdit"
                                        onClick={() =>
                                          showAddModal(user.numeroHisto)
                                        }
                                      >
                                        <BsCapslockFill />
                                      </p>
                                    )} */}

                                    {!user.accomplissement &&
                                    user.h_numeroProcedure === 3 ? (
                                      <p
                                        type="button"
                                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                                        variant="default"
                                        name="numCompteEdit"
                                        onClick={() =>
                                          showAddModal(user.numeroHisto)
                                        }
                                        style={{ transform: "rotate(180deg)" }}
                                      >
                                        <BsArrowDownUp /> 
                                      </p>
                                    ) : null}

                                    {!user.accomplissement &&
                                    (user.h_numeroProcedure === 4 || user.h_numeroProcedure === 6 || user.h_numeroProcedure === 10) ? (
                                      <p
                                        type="button"
                                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                                        variant="default"
                                        name="numCompteEdit"
                                        onClick={() =>
                                          showReturnModal(user.numeroHisto)
                                        }
                                        style={{ transform: "rotate(180deg)" }}
                                      >
                                        <BsCapslockFill />
                                      </p>
                                    ) : null}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={10}
                                  className="text-danger text-center"
                                >
                                  La liste est vide ....
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
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
