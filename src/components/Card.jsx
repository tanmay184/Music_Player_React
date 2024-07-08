

function Card({ tracks, handleTrackPlay }) {
    return (
        <div className="container">
            <div className="row">

                {
                    tracks.map((element) => {
                        return (
                            <div key={element.id} className="col-lg-3 col-md-4 col-sm-6 col-12 py-2">
                                <div className="card" onClick={() => handleTrackPlay(element)}>
                                    <img src={element.album.images[1].url} className="card-img-top" alt="Photo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{element.name}</h5>
                                        <p className="card-text">Artist : {element.artists[0].name}</p>
                                        <p className="card-text">Release date : {element.album.release_date}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card