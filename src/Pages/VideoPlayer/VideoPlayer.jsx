import React from "react";
import PropTypes from "prop-types";
import './styles.css';

const VideoPlayer = ({ embedId }) => (
    
  <div className="video-responsive">
    <iframe
      width="330"
      height="220"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <h1>Testing YoutubeEmbed</h1>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default VideoPlayer;