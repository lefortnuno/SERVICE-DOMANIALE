import axios from "../../../api/axios";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsEye,
  BsShift,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Header from "../../../contexts/Header";
import ModalAjout from "./ModalAjout";
import ModalEdition from "./ModalEdit";
import DeleteConfirmation from "../../../contexts/ModalSuppr";

const URL_BASE = `historique/C_I/`;

//#region

//#endregion

export default function C_I() {
  const navigate = useNavigate();
  const u_info = {
    u_token: localStorage.token,
    u_nom: localStorage.u_nom,
    u_prenom: localStorage.u_prenom,
    u_attribut: localStorage.u_attribut,
    u_photoPDP: localStorage.u_photoPDP,
    u_numCompte: localStorage.u_numCompte,
    u_etatCompte: localStorage.u_etatCompte,
  };

  //#region //------------DONNEE C_I------------
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
    axios.get(URL_BASE, opts).then(function (response) {
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.warning("Vous n'êtes pas autorisé à accéder à cette page!");
      }
    });
  }
  //#endregion

  //#region //------------ MODAL AJOUT C_I------------
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

  //#region //------------MODAL EDIT C_I------------
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

  //#region //------------MODAL DELETE C_I------------
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage(
      `Etes vous sûre de vouloir supprimer l'C_I : _' ${
        users.find((x) => x.idDossier === id).numAffaire
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
    axios.delete(URL_BASE + `${id}`, opts).then(function (response) {
      getUsers();
      toast.success(`Suppression Réussi`);
      setDisplayConfirmationModal(false);
    });
  };
  //#endregion

  //#region   //----- MA RECHERCHE -----
  const [contenuTab, setContenuTab] = useState(true);
  function rechercheDossier(event) {
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
      axios.get(URL_BASE + `recherche/${valeur}`, opts).then((response) => {
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
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
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
      <div>
        <Header />

        <ModalAjout show={show} onHide={closeAddModal}>
          {numCompteAjout}
        </ModalAjout>

        <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
          {numCompteEdit}
        </ModalEdition>

        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          id={id}
          message={deleteMessage}
        />

        <div>
          <h2> Cahier de Depart </h2>
          <span> </span>
          <label>
            <input
              type="text"
              name="cin"
              className="form-control form-control-sm"
              onClick={retourALaPremierPage}
              onChange={rechercheDossier}
              placeholder="rechercher dans un cahier de depart ...."
              autoComplete="off"
            />
          </label>
        </div>

        {/* // ----- TABLEAU LISTE DossierS -----  */}
        <div className="table-responsive text-nowrap">
          <table className="table table-striped w-auto">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Réf</th>
                <th scope="col">Numéro Affaire</th>
                <th scope="col">Requerant</th>
                <th scope="col">Date du Mouvement</th>
                <th scope="col">Date Rendez-vous</th>
                <th scope="col">Phase du dossier</th>
                <th scope="col">Observation</th>
                <th scope="col">Agent</th>
                <th scope="col"> Actions </th>
              </tr>
            </thead>
            <tbody>
              {contenuTab ? (
                currentItems.map((user, key) => (
                  <tr key={key}>
                    <th>
                      {user.accomplissement ? null : (
                        <Button
                          type="button"
                          className="btn btn-outline-primary btn-sm m-1 waves-effect"
                          variant="default"
                          name="numCompteEdit"
                          onClick={() => showAddModal(user.numHisto)}
                        >
                          <BsShift />
                        </Button>
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
                    <td>
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

                      <Button
                        type="button"
                        className="btn btn-outline-danger btn-sm m-1 waves-effect"
                        variant="default"
                        onClick={() => showDeleteModal(user.numHisto)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </td>
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
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                onClick={handleNextbtn}
              >
                Suivant
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
