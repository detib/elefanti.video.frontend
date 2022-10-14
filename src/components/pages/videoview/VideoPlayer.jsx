import React from 'react';
import './styles/VideoPlayer.scss';
import Youtube from 'react-youtube';
import SuggestedVideos from './SuggestedVideos';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

const VideoPlayer = () => {
  const { videoId } = useParams();

  return (
    <div className='content'>
      <div className='video-player-comments'>
        <Youtube className='youtube-player' videoId={videoId} />
        <div className='comment-section'>
          <CommentSection videoId={videoId}/>
        </div>
      </div>
      <div className='suggestedVideos'>
        <SuggestedVideos videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoPlayer;
