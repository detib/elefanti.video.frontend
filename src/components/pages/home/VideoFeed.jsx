import React, { useCallback, useEffect, useState } from 'react';

import '../../shared/styles/shared.scss';
import './styles/VideoFeed.scss';
import VideoCard from '../../shared/VideoCard/VideoCard';
import useFetch from '../../../hooks/useFetch';
import { useRef } from 'react';
import { PropagateLoader } from 'react-spinners';

const VideoFeed = () => {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(4);
  const loader = useRef(null);
  const { loading, error, videos } = useFetch(skip, take);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setSkip((prev) => (prev = videos.length));
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver, skip]);

  return (
    <div className='video-feed'>
      <h2 className='videos-feed__title'>Videos</h2>
      <div className='video-feed__videos'>
        {videos.map((video) => {
          const videoProps = {
            key: video.id,
            id: video.id,
            to: `/watch/${video.id}`,
            title: video.title,
            createdOn: video.createdOn,
            description: video.description,
          };
          return <VideoCard {...videoProps} />;
        })}
        <div ref={loader} />
      </div>
      {loading && <PropagateLoader className='video-feed-loader' color='#36d7b7' />}
    </div>
  );
};

export default VideoFeed;
