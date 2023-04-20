import logo from './assets/logo.svg';
import './App.css';
import { fetchTracks } from './lib/fetchTracks';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack, Track } from 'spotify-types';
import swal from 'sweetalert';

const generate_random = (number: number) => {
  return Math.floor(Math.random() * number);
};

const AlbumCover = ({ track }: { track: Track }) => {
  const src = track.album.images[0]?.url; // A changer ;)
  return <img src={src} style={{ width: 150, height: 150 }} />;
};

const App = () => {
  const [goodanswer, setGoodanswer] = useState(0);
  const [badanswer, setBadanswer] = useState(0);
  const {
    data: tracks,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });
  if (isError) {
    return <div className="App"> Token expired </div>;
  }
  if (isLoading) {
    return <div className="App"> Loading ... </div>;
  }
  const trackIndex = generate_random(tracks.length);

  let Index2 = generate_random(tracks.length);
  while (Index2 === trackIndex) {
    Index2 = generate_random(tracks.length);
  }
  let Index3 = Math.floor(Math.random() * (tracks.length + 1));
  while (Index3 === trackIndex || Index3 === Index2) {
    Index3 = Math.floor(Math.random() * (tracks.length + 1));
  }

  const shuffledIndexSong = [trackIndex, Index2, Index3].sort(
    () => Math.random() - 0.5,
  );

  if (
    shuffledIndexSong[0] === undefined ||
    shuffledIndexSong[1] === undefined ||
    shuffledIndexSong[2] === undefined
  ) {
    return <div className="App"> Loading ... </div>;
  }

  const currentTrack = tracks[trackIndex];
  const firstSong = tracks[shuffledIndexSong[0]];
  const secondSong = tracks[shuffledIndexSong[1]];
  const thirdSong = tracks[shuffledIndexSong[2]];

  if (currentTrack === undefined)
    return <div className="App"> Loading ... </div>;

  if (
    firstSong === undefined ||
    secondSong === undefined ||
    thirdSong === undefined
  )
    return <div className="App"> Loading ... </div>;

  const checkId = ({ track }: { track: Track }) => {
    if (track.id === currentTrack.track.id) {
      return swal('Bravo', 'Tu as trouvé le bon morceau !', 'success').then(
        () => setGoodanswer(goodanswer + 1),
      );
    } else
      swal('Dommage', "Tu n'as pas trouvé le bon morceau.", 'error').then(() =>
        setBadanswer(badanswer + 1),
      );
  };

  //const timeout = setTimeout(() => setBadanswer(badanswer + 1), 30000);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Blind test</h1>
      </header>
      <div className="App-images"></div>
      <audio
        key={currentTrack.track.preview_url}
        src={currentTrack.track.preview_url}
        autoPlay
        autoFocus
        controls
      />

      <div className="App-buttons">
        <div className="Choice">
          <AlbumCover track={firstSong.track} />
          <button
            onClick={() => {
              //clearTimeout(timeout),
              checkId(firstSong);
            }}
          >
            {' '}
            {firstSong.track.name}{' '}
          </button>
        </div>
        <div className="Choice">
          <AlbumCover track={secondSong.track} />
          <button
            onClick={() => {
              //clearTimeout(timeout),
              checkId(secondSong);
            }}
          >
            {' '}
            {secondSong.track.name}
          </button>
        </div>
        <div className="Choice">
          <AlbumCover track={thirdSong.track} />
          <button
            onClick={() => {
              //clearTimeout(timeout),
              checkId(thirdSong);
            }}
          >
            {' '}
            {thirdSong.track.name}
          </button>
        </div>
      </div>
      <p>
        {' '}
        Score : {goodanswer}/{badanswer + goodanswer}{' '}
      </p>
    </div>
  );
};

export default App;
