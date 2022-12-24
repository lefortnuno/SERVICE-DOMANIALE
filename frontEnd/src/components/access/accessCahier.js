import { Link } from "react-router-dom";
export function AccessCahierArriver() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/C_A">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Cahier d'</p>
                    <h4 className="card-title">Arriver</h4>
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

export function AccessCahierDepart() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/C_D">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Cahier de</p>
                    <h4 className="card-title">Depart</h4>
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

export function AccessCahierInterne() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/C_I">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Cahier </p>
                    <h4 className="card-title">Interne</h4>
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

export function AccessCahierND() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/C_ND">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Cahier de</p>
                    <h4 className="card-title">N.D</h4>
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

export function AccessCahierRDV() {
  return (
    <>
      <div className="col-md-4">
        <div className="card card-stats">
          <Link to="/C_RDV">
            <div className="card-body ">
              <div className="row">
                <div className="col-5">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-7 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Cahier de</p>
                    <h4 className="card-title">R.D.V</h4>
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
