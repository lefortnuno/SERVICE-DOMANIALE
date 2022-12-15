import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogOutProtection from "./contexts/protected/logout.protected";
import SinInProtected from "./contexts/protected/singin.protected";
import SeConnecter from "./components/login/SeConnecter";
import Utilisateur from "./components/utilisateurs/Utilisateur";
import Indiv from "./components/utilisateurs/Indi";
import CahierArriver from "./components/historique/cahierArriver/cahier.arriver";

export default function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LogOutProtection Cmp={SeConnecter} />} />
          <Route
            path="utilisateur/"
            element={<SinInProtected Cmp={Utilisateur} />}
          />
          <Route
            path="indiv/"
            element={<SinInProtected Cmp={Indiv} />}
          />
          <Route
            path="C_A/"
            element={<SinInProtected Cmp={CahierArriver} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
