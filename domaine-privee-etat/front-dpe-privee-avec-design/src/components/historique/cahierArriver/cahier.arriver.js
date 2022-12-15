import axios from "../../../api/axios";
import getDataUtilisateur from "../../../api/udata";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Context from "../../../contexts/Context";

import { BsFillTrashFill, BsPencilSquare, BsEye, BsShift } from "react-icons/bs";

const BASE = `Cahier d'Arriver`;
const URL_DE_BASE = `historique/C_A/`;


// Create the function
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

const tab = [
  "/assets/js/core/jquery.3.2.1.min.js",
  "/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js",
  "/assets/js/core/popper.min.js",
  "/assets/js/core/bootstrap.min.js",
  "/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
  "/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js",
  "/assets/js/plugin/jquery-mapael/jquery.mapael.min.js",
  "/assets/js/plugin/jquery-mapael/maps/world_countries.min.js",
  "/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
  "/assets/js/ready.min.js",
  "/assets/js/demo.js",
  "/logins/vendor/select2/select2.min.js",
  "/logins/vendor/tilt/tilt.jquery.min.js",
  "/logins/js/main.js",
];

export default function CahierArriver() {
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  //#region //------------DONNEE UTILISATEUR------------
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.get(URL_DE_BASE, opts).then(function (response) {
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region //------------ MODAL AJOUT UTILISATEUR------------
  const [show, setShow] = useState(false);
  const showAddModal = () => setShow(true);
  const closeAddModal = () => {
    getUsers();
    setShow(false);
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

  //#region //------------MODAL DELETE UTILISATEUR------------
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(
      `Etes vous sûre de vouloir supprimer l'utilisateur : _' ${
        users.find((x) => x.numCompte === id).identification
      } '_ ?`
    );
    setDisplayConfirmationModal(true);
  };
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
  const submitDelete = (id) => {
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios.delete(URL_DE_BASE + `${id}`, opts).then(function (response) {
      getUsers();
      toast.success(`Suppression Réussi`);
      setDisplayConfirmationModal(false);

      if (id == u_info.u_numCompte) {
        localStorage.clear();
        navigate("/");
      }
    });
  };
  //#endregion

  //#region   //----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(true);
  function rechercheUtilisateur(event) {
    const valeur = event.target.value;
    if (!valeur) {
      getUsers();
      setContenuTab(true);
    } else {
      const opts = {
        headers: {
          Authorization: u_info.u_token,
        },
      };
      axios.get(URL_DE_BASE + `recherche/${valeur}`, opts).then((response) => {
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
      <Context>
        <h4 className="page-title">{BASE}</h4>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header ">
                <h4 className="card-title">{BASE}</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped w-auto">
                    <thead>
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col">Réf</th>
                        <th scope="col">Numéro Affaire</th>
                        <th scope="col">Requerant</th>
                        <th scope="col">Date du Mouvement</th>
                        <th scope="col">Date Rendez-vous</th>
                        <th scope="col">Phase du dossier</th>
                        <th scope="col">Observation</th>
                        <th scope="col">Agent</th>
                        {/* <th scope="col"> Actions </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {contenuTab ? (
                        currentItems.map((user, key) => (
                          <tr key={key}>
                            <th>
                              {user.accomplissement ? null : (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm m-1 waves-effect"
                                  variant="default"
                                  name="numCompteEdit"
                                  onClick={() => showAddModal(user.numHisto)}
                                >
                                  <BsShift />
                                </button>
                              )}
                            </th>
                            <th scope="row">{user.numHisto} </th>
                            <td>{user.numAffaire}</td>
                            <td>
                              {user.nom} {user.prenom}
                            </td>
                            <td>{user.dateDepot_S_D}</td>
                            <td>{user.dateRDV}</td>
                            <td>{user.nomProcedure}</td>
                            <td>{user.obseravation_S_D}</td>
                            <td>{user.identification}</td>
                            {/* <td>
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm m-1 waves-effect"
                                variant="default"
                                name="numCompteEdit"
                                onClick={() => showEditModal(user.numHisto)}
                              >
                                <BsEye />
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm m-1 waves-effect"
                                variant="default"
                                name="numCompteEdit"
                                onClick={() => showEditModal(user.numHisto)}
                              >
                                <BsPencilSquare />
                              </button>

                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm m-1 waves-effect"
                                variant="default"
                                onClick={() => showDeleteModal(user.numHisto)}
                              >
                                <BsFillTrashFill />
                              </button>
                            </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td></td>
                          <td></td>
                          <td> La liste est vide .... </td>
                          <td></td>
                          <td></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {nbrPage !== 1 ? (
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
                  </ul>{" "}
                  <br />
                </>
              ) : null}
            </div>
          </div>
        </div>
        
        {tab.forEach(x=>AddLibrary(x))}
        {/* {AddLibrary(tab[0])}
        {AddLibrary(tab[1])}
        {AddLibrary(tab[2])}
        {AddLibrary(tab[3])}
        {AddLibrary(tab[4])}
        {AddLibrary(tab[5])}
        {AddLibrary(tab[6])}
        {AddLibrary(tab[7])}
        {AddLibrary(tab[8])}
        {AddLibrary(tab[9])}
        {AddLibrary(tab[10])}
        {AddLibrary(tab[11])}
        {AddLibrary(tab[12])}
        {AddLibrary(tab[13])} */}
      </Context>
    </>
  );
}
