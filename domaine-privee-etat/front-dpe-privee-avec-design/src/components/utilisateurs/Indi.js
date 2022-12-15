import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { Link } from "react-router-dom";

import Context from "../../contexts/Context";


// Create the function
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement("script");
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
}

const tab = [
  "/assets/js/core/jquery.3.2.1.min.js",
  "/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js",
  "/assets/js/core/popper.min.js",
  "/assets/js/core/bootstrap.min.js",
  "/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
  "/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js",
  "/assets/js/plugin/jquery-mapael/jquery.mapael.min.js",
  "/assets/js/plugin/jquery-mapael/maps/world_countries.min.js",
  "/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
  "/assets/js/ready.min.js",
  "/assets/js/demo.js",
  "/logins/vendor/select2/select2.min.js",
  "/logins/vendor/tilt/tilt.jquery.min.js",
  "/logins/js/main.js",
];

export default function Indiv() {
  const u_info = getDataUtilisateur();

  return (
    <>
      <Context>
        <div className="wrap-login100">
          <h1> {u_info.u_attribut} </h1>
          <Link to="utilisateur/" >
            user
          </Link>
        </div>
        
        {tab.forEach(x=>AddLibrary(x))}
      </Context>
    </>
  );
}
