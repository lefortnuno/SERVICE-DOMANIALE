import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/accueil/");
  };

  return (
    <>
      <div className="wrapper_404">
        <div className="container_404">
          <div className="grid-row">
            <div className="colmun colmun-left">
              <img
                src={process.env.PUBLIC_URL + `/picture/pageNotFound/404 2.png`}
                alt="image-left"
              />
              <h1 className="px-spc-b-20">
                Nous ne trouvons la page que vous demandez.
              </h1>

              <button className="go-home btn button_404" onClick={goHome}>
                <i className="fa fa-home"></i> Retour à l'accueil
              </button>
            </div>
            <div className="colmun colmun-right">
              <img
                src={process.env.PUBLIC_URL + `/picture/pageNotFound/404 7.png`}
                alt="right-shape"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
