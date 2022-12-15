import axios from "../../api/axios";
import getDataUtilisateur from "../../api/udata";

import { useNavigate } from "react-router-dom";

import Context from "../../contexts/Context";

export default function Utilisateur() {
  const navigate = useNavigate();
  const u_info = getDataUtilisateur();

  function onHangle() {
    navigate("/indiv");
  }
  return (
    <>
      <Context>
        <div className="wrap-login100">
            
        </div>
      </Context>
    </>
  );
}
