import { Link } from "react-router-dom";

export function AccessBureau() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/bureau">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">liste</p>
                    <h4 className="card-title">Bureau</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export function AccessProcedures() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/procedure">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">liste</p>
                    <h4 className="card-title">Procedures</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export function NouvelleDemande() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats card-primary">
          <Link to="/nouvelleDemande">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="la la-check-circle"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Nouvelle</p>
                    <h4 className="card-title">Demande</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export function AccessAccueil() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/accueil">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category"></p>
                    <h4 className="card-title">Accueil</h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}