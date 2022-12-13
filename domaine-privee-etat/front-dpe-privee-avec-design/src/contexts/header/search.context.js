

export default function SearchContext() {
  return (
    <>
      <form className="navbar-left navbar-form nav-search mr-md-3" action="">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search ..."
            className="form-control"
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="la la-search search-icon"></i>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
