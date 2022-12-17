import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LogOutProtection from "./contexts/protected/logout.protected";
import SinInProtected from "./contexts/protected/singin.protected";
import SeConnecter from "./components/login/SeConnecter";
import SEnregistrer from "./components/login/SEnregistrer";
import Utilisateur from "./components/personnes/utilisateurs/Utilisateur";
import Individu from "./components/personnes/individu/Individu";
import Requerant from "./components/personnes/requerant/Requerant";
import Accueil from "./components/accueil/accueil";
import Bureau from "./components/bureau/bureau";
import Procedure from "./components/procedures/procedure";
import Dossier from "./components/dossiers/Dossiers";
import NouveauCompteHorsConnection from "./components/personnes/utilisateurs/nouveauCompte";
import NouvelleDemande from "./components/dossiers/NouvelleDemande";

export default function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LogOutProtection Cmp={SeConnecter} />} />
          <Route path="nouveauCompte/" element={<NouveauCompteHorsConnection />} />
          <Route path="newUtilisateur/" element={<SinInProtected Cmp={SEnregistrer} />} />
          <Route
            path="utilisateur/"
            element={<SinInProtected Cmp={Utilisateur} />}
          />
          <Route path="individu/" element={<SinInProtected Cmp={Individu} />} />
          <Route
            path="requerant/"
            element={<SinInProtected Cmp={Requerant} />}
          />
          <Route path="accueil/" element={<SinInProtected Cmp={Accueil} />} />
          <Route
            path="procedure/"
            element={<SinInProtected Cmp={Procedure} />}
          />
          <Route path="bureau/" element={<SinInProtected Cmp={Bureau} />} />
          <Route path="dossier/" element={<SinInProtected Cmp={Dossier} />} />
          <Route path="nouvelleDemande/" element={<SinInProtected Cmp={NouvelleDemande} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
