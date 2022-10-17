import React, { useState, useRef, useEffect, useContext } from 'react';
import useFetch from '../../../hooks/useFetch';
import { PropagateLoader } from 'react-spinners';
import '../../shared/styles/shared.scss';
import './styles/Videos.scss';
import Button from '../user/Button';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { CgClose, CgEye } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const Videos = ({ videoCategories }) => {
  const context = useContext(AuthContext);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [editingInProcess, setEditingInProcess] = useState(false);
  const loader = useRef(null);
  const hiddenVideoIdRef = useRef(null);
  const editTitleRef = useRef(null);
  const editDescriptionRef = useRef(null);
  const [editCategory, setEditCategory] = useState({ value: null, label: null });
  const { loading, error, videos, setVideos } = useFetch(skip, take);
  const navigate = useNavigate();

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setSkip((prev) => (prev = videos.length));
    }
  };

  const openEditForm = (video) => {
    setEditingInProcess((prev) => (prev = true));
    editTitleRef.current.value = video.title;
    hiddenVideoIdRef.current.value = video.id;
    editDescriptionRef.current.value = video.description;
    setEditCategory(
      (prev) =>
        (prev = {
          value: video.categoryId,
          label: videoCategories.find((c) => c.Id == video.categoryId).Name,
        })
    );
  };

  const closeEditForm = (e) => {
    if (e) {
      e.preventDefault();
    }
    setEditingInProcess((prev) => (prev = false));
    editTitleRef.current.value = '';
    hiddenVideoIdRef.current.value = '';
    editDescriptionRef.current.value = '';
  };

  const editVideo = async (e) => {
    e.preventDefault();
    if (editTitleRef.current.value == '') {
      toast.error('Title cannot be empty');
      return;
    } else if (editDescriptionRef.current.value == '') {
      toast.error('Description cannot be empty');
      return;
    } else if (editCategory.value == null) {
      toast.error('Category needs to be selected');
      return;
    }

    const newTitle = editTitleRef.current.value;
    const newDescription = editDescriptionRef.current.value;
    const newCategoryId = editCategory.value;

    await axios
      .put(
        `${process.env.REACT_APP_API}/api/videos/${hiddenVideoIdRef.current.value}`,
        {
          title: newTitle,
          description: newDescription,
          categoryId: newCategoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        }
      )
      .then((response) => {
        setVideos((prev) => {
          const remainingVideos = prev.map((video) => {
            if (video.id == response.data.id) {
              video = response.data;
            }
            return video;
          });
          return remainingVideos;
        });
        closeEditForm();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when editing video');
      });
  };

  const deleteVideo = async (videoid) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/api/videos/${videoid}`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then(() => {
        console.log(videos.filter((v) => v.id != videoid));
        setVideos((prev) => prev.filter((video) => video.id != videoid));
        toast.success('Video deleted successfully');
      });
  };

  const options = [];
  videoCategories.forEach((category) => {
    options.push({ value: category.Id, label: category.Name });
  });

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
    <div className='admin-videos'>
      <form className={`edit-video-form ${editingInProcess && 'form-show flex-col'}`}>
        <input ref={editTitleRef} type='text' />
        <Select value={editCategory} onChange={(choice) => setEditCategory((prev) => (prev = choice))} options={options} />
        <textarea ref={editDescriptionRef} cols='30' rows='10'></textarea>
        <div className='button-wrapper inline'>
          <input onClick={editVideo} type='submit' value='Edit Video' />
          <input ref={hiddenVideoIdRef} type='hidden' />
          <input onClick={closeEditForm} className='cancel-button' type='submit' value='Cancel' />
        </div>
      </form>
      <div className='videos-wrapper flex-col'>
        <div>{videos.length} Videos</div>
        {videos.map((video) => {
          video.createdOn = format(new Date(video.createdOn), 'd MMM yyyy');
          return (
            <div key={video.id} className='single-video inline spread'>
              <div className='video-image'>
                <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} />
              </div>
              <div className='video-details flex-col'>
                <p className='video-title'>{video.title}</p>
                <p className='video-description'>{video.description}</p>
                <p className='video-created-date'>{video.createdOn}</p>
              </div>
              <div className='single-video-right inline'>
                <Button onclick={() => openEditForm(video)} color='orange' buttonText='Edit'>
                  <AiOutlineEdit />
                </Button>
                <Button onclick={() => navigate(`/watch/${video.id}`)} color='blue' buttonText='View'>
                  <CgEye />
                </Button>
                <Button onclick={() => deleteVideo(video.id)} color='red' buttonText='Delete'>
                  <CgClose />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={loader} />
      {loading && <PropagateLoader className='video-feed-loader' color='#36d7b7' />}
    </div>
  );
};

export default Videos;
