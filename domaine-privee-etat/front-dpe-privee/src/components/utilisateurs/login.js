import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../contexts/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const LOGIN_URL = `/utilisateur/seConnecter`;

export default function Login() {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = (data) => {
    axios
      .post(LOGIN_URL, data)
      .then(function (response) {
        if (response.data.success) {
          navigate("/utilisateur/");
          toast.success(`Connection Reussi`);
          const u = response.data.user[0];
          localStorage.setItem("u_numCompte", u.numCompte);
          localStorage.setItem("u_nom", u.nom);
          localStorage.setItem("u_prenom", u.prenom);
          localStorage.setItem("u_attribut", u.attribut);
          localStorage.setItem("u_etatCompte", u.etatCompte);
          localStorage.setItem("u_photoPDP", u.photoPDP);
          localStorage.setItem("token", response.data.token);
        } else {
          setErrMsg("Identification ou Mot de pass Incorrect ! ");
        }
      })
      .catch((error) => {
        setErrMsg(
          "Erreur de connection : ",
          error,
          " Veuillez vous connecter au serveur !"
        );
      });
  };

  //SCHEMA VALIDATION FORMULAIRE LOGIN / SE CONNECTER -----
  const validationSchema = Yup.object().shape({
    identification: Yup.string().required("Identification obligatoire"),
    mdp: Yup.string().required("Mot de passe obligatoire"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    defaultValues: {
      identification: "",
      mdp: "",
    },
    resolver: yupResolver(validationSchema),
  });

  function onClose() {
    reset();
  }

  const { errors } = formState;
  return (
    <>
      <Header />
      <div className="body_of_login">
        <div class="container_of_login">
          <div class="title">Se Connecter</div>
          <div class="content_of_login">
            <Form className="text-center border border-light p-5">
              <div className={!errMsg ? null : "alert alert-danger"}>
                {errMsg}
              </div>

              <div className="user-details">
                <Form.Group className="input-box">
                  <Form.Label className="details"> Identifiant : </Form.Label>
                  <Form.Control
                    type="text"
                    name="identification"
                    {...register("identification")}
                    placeholder="identification"
                    className="form-control"
                    autoFocus
                    autoComplete="off"
                    required
                  />
                  <small className="text-danger d-block">
                    {errors.identification?.message}
                  </small>
                </Form.Group>
                  <Form.Group className="input-box">
                    <Form.Label className="details"> Mot de pass :</Form.Label>
                    <Form.Control
                      type="password"
                      name="mdp"
                      {...register("mdp")}
                      placeholder="mot de pass"
                      className="form-control"
                      autoComplete="off"
                      required
                    />
                    <small className="text-danger d-block">
                      {errors.mdp?.message}
                    </small>
                  </Form.Group>
              </div>

              <div className="button">
                <Button variant="danger" onClick={onClose}>
                  Annuler
                </Button>
                <span> </span>
                <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                  Se Connecter
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
