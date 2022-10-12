import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles/HomeBanner.scss';
import '../../shared/styles/shared.scss';

const HomeBanner = () => {
  const [bannerVideos, setBannerVideos] = useState([]);
  const sliderContainer = useRef();

  const fetchVideos = async () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/videos?from=${0}&take=${10}`, {})
      .then((response) => {
        setBannerVideos(response.data);
      });
  };

  let interval;

  const changeSlide = () => {
    let slideIndex = 0;
    interval = setInterval(() => {
      if (slideIndex == bannerVideos.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }
      sliderContainer.current.style.setProperty('--translateX', `-${slideIndex}0%`);
    }, 3500);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    changeSlide();

    return () => {
      clearInterval(interval);
    };
  }, [bannerVideos]);

  return (
    <div className='home-banner'>
      <div
        ref={sliderContainer}
        className='slider-container'
        style={{ width: `${bannerVideos.length * 100}%` }}
      >
        {bannerVideos.map((video) => {
          return (
            <Link to={`watch/${video.id}`} key={video.id} className='slide'>
              <div
                className='slide__image'
                style={{
                  background: `linear-gradient(180deg,transparent 0%,rgba(0,0,0,.8) 100%),
                               url(https://img.youtube.com/vi/${video.id}/maxresdefault.jpg) no-repeat`,
                }}
              ></div>
              <div className='slide__content'>
                <h2 className='slide__title'>{video.title}</h2>
                <p className='slide__description'>
                  {video.description}
                </p>
                <div className='click-button'>Click to Watch</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeBanner;
