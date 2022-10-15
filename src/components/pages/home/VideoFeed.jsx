import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../../shared/styles/shared.scss';
import './styles/VideoFeed.scss';
import VideoCard from '../../shared/VideoCard/VideoCard';

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async (from, take) => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos?from=${from}&take=${take}`)
      .then((response) => {
        setVideos((prevData) => [...prevData, ...response.data]);
      })
      .catch((erorr) => {
        console.log(erorr);
        toast.error('Something went wrong when fetching videos');
      });
  };

  useEffect(() => {
    console.log('Useeffect Called');
    fetchVideos(0, 10);
  }, []);

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
      </div>
    </div>
  );
};

export default VideoFeed;
