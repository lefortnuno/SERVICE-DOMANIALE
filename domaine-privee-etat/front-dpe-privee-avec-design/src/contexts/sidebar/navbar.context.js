export default function NavbarContext() {
  return (
    <>
      <ul className="nav">
        <li className="nav-item active">
          <a href="index.html">
            <i className="la la-dashboard"></i>
            <p>Dashboard</p>
            <span className="badge badge-count">5</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="components.html">
            <i className="la la-table"></i>
            <p>Components</p>
            <span className="badge badge-count">14</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="forms.html">
            <i className="la la-keyboard-o"></i>
            <p>Forms</p>
            <span className="badge badge-count">50</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="tables.html">
            <i className="la la-th"></i>
            <p>Tables</p>
            <span className="badge badge-count">6</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="notifications.html">
            <i className="la la-bell"></i>
            <p>Notifications</p>
            <span className="badge badge-success">3</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="typography.html">
            <i className="la la-font"></i>
            <p>Typography</p>
            <span className="badge badge-danger">25</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="icons.html">
            <i className="la la-fonticons"></i>
            <p>Icons</p>
          </a>
        </li>
        <li className="nav-item update-pro">
          <button data-toggle="modal" data-target="#modalUpdate">
            <i className="la la-hand-pointer-o"></i>
            <p>Update To Pro</p>
          </button>
        </li>
      </ul>
    </>
  );
}
