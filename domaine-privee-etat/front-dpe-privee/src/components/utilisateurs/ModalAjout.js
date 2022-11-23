import axios from "../../api/axios";
import * as Yup from "yup";

import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const URL_BASE = `/utilisateur/`;

export default function ModalAjout(props) {
  // IMAGE PHOTO DE PROFILE DES UTILISATEUR

  // INFO DU COMPTE UTILISATEUR
  const onSubmit = (data) => {
    axios.post(URL_BASE, data).then(function (response) {
      if (response.data.success) {
        toast.success(response.data.message);
        reset();
        props.onHide();
      } else {
        toast.error(response.data.message);
        // FONCTON DE REDIRECTION VERS LE FORMULAIRE AJOUT INDIVIDU
      }
    });
  };

  // SCHEMA VALIDATION FORMULAIRE -----
  const validationSchema = Yup.object().shape({
    identification: Yup.string()
      .required("identification obligatoire")
      .min(2, "trop court! Entrez au moins 2 caracteres"),
      cin: Yup.string()
        .required("Numéro CIN obligatoire")
        .min(12, "trop court! Entrez 12 chiffres")
        .max(12, "trop long! Entrez 12 chiffres"),
    mdp: Yup.string()
      .required("Mot de passe obligatoire")
      .min(4, "trop court! entrez au moins 4 caracteres"),
    confirmMdp: Yup.string()
      .required("Mot de passe de confirmation obligatoire")
      .oneOf(
        [Yup.ref("mdp"), null],
        "Le mot de passe de confirmation ne correspond pas au 1er mot de pass!"
      ),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      identification: "",
      cin: "",
      mdp: "",
      confirmMdp: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;

  function onClose() {
    props.onHide();
    reset();
  }

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.children}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Identification</Form.Label>
              <Form.Control
                type="text"
                name="identification"
                {...register("identification")}
                placeholder="identification"
                autoComplete="off"
                autoFocus
              />
              <small className="text-danger d-block">
                {errors.identification?.message}
              </small>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Numéro CIN</Form.Label>
              <Form.Control
                type="text"
                name="cin"
                {...register("cin")}
                placeholder="Numéro CIN"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {errors.cin?.message}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput12">
              <Form.Label>Mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="mdp"
                {...register("mdp")}
                placeholder="mot de pass"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {errors.mdp?.message}
              </small>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
              <Form.Label>confirmez votre mot de pass</Form.Label>
              <Form.Control
                type="password"
                name="confirmMdp"
                {...register("confirmMdp")}
                placeholder="confirmez votre mot de pass"
                autoComplete="off"
              />
              <small className="text-danger d-block">
                {errors.confirmMdp?.message}
              </small>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Enregistré
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
