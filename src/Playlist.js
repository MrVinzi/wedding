import React from "react";

const Playlist = () => {
  return (
    <div id="playlist" className="playlist">
      <div className="playlist-container">
        <div className="playlist-content">
          <div className="playlist-frame">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/videoseries?list=PL3edQ3rtu4DNkzCUK1YtzgkZzTrga7PYm"
              title="YouTube Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="playlist-text">
            <h2 className="playlist-title">Наш весільний плейлист </h2>
            <p>
              Додайте свою улюблену пісню до нашого весільного плейлиста!  
              Ваш вибір зробить наше свято ще кращим!  
              Просто перейдіть за посиланням:
            </p>
            <a
              href="https://music.youtube.com/playlist?list=PL3edQ3rtu4DNkzCUK1YtzgkZzTrga7PYm"
              target="_blank"
              rel="noopener noreferrer"
              className="playlist-link"
            >
              🎵 Додати пісню
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;