import { Link } from "react-router-dom";

export default function EnTete() {
  return (
    <>
      <div className="row">
        <div className="col-md-3">
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
        </div>

        {/* <div className="col-md-3">
          <div className="card card-stats">
            <div className="card-body">
              <p className="fw-bold mt-1">Actualiser Stat </p>
              <div className="row mb-2">
                <div className="col-2">
                  <div className="icon-big text-center icon-warning">
                    <i className="la la-pie-chart text-warning"></i>
                  </div>
                </div>
                <div className="col-10 d-flex align-items-center">
                  <div className="numbers">
                    <p className="card-category">Nombre personne </p>
                    <h4 className="card-title">150 p</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="progress-card">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Open Rate</span>
                  <span className="text-muted fw-bold"> 60%</span>
                </div>
                <div className="progress mb-2" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="60%"
                  ></div>
                </div>
              </div>
              <div className="progress-card">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Open Rate</span>
                  <span className="text-muted fw-bold"> 60%</span>
                </div>
                <div className="progress mb-2" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="60%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="progress-card">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Open Rate</span>
                  <span className="text-muted fw-bold"> 60%</span>
                </div>
                <div className="progress mb-2" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="60%"
                  ></div>
                </div>
              </div>
              <div className="progress-card">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Open Rate</span>
                  <span className="text-muted fw-bold"> 60%</span>
                </div>
                <div className="progress mb-2" style={{ height: "7px" }}>
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "60%" }}
                    aria-valuenow="60"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="60%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
