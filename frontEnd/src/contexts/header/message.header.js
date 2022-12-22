export default function MessageHeader() {
  return (
    <>
      <li className="nav-item dropdown hidden-caret">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="la la-envelope"></i>
        </a>
        {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div> */}
      </li>
    </>
  );
}
