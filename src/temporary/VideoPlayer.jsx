import React from "react";
import PropTypes from "prop-types";
import './styles.scss';

const YoutubeEmbed = ({ embedId }) => (
  <div className="content">
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
      <h2>This is Title</h2>
      <h3>This part is going to include description</h3>
      </div>

      <div className="similar-list">
  
      <h3>This is for similar posts</h3>
      
      </div>
  
 
  </div>
    
  
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;