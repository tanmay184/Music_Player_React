
function Loading({ isLoading }) {
    return (
        <div>
            <div className={`row ${isLoading ? "" : "d-none"}`}>
                <div className="col-12 py-5">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Loading