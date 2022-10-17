import React, { useState } from 'react';
import './styles/SuggestedVideos.scss';
import '../../shared/styles/shared.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import VideoCard from '../../shared/VideoCard/VideoCard';

const SuggestedVideos = ({ video }) => {
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  const fetchSuggestedVideos = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/category/${video.categoryId}`)
      .then((response) => {
        setSuggestedVideos((prev) => (prev = response.data));
      })
      .catch((error) => {
        toast.error('Something went wrong when fetching suggestions');
      });
  };

  useEffect(() => {
    if (video.id) {
      fetchSuggestedVideos();
    }
  }, [video]);

  return (
    <div className='suggested-videos'>
      <div className='suggested-videos-wrapper'>
        {suggestedVideos.map((currentVideo) => {
          if (currentVideo.id != video.id) {
            const videoProps = {
              key: currentVideo.id,
              id: currentVideo.id,
              to: `/watch/${currentVideo.id}`,
              title: currentVideo.title,
              createdOn: currentVideo.createdOn,
              description: currentVideo.description,
            };
            return <VideoCard {...videoProps} />;
          }
        })}
      </div>
    </div>
  );
};

export default SuggestedVideos;
