export default function FooterContext() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="http://www.themekita.com">
                  ThemeKita
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Help
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://themewagon.com/license/#free-item"
                >
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright ml-auto">
            2018, made with
            <i className="la la-heart heart text-danger"></i> by
            <a href="http://www.themekita.com">ThemeKita</a>
          </div>
        </div>
      </footer>
    </>
  );
}
