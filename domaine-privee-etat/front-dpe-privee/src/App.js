import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./contexts/Protected";
import Deconnection from "./contexts/Deconnection";
import Login from "./components/utilisateurs/login";
import Utilisateur from "./components/utilisateurs/utilisateur";
import Dossier from "./components/dossiers/dossier";
import Individu from "./components/individu/individu";
import Requerant from "./components/requerant/requerant";
import Bureau from "./components/bureau/bureau";
import Procedure from "./components/procedure/procedure";
import C_I from "./components/historique/C_I/cahierInterne";
import C_D from "./components/historique/C_D/cahierDepart";
import C_A from "./components/historique/C_A/cahierArriver";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Deconnection Cmp={Login} />} />
          <Route
            path="utilisateur/"
            element={<Protected Cmp={Utilisateur} />}
          />
          <Route path="dossier/" element={<Protected Cmp={Dossier} />} />
          <Route path="individu/" element={<Protected Cmp={Individu} />} />
          <Route path="requerant/" element={<Protected Cmp={Requerant} />} />
          <Route path="bureau/" element={<Protected Cmp={Bureau} />} />
          <Route path="procedure/" element={<Protected Cmp={Procedure} />} />
          <Route path="C_I/" element={<Protected Cmp={C_I} />} />
          <Route path="C_D/" element={<Protected Cmp={C_D} />} />
          <Route path="C_A/" element={<Protected Cmp={C_A} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
