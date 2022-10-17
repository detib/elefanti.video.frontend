import React, { useRef, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './styles/AddVideoForm.scss';
import { toast } from 'react-toastify';
import Select from 'react-select';
import YouTube from 'react-youtube';
import axios from 'axios';

const AddVideoForm = ({ videoCategories }) => {
  const context = useContext(AuthContext);
  const [videoLink, setVideoLink] = useState('');
  const [videoId, setVideoId] = useState('');
  const titleInput = useRef();
  const descriptionInput = useRef();
  const [categorySelect, setCategorySelect] = useState();

  const youtubeLinkRegEx = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

  const handleLinkInput = (e) => {
    setVideoLink((prev) => (prev = e.target.value));
    const youtubeVideoId = e.target.value.split('v=')[1].split('&')[0];
    setVideoId((prev) => (prev = youtubeVideoId));
  };

  const addVideo = async (e) => {
    e.preventDefault();

    if (!videoLink.match(youtubeLinkRegEx)) {
      toast.error('Please enter a valid youtube link');
      return;
    }

    if (!videoId || !titleInput.current.value || !descriptionInput.current.value || !categorySelect) {
      toast.error('Please fill in all the fields');
      return;
    }

    const notification = toast.loading('Adding video...', {
      toastId: 'add-video-toast',
    });

    await axios
      .post(
        `${process.env.REACT_APP_API}/api/videos`,
        {
          id: videoId,
          title: titleInput.current.value,
          description: descriptionInput.current.value,
          categoryId: categorySelect.value,
        },
        {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        }
      )
      .then((response) => {
        toast.update(notification, {
          render: 'Video added sucessfully',
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        let notificationText;
        if (error.response.status == 409) {
          notificationText = 'Video already exists';
        } else {
          notificationText = 'Something went wrong when adding video';
        }
        toast.update(notification, {
          render: notificationText,
          type: toast.TYPE.ERROR,
          autoClose: 2000,
          isLoading: false,
        });
      })
      .finally(() => {
        setVideoLink((prev) => (prev = ''));
        setVideoId((prev) => (prev = ''));
        titleInput.current.value = '';
        descriptionInput.current.value = '';
        setCategorySelect({ label: null, value: null });
      });
  };

  const options = [];
  videoCategories.forEach((category) => {
    options.push({ value: category.Id, label: category.Name });
  });

  return (
    <div className='add-video-page'>
      <div className='video-player-wrapper'>
        <YouTube videoId={videoId} />
      </div>
      <div className='add-video-form'>
        <form>
          <div className='form-input-wrapper'>
            <div className='input-wrapper'>
              <h3 className='add-video-form-header'>Add Video</h3>
              <input value={videoLink} onInput={handleLinkInput} type='text' placeholder='Link' />
              <input ref={titleInput} type='text' placeholder='Title' />
              <Select
                onChange={(choice) => setCategorySelect((prev) => (prev = choice))}
                className='select-category'
                placeholder='Select Video Category'
                options={options}
              />
              <textarea ref={descriptionInput} className='inputarea' type='text' placeholder='Description' />
              <button onClick={addVideo} type='submit'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoForm;
