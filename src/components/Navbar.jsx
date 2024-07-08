
function Nav({ keyword, setKeyword, getTracks }) {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Music</a>

                <div
                    className="collapse navbar-collapse d-flex justify-content"
                    id="navbarSupportedContent"
                >


                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        className="form-control me-2 w-75"
                        type="search"
                        placeholder="Search any song"
                        aria-label="Search"
                    />
                    <button
                        className="btn btn-outline-success"
                        onClick={getTracks}
                    >
                        Search
                    </button>

                </div>
            </div>
        </nav>
    );
}
export default Nav;