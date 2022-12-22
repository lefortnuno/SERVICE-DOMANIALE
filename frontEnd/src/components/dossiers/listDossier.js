import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";
import { libraryList, AjoutLibrary } from "../../api/file.js";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsEye, BsPencilSquare, BsTrash } from "react-icons/bs";
import Context from "../../contexts/Context";
import { AccessProcedures } from "../access/accessAll";

const base = `dossier`;
const URL_DE_BASE = base + `/`;

export default function ListDossier() {
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
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region   //----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(false);
  function rechercheUtilisateur(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(false);
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
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header ">
              <h4 className="card-title">liste des {base}s</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive text-nowrap">
                <table className="table table-striped w-auto">
                  <thead>
                    <tr>
                      <th scope="col">Numéro d'affaire</th>
                      <th scope="col">Nature </th>
                      <th scope="col">Affectation</th>
                      <th scope="col">Requerant</th>
                      <th scope="col">+Details</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contenuTab || users.length !== 0 ? (
                      currentItems.map((user, key) => (
                        <tr key={key}>
                          <th scope="row">{user.numeroAffaire} </th>
                          <td>
                            {user.dependance === 1 ? (
                              <>Dependant</>
                            ) : (
                              <>Non dependant</>
                            )}
                          </td>
                          <td>
                            {user.natureAffectation === 1 ? (
                              <>Affecté</>
                            ) : (
                              <>Non affecté</>
                            )}
                          </td>
                          <td>
                            {user.p_numeroRequerant} - {user.nom}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm m-1 waves-effect"
                              variant="default"
                              name="numCompteEdit"
                              onClick={() => showEditModal(user.numeroDossier)}
                            >
                              <BsEye />
                            </button>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm m-1 waves-effect"
                              variant="default"
                              name="numCompteEdit"
                              onClick={() => showEditModal(user.numeroDossier)}
                            >
                              <BsPencilSquare />
                            </button>

                            {u_info.u_attribut === "Chef" ||
                            u_info.u_attribut === "Administrateur" ? (
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm m-1 waves-effect"
                                variant="default"
                                name="numCompteEdit"
                                onClick={() =>
                                  showEditModal(user.numeroDossier)
                                }
                              >
                                <BsTrash />
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-danger text-center">
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
                        currentPage == pages[pages.length - 1] ? true : false
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

        <div className="col-md-4">
          <div className="card">
            <div className="card-header ">
              <h4 className="card-title">liste des {base}s</h4>
            </div>
            <div className="card-body">
              {contenuTab || users.length !== 0 ? (
                currentItems.map((dossier, index) => (
                  <>
                    <div className="col-md-12" key={index}>
                      <div
                        className={
                          dossier.p_numeroProcedure < 4
                            ? "card card-stats card-warning"
                            : "card card-stats card-primary"
                        }
                      >
                        <Link to="/nouvelleDemande">
                          <div className="card-body ">
                            <div className="row">
                              <div className="col-5">
                                <div className="icon-big text-center">
                                  <i
                                    className={
                                      dossier.p_numeroProcedure < 4
                                        ? "la la-check-circle"
                                        : "la la-check-circle"
                                    }
                                  ></i>
                                </div>
                              </div>
                              <div className="col-7 d-flex align-items-center">
                                <div className="numbers">
                                  <p className="card-category">
                                    {dossier.numeroAffaire}
                                  </p>
                                  <h4 className="card-title">{dossier.nom}</h4>
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
                  <div className="col-md-12">
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
                              <p className="card-category">Aucune</p>
                              <h4 className="card-title">Dossier</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
                        currentPage == pages[pages.length - 1] ? true : false
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

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Users Statistics</h4>
              <p className="card-category">Users statistics this month</p>
            </div>
            <div className="card-body">
              <div id="monthlyChart" className="chart chart-pie"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
