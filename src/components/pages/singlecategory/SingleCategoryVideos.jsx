import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import VideoCard from '../../shared/VideoCard/VideoCard';
import '../../shared/styles/shared.scss';
import './styles/SingleCategoryVideos.scss';
import { useNavigate, useParams } from 'react-router-dom';

const SingleCategoryVideos = () => {
  const { categoryId } = useParams();
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({});
  const navigate = useNavigate();

  const fetchCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/categories/${categoryId}`)
      .then((response) => {
        setCurrentCategory((prev) => (prev = response.data));
      })
      .catch((error) => {
        if (error.response.status == 404) {
          navigate('/');
        }
      });
  };

  const fetchCategoryVideos = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/category/${categoryId}`)
      .then((response) => {
        setCategoryVideos((prev) => (prev = response.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when fetching videos.');
      });
  };

  useEffect(() => {
    fetchCategory().then(() => {
      fetchCategoryVideos();
    });
  }, []);

  return (
    <div className='category-videos flex-col'>
      <h2 className='category-videos__title'>{currentCategory.name}</h2>
      <div className='category-videos__videos'>
        {(categoryVideos.length > 0 &&
          categoryVideos.map((video) => {
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
            <h3>No Videos Found on this category</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCategoryVideos;
