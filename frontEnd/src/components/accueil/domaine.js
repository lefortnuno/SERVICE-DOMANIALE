import { Link } from "react-router-dom";


export default function Domaine() {
  return (
    <>
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Circonscription Domaniale et Foncier de Fianarantsoa</h4>
            <p className="card-category">
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
              Map of the distribution of users around the world
            </p>
          </div>
          {/* <div className="card-body"> */}
          <img
            src={process.env.PUBLIC_URL + `/picture/Prefecture.jpg`}
            alt="pdp"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "0%",
            }}
          />
          {/* </div> */}
        </div>
      </div>
    </div>
    </>
  );
}
