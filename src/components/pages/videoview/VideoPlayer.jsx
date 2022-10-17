import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Youtube from "react-youtube";

import "./styles/VideoPlayer.scss";
import { AuthContext } from "../../../context/AuthContext";
import SuggestedVideos from "./SuggestedVideos";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const VideoPlayer = () => {
  const context = useContext(AuthContext);
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  const [videoLikes, setVideoLikes] = useState([]);
  const [existingLike, setExistingLike] = useState(false);
  const navigate = useNavigate();

  const fetchVideo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/videos/${videoId}`)
      .then((response) => {
        response.data.createdOn = format(
          new Date(response.data.createdOn),
          "d MMM yyyy"
        );
        setVideo((prev) => (prev = response.data));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 404) {
          navigate("/404");
        }
      });
  };

  const getVideoLikes = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/reactions/likes/${videoId}`)
      .then((response) => {
        setVideoLikes(response.data);
        console.log(response.data);
        if (context.data.isLoggedIn) {
          const likeExists = response.data.find(
            (like) => like.UserId == jwtDecode(context.data.token).Id
          );
          setExistingLike(likeExists != undefined ? true : false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong when fetching likes");
      });
  };

  const likeVideo = async (e) => {
    if (!context.data.isLoggedIn) {
      e.preventDefault();
      toast.warning("You need to be logged in to like videos.", {
        autoClose: 3500,
      });
      return;
    }

    if (e.target.checked) {
      await axios
        .post(
          `${process.env.REACT_APP_API}/api/reactions/likes/${videoId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${context.data.token}`,
            },
          }
        )
        .then((response) => {
          setExistingLike((prev) => (prev = true));
          setVideoLikes((prev) => [...prev, response.data]);
        })
        .catch(() => {
          toast.error("Something went wrong when liking this video!");
        });
    } else {
      await axios
        .delete(`${process.env.REACT_APP_API}/api/reactions/likes/${videoId}`, {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        })
        .then(() => {
          setExistingLike((prev) => (prev = false));
          const likeToBeRemoved = videoLikes.findIndex(
            (l) => l.UserId == jwtDecode(context.data.token).Id
          );
          videoLikes.splice(likeToBeRemoved, 1);
        })
        .catch(() => {
          toast.error("Something went wrong when removing like!");
        });
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    getVideoLikes();
  }, [videoId, video]);
  return (
    <div className="content">
      <div className="video-player-wrapper">
        <Youtube className="youtube-player" videoId={videoId} />
        <div className="video-detail-wrapper">
          <div className="video-details">
            <div className="video-title inline spread">
              <h3>{video.title}</h3>
              <div className="video-stats inline">
                <p>
                  {video.views} views • {video.createdOn}
                </p>
                <div className="video-like inline">
                  <LikeButton checked={existingLike} onClick={likeVideo} />
                  <p className="video-likes">{videoLikes.length} Likes</p>
                </div>
              </div>
            </div>
            <div className="video-description">
              <p>{video.description}</p>
            </div>
          </div>

          <div className="comment-section">
            {video.id && <CommentSection videoId={videoId} />}
          </div>
        </div>
      </div>
      <div className="suggestedVideos">
        {video.id && <SuggestedVideos video={video} />}
      </div>
    </div>
  );
};

export default VideoPlayer;
