import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { libraryList, AjoutLibrary } from "../../api/file.js";

import HeaderContext from "../../contexts/header/header.context";
import FooterContext from "../../contexts/footer/footer.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import GoogleMapsPartiel from "../../maps/gMaps";
import ModalAjout from "../historique/ModalAjout";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BsCapslockFill } from "react-icons/bs";

const base = `dossier`;
const URL_DE_BASE = base + `/`;

export default function DetailsDossier() {
  const navigate = useNavigate();
  const { numeroDossier } = useParams();
  const u_info = getDataUtilisateur();

  //#region // RECUPERER LES DONNEER DU DOSSIER
  const [users, setUsers] = useState([]);
  const [histo, setHisto] = useState([]);

  useEffect(() => {
    getOneUser();
  }, []);

  function getOneUser() {
    axios
      .get(URL_DE_BASE + `${numeroDossier}`, u_info.opts)
      .then(function (response) {
        console.log("response : ", response.data[0]);
        if (response.status === 200) {
          setUsers(response.data[0]);
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
    getOneUser();
    setShow(false);
  };
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
  const nbrPage = Math.ceil(histo.length / itemsPerPage);
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = histo.slice(indexOfFirstItem, indexOfLastItem);

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
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">INFO REQUERANT</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="mapcontainer">
                          <div className="map">
                            <p> Numéro de CIN : </p>
                            <h6> {users.cin} </h6> <br />
                            <p> Nom : </p>
                            <h6> {users.nom} </h6> <br />
                            <p> Prenom : </p>
                            <h6> {users.prenom} </h6> <br />
                            <p> Numéro de téléphone : </p>
                            <h6> {users.numeroTelephone} </h6> <br />
                            <p> Etat Morale : </p>
                            <h6>
                              {users.etatMorale === 1
                                ? "Personne Morale"
                                : "Individu Normale"}
                            </h6>
                            <br />
                            <p> Requerant Numéro : </p>
                            <h6> {users.p_numeroRequerant} </h6> <br />
                            <span>
                              Et le reste de ses information a afficher ici plus
                              tard
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">INFORMATION DU DOSSIER</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="row">
                          <div className="col-md-8">
                            <p> numero d'affaire : </p>
                            <h6> {users.numeroAffaire} </h6> <br />
                            <p> Dependance : </p>
                            <h6>
                              {users.dependance === 1
                                ? "Dependant"
                                : "Non dependant"}
                            </h6>
                            <br />
                            <span>
                              Et le reste de ses information a afficher ici plus
                              tard
                            </span>
                          </div>

                          <div className="col-md-4">
                            <p> stats temps perdu </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Historique Complet </h4>
                      <p className="card-category">
                        information complementaire
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8">
                          <p> histo complet dossier </p>

                          <div className="table-responsive text-nowrap">
                            <table className="table table-striped w-auto">
                              <thead>
                                <tr>
                                  <th scope="col">Réf</th>
                                  <th scope="col">Numéro Affaire</th>
                                  <th scope="col">Requerant</th>
                                  <th scope="col">Date du Mouvement</th>
                                  <th scope="col">Date Rendez-vous</th>
                                  <th scope="col">Phase du dossier</th>
                                  <th scope="col">Observation</th>
                                  <th scope="col">Agent</th>
                                  <th scope="col"> </th>
                                  {/* <th scope="col"> Actions </th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {histo.length !== 0 ? (
                                  //   currentItems.map((user, key) => (
                                  //     <tr key={key}>
                                  //       <th scope="row">{user.numeroHisto} </th>
                                  //       <td>{user.h_numeroAffaire}</td>
                                  //       <td>
                                  //         {user.nom} {user.prenom}
                                  //       </td>
                                  //       <td>{user.dateDepotSD}</td>
                                  //       <td>{user.dateRDV}</td>
                                  //       <td>{user.nomProcedure}</td>
                                  //       <td>{user.observationSD}</td>
                                  //       <td>{user.identification}</td>
                                  //       <td>
                                  //         {user.accomplissement ? null : (
                                  //           <p
                                  //             className="btn btn-outline-success btn-sm m-1 waves-effect"
                                  //             name="numCompteEdit"
                                  //             onClick={() =>
                                  //               showAddModal(user.numeroHisto)
                                  //             }
                                  //           >
                                  //             <BsCapslockFill />
                                  //           </p>
                                  //         )}
                                  //       </td>
                                  //     </tr>
                                  //   ))
                                  <tr>
                                    <td
                                      colSpan={10}
                                      className="text-danger text-center"
                                    >
                                      La liste n'est vide ....
                                    </td>
                                  </tr>
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
                        <div className="col-md-4">
                          <p> google maps du terrain</p>
                          <GoogleMapsPartiel />
                        </div>
                      </div>
                    </div>
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
