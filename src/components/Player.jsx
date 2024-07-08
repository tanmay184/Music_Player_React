import React, { useEffect, useRef } from 'react';

function Player({ currentTrack, isPlaying, togglePlayPause, playNext, playPrev }) {
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.pause();

            if (isPlaying && currentTrack) {
                audioElement.load();
                const playPromise = audioElement.play();

                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.error('Error playing audio:', error);
                    });
                }
            }
        }
    }, [currentTrack, isPlaying]);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const handleEnded = () => playNext();
            audioElement.addEventListener('ended', handleEnded);

            return () => {
                audioElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [playNext]);

    return (
        <div className="player-container">
            {currentTrack ? (
                <>
                    <div className="track-info">
                        <img src={currentTrack.album.images[1].url} alt="Album cover" />
                        <div className="track-details">
                            <h5>{currentTrack.name}</h5>
                            <p>{currentTrack.artists[0].name}</p>
                        </div>
                    </div>
                    <div className="player-controls">
                        <button onClick={playPrev}>Prev</button>
                        <button onClick={togglePlayPause}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={playNext}>Next</button>
                    </div>
                    <audio id="audio-player" ref={audioRef}>
                        <source src={currentTrack.preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </>
            ) : (
                <div className="no-track">No track selected</div>
            )}
        </div>
    );
}

export default Player;
