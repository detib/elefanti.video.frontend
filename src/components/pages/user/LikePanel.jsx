import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './styles/LikePanel.scss';
import '../../shared/styles/shared.scss';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import VideoCard from '../../shared/VideoCard/VideoCard';
import { IoHeartDislike } from 'react-icons/io5';

const LikePanel = () => {
  const [likes, setLikes] = useState([]);
  const context = useContext(AuthContext);

  const getUserLikes = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/reactions/likes/user`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        setLikes(response.data);
      })
      .catch(() => {
        toast.error('Something went wrong when fetching likes');
      });
  };

  const unlikeVideo = async (like) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/api/reactions/likes/${like.VideoId}`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        const likeToBeRemoved = likes.findIndex((l) => l.VideoId === like.VideoId);
        likes.splice(likeToBeRemoved, 1);
        setLikes((prev) => (prev = [...likes]));
        toast.success('Like was successfully removed');
      });
  };

  useEffect(() => {
    getUserLikes();
  }, []);

  return (
    <div className='user-like-wrapper flex-col'>
      <p>{likes.length} videos liked</p>
      {likes.length > 0 && <p>Press Videos to unlike them</p>}
      <div className='user-likes'>
        {likes.map((like) => {
          const videoprops = {
            id: like.Video.Id,
            title: like.Video.Title,
          };
          return (
            <div key={like.Id} onClick={() => unlikeVideo(like)} className='video-card-wrapper'>
              <div className='unlike-video center-item'>
                <IoHeartDislike />
              </div>
              <VideoCard {...videoprops} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LikePanel;
