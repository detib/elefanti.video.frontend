import React, { useState } from 'react';
import './styles/SuggestedVideos.scss';
import '../../shared/styles/shared.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import VideoCard from '../../shared/VideoCard/VideoCard';

const SuggestedVideos = ({ videoId }) => {
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/${videoId}`)
      .then((response) => {
        setCategory((prev) => (prev = response.data.category));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when fetching suggestions');
      });
  };

  const fetchSuggestedVideos = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/category/${category.id}`)
      .then((response) => {
        setSuggestedVideos((prev) => (prev = response.data));
      })
      .catch((error) => {
        toast.error('Something went wrong when fetching suggestions');
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (category.id) {
      fetchSuggestedVideos();
    }
  }, [category]);

  return (
    <div className='suggested-videos'>
      <div className='suggested-videos-wrapper'>
        {suggestedVideos.map((video) => {
          if (video.id != videoId) {
            const videoProps = {
              key: video.id,
              id: video.id,
              to: `/watch/${video.id}`,
              title: video.title,
              //   createdOn: video.createdOn,
              //   description: video.description,
              //   timestamp: video.timeStamp,
            };
            return <VideoCard {...videoProps} />;
          }
        })}
      </div>
    </div>
  );
};

export default SuggestedVideos;
