import { Link } from "react-router-dom";

export function PersoRequerant() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/requerant">
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
                    <h4 className="card-title">Requerant</h4>
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

export function PersoIndividu() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/individu">
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
                    <h4 className="card-title">Individu</h4>
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

export function PersoUtilisateur() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/utilisateur">
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
                    <h4 className="card-title">Utilisateur</h4>
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

export function NouveauPersoUtilisateur() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats card-primary">
          <Link to="/nouveauUtilisateur">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center">
                    <i className="la la-check-circle"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Nouveau</p>
                    <h4 className="card-title">Utilisateur</h4>
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

export function NouveauPersoIndividu() {
    return (
      <>
        <div className="col-md-4">
          <div className="card card-stats card-primary">
            <Link to="/nouveauIndividu">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center">
                      <i className="la la-check-circle"></i>
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category">Nouveau</p>
                      <h4 className="card-title">Individu</h4>
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

export function NouveauPersoRequerant() {
    return (
      <>
        <div className="col-md-4">
          <div className="card card-stats card-primary">
            <Link to="/nouveauRequerant">
              <div className="card-body ">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center">
                      <i className="la la-check-circle"></i>
                    </div>
                  </div>
                  <div className="col-7 d-flex align-items-center">
                    <div className="numbers">
                      <p className="card-category">Nouveau</p>
                      <h4 className="card-title">Requerant</h4>
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
  