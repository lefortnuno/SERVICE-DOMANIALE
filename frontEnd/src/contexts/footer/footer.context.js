import { Link } from "react-router-dom";


export default function FooterContext() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/aide/" className="nav-link">
                  Aide
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/licence/" className="nav-link">
                  Licence
                </Link>
              </li> */}
            </ul>
          </nav>
          <div className="copyright ml-auto">
            Réaliser par
            <a href="https://www.facebook.com/tendo.lelouch.9/"> Trofel</a>, vers Janvier
            2023
          </div>
        </div>
      </footer>

    </>
  );
}
