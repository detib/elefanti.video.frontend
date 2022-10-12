import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles/SearchResult.scss';
import '../../shared/styles/shared.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import VideoCard from '../../shared/VideoCard/VideoCard';

const SearchResult = () => {
  const { query } = useParams();
  const [queriedVideos, setQueriedVideos] = useState([]);

  const fetchVideos = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/search/${query}`)
      .then((response) => {
        setQueriedVideos((prev) => (prev = response.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when fetching videos');
      });
  };

  useEffect(() => {
    fetchVideos();
  }, [query]);

  return (
    <div className='search-videos flex-col'>
      <h2 className='search-videos__title'>Search Result for {query}</h2>
      <div className='search-videos__videos'>
        {(queriedVideos.length > 0 &&
          queriedVideos.map((video) => {
            const videoProps = {
              key: video.id,
              id: video.id,
              to: `/watch/${video.id}`,
              title: video.title,
              createdOn: video.createdOn,
              description: video.description,
              timestamp: video.timeStamp,
            };
            return <VideoCard {...videoProps} />;
          })) || (
          <div>
            <h3>No Videos Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
