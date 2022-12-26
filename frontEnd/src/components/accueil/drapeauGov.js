import { Link } from "react-router-dom";

export function DrapeauFanjakana() {
  return (
    <>
      <div className="col-md-3">
        <Link to="/accueil/">
          <div className="card card-stats card-info">
            <img
              src={process.env.PUBLIC_URL + `/picture/logo/fanjakana.jpg`}
              alt="pdp"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0%",
              }}
            />
          </div>
        </Link>
      </div>
    </>
  );
}
