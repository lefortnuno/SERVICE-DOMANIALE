import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { libraryList, AjoutLibrary } from "../../api/file.js";

import HeaderContext from "../../contexts/header/header.context";
import FooterContext from "../../contexts/footer/footer.context";
import SidebarContext from "../../contexts/sidebar/sidebar.context";
import GoogleMapsPartiel from "../../maps/gMaps";
import ModalAjout from "../historique/ModalAjout";

import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BsCapslockFill, BsPrinterFill } from "react-icons/bs";

const base = `dossier`;
const URL_DE_BASE = base + `/`;
const URL_HISTO = `historique/`;
const URL_SOUS_DOSSIER = `sousDossier/`;
const URL_IM_TERRAIN = `terrain/`;

export default function DetailsDossier() {
  const navigate = useNavigate();
  const { numeroDossier } = useParams();
  const u_info = getDataUtilisateur();
  const mesInputsDecompte = {
    prixTerrain: "",
  };
  const mesInputsTerrain = {
    prixTerrain: "",
  };

  //#region // RECUPERER LES DONNEER DU DOSSIER

  const compRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => compRef.current,
    documentTitle: "Decompte Prix du Terrain",
    onAfterPrint: () => toast.success("Impression du document Reussi"),
  });

  //#endregion

  //#region // RECUPERER LES DONNEER DU DOSSIER
  const [users, setUsers] = useState([]);
  const [histo, setHisto] = useState([]);
  const [inputsDecompte, setInputsDecompte] = useState(mesInputsDecompte);
  const [inputsTerrain, setInputsTerrain] = useState(mesInputsTerrain);

  useEffect(() => {
    getOneUser();
    getHistoDossier();
  }, []);

  function getOneUser() {
    axios
      .get(URL_DE_BASE + `${numeroDossier}`, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          const u = response.data[0];
          setUsers(u);
          console.log(u);

          if (u.p_numeroProcedure >= 9) {
            getDecompte(u.numeroDossier);
          }
          if (u.p_numeroProcedure >= 9) {
            getTerrain(u.cin, u.p_numeroRequerant, u.numeroDossier);
          }
        } else {
          toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
        }
      });
  }

  function getHistoDossier() {
    axios
      .get(URL_HISTO + `histoDossier/` + `${numeroDossier}`, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          setHisto(response.data);
        } else {
          toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
        }
      });
  }
  //#endregion

  //#region // RECUPERER LE TERRAIN EN QUESTION
  function getTerrain(cin, numeroRequerant, numeroDossier) {
    const valeur_de_recherche = {
      cin,
      numeroDossier,
      numeroRequerant,
    };
    console.log(valeur_de_recherche);
    axios
      .post(URL_IM_TERRAIN + `le_Terrain/`, valeur_de_recherche, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          console.log(" REPONSE RECHERCHE TERRAIN CORRSPD", response.data[0]);
          setInputsTerrain(response.data[0]);
        }
      });
  }
  //#endregion

  //#region // RECUPERER LA DERNIERE SOUS DOSSIER
  function getDecompte(xxx) {
    axios
      .get(URL_SOUS_DOSSIER + `decompte/` + `${xxx}`, u_info.opts)
      .then(function (response) {
        if (response.status === 200) {
          const dataDecompte = response.data[0];
          let arrPrixT = dataDecompte.prixTerrain;

          // Arrondir la somme a payer de 02 dezaine d'unite
          let arr = arrPrixT.split(".");
          let str = "";

          arr.forEach((e) => {
            str = str + e;
          });
          str = str / 100;
          str = Math.round(str);
          str = str * 100;
          str = new Intl.NumberFormat("de-DE").format(str);

          const inputsDecompteComplet = Object.assign(dataDecompte, {
            prixTerrainAroundi: str,
          });

          setInputsDecompte(inputsDecompteComplet);
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
    getHistoDossier();
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
                      <h4 className="card-title">
                        INFO REQUERANT N°{users.p_numeroRequerant}
                      </h4>
                    </div>
                    <div className="card-body">
                      <div class="form-row">
                        <div className="form-group">
                          <label> Numéro de CIN : </label>
                          <span> {users.cin} </span>
                        </div>

                        <div className="form-group">
                          <label>Nom : </label>
                          <span> {users.nom} </span>
                        </div>

                        <div className="form-group">
                          <label>Prènom : </label>
                          <span> {users.prenom} </span>
                        </div>

                        <div className="form-group">
                          <label> Numéro de téléphone : </label>
                          <span> 0{users.numeroTelephone} </span>
                        </div>

                        <div className="form-group">
                          <label> Etat Morale : </label>
                          <span>
                            {" "}
                            {users.etatMorale === 1
                              ? "Personne Morale"
                              : "Individu Normale"}
                          </span>
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
                        <div className="col-md-7">
                          <div class="form-row">
                            <div className="form-group">
                              <label>
                                Demande d'
                                {users.natureAffectation === 1
                                  ? "Affectation"
                                  : "Acquisition"}{" "}
                                :{" "}
                              </label>
                              <span>
                                {" "}
                                {users.p_numeroProcedure === 11 ? (
                                  <span className="text-success">
                                    {" "}
                                    {users.natureAffectation === 1
                                      ? "AFFECTER"
                                      : "ACQUIS"}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    E{users.p_numeroProcedure} -{" "}
                                    {users.nomProcedure}
                                  </span>
                                )}
                              </span>
                            </div>

                            <div className="form-group">
                              <label> Numéro d'affaire : </label>
                              <span> {users.numeroAffaire} </span>
                            </div>

                            <div className="form-group">
                              <label>Dependance : </label>
                              <span>
                                {" "}
                                {users.dependance === 1
                                  ? "Dependant"
                                  : "Non dependant"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <p> google maps du terrain</p>
                          <GoogleMapsPartiel />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">HISTORIQUE COMPLET </h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive text-nowrap">
                        <table className="table table-striped w-auto">
                          <thead>
                            <tr>
                              <th scope="col">Réf</th>
                              <th scope="col">Phase du dossier</th>
                              <th scope="col">Date_de_Debut </th>
                              <th scope="col">Date_de_Fin </th>
                              <th scope="col">Bureau</th>
                              <th scope="col">Observation</th>
                              <th scope="col">Agent</th>
                              <th scope="col"> </th>
                              {/* <th scope="col"> Actions </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {histo.length !== 0 ? (
                              currentItems.map((user, key) => (
                                <tr key={key}>
                                  <th scope="row">{++key} </th>
                                  <td>{user.nomProcedure}</td>
                                  <td>{user.dateDebutMouvement}</td>
                                  <td> {user.dateFinMouvement}</td>
                                  <td>{user.nomBureau}</td>
                                  <td>{user.observation}</td>
                                  <td>{user.identification}</td>
                                  <td>
                                    {user.accomplissement ? null : (
                                      <p
                                        className="btn btn-outline-success btn-sm m-1 waves-effect"
                                        name="numCompteEdit"
                                        onClick={() =>
                                          showAddModal(user.numeroHisto)
                                        }
                                      >
                                        <BsCapslockFill />
                                      </p>
                                    )}
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

                        {nbrPage !== 1 &&
                        nbrPage !== 0 &&
                        users.length !== 0 ? (
                          <>
                            <ul className="pageNumbers">
                              <li>
                                <button
                                  disabled={
                                    currentPage == pages[0] ? true : false
                                  }
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

                {users.p_numeroProcedure >= 9 ? (
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header ">
                        <h4 className="card-title">
                          DECOMPTE PRIX{" "}
                          <BsPrinterFill
                            style={{ cursor: "pointer" }}
                            onClick={handlePrint}
                            className="text-success"
                          />
                        </h4>
                      </div>
                      <div className="card-body" ref={compRef}>
                        <div className="form-row">
                          <div className="form-group">
                            <label> " {inputsTerrain.nomPropriete} " : </label>
                            <span>
                              {" "}
                              TN ° {inputsTerrain.immatriculationTerrain}
                            </span>
                          </div>
                        </div>

                        <div className="form-row">
                          <label> I - PROVISION DOMANIALE </label>
                          <div className="form-group">
                            <label>
                              {" "}
                              PT : {inputsDecompte.prixAttribue} x{" "}
                              {inputsDecompte.mesureAttribuable} ={" "}
                            </label>
                            <span> {inputsDecompte.PT} </span>
                          </div>

                          <div className="form-group">
                            <label> FCD : 5% x PT = </label>
                            <span> {inputsDecompte.FCD} </span>
                          </div>

                          <div className="form-group">
                            <label> === </label>
                            <span> {inputsDecompte.PT_TTL} </span>
                          </div>
                        </div>

                        <div class="form-row">
                          <label> II - FRAIS de CONSERVATION </label>
                          <div className="form-group">
                            <label> DF : XXX</label>
                            <span> {inputsDecompte.DF} </span>
                          </div>

                          <div className="form-group">
                            <label> DP : </label>
                            <span> {inputsDecompte.DP} </span>
                          </div>

                          <div className="form-group">
                            <label> Acc : </label>
                            <span> {inputsDecompte.Acc} </span>
                          </div>

                          <div className="form-group">
                            <label> Bord : </label>
                            <span> {inputsDecompte.Bord} </span>
                          </div>

                          <div className="form-group">
                            <label> === </label>
                            <span> 75.000 </span>
                          </div>
                        </div>

                        <div class="form-row">
                          <label> III - TOTAL A PAYER </label>
                          <div className="form-group">
                            <label> TOTAL = </label>
                            <span> {inputsDecompte.prixTerrain} </span>
                          </div>
                          <div className="form-group">
                            <label> somme à payer : Ar </label>
                            <span> {inputsDecompte.prixTerrainAroundi},00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header ">
                      <h4 className="card-title">STATS du DOSSIER</h4>
                    </div>
                    <div className="card-body">
                      {/* STATISTIQUE DU DOSSIERS EN PERTE DE TEMPS */}
                    </div>
                  </div>
                </div>

                {users.p_numeroProcedure === 11 ? (
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">LIVRE DU TERRAIN </h4>
                      </div>
                      <div className="card-body">{/* LIVRE DU TERRAIN */}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <FooterContext />
        </div>
      </div>
    </>
  );
}
