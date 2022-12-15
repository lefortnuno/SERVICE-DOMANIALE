

export default function FooterContext() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Aide
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Licence
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright ml-auto">
            Réaliser par
            <a href="https://www.facebook.com/tendo.lelouch.9/">Trofel</a>, en
            2022
          </div>
        </div>
      </footer>

    </>
  );
}
