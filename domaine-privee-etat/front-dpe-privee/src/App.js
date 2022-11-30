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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
