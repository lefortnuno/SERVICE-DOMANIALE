import getDataUtilisateur from "../../api/udata";

export default function ProfilSidebar() {
  const u_info = getDataUtilisateur();
  return (
    <>
      <div className="user">
        <div className="photo">
          <img
            src={process.env.PUBLIC_URL + `/picture/pdp/${u_info.u_photoPDP}`}
            alt="pdp"
          />
        </div>
        <div className="info">
          <a
            className=""
            data-toggle="collapse"
            href="#collapseExample"
            aria-expanded="true"
          >
            <span>
              {u_info.u_identification}
              <span className="user-level">{u_info.u_attribut}</span>
              {/* <span className="caret"></span> */}
            </span>
          </a>
          <div className="clearfix"></div>

          {/* Help from lafatra on transforming this code to JAVASCRIPT code */}
          {/* <div
            className="collapse in"
            id="collapseExample"
            aria-expanded="true"
            // style={{''}}
          >
            <ul className="nav">
              <li>
                <a href="#profile">
                  <span className="link-collapse">My Profile</span>
                </a>
              </li>
              <li>
                <a href="#edit">
                  <span className="link-collapse">Edit Profile</span>
                </a>
              </li>
              <li>
                <a href="#settings">
                  <span className="link-collapse">Settings</span>
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}
