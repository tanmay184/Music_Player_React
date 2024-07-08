import { useState, useEffect } from 'react';
import './App.css';

import Nav from './components/Navbar';
import Loading from './components/Loading';
import Card from './components/Card';
import Player from './components/Player';
import { searchTracks } from './utils/SpotifyApi';
function App() {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const getTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await searchTracks(keyword === "" ? "trending" : keyword);
      setTracks(results);
    }
    catch (er) {
      setError(er.message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getTracks();
    }, 500); // Delay to prevent too many API calls

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleTrackPlay = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const audioElement = document.getElementById("audio-player");
    if (audioElement) {
      isPlaying ? audioElement.pause() : audioElement.play();
    }
  };

  const playNext = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const playPrev = () => {
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <>
      <Nav
        keyword={keyword}
        setKeyword={setKeyword}
        getTracks={getTracks}
      />
      <Loading isLoading={isLoading} />

      {error && <div className="alert alert-danger">{error}</div>}
      {!error && !isLoading && <Card tracks={tracks} handleTrackPlay={handleTrackPlay} />}

      <Player
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        playNext={playNext}
        playPrev={playPrev}
      />
    </>
  );
}

export default App;
