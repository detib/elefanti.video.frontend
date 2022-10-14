import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

import './styles/CommentSection.scss';
import '../../shared/styles/shared.scss';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const context = useContext(AuthContext);
  const commentInputRef = useRef();

  const fetchComments = async () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/reactions/comments/video/${videoId}`)
      .then((response) => {
        response.data = response.data.sort((a, b) => new Date(b.CreatedOn) - new Date(a.CreatedOn));
        console.log(response.data);
        response.data.forEach((comment) => {
          const dateCreated = new Date(comment.CreatedOn).toLocaleDateString();
          comment.CreatedOn = formatDistanceToNow(new Date(dateCreated));
        });
        setComments((prev) => (prev = response.data));
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when fetching comments');
      });
  };

  const addComment = async (e) => {
    e.preventDefault();
    const commentValue = commentInputRef.current.value;

    if (commentValue === '') {
      toast.error('Comment cannot be empty');
      return;
    }

    if (toast.isActive('addComment')) return;

    const toastId = toast.loading('Adding comment...', { toastId: 'addComment', autoClose: 2000 });
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/reactions/comments`,
        {
          videoId: videoId,
          content: commentValue,
        },
        {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        }
      )
      .then((response) => {
        toast.update(toastId, {
          render: 'Commend Added Sucessfully',
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
          isLoading: false,
        });
        const dateCreated = new Date(response.data.CreatedOn).toLocaleDateString();
        response.data.CreatedOn = formatDistanceToNow(new Date(dateCreated));
        setComments((prev) => (prev = [response.data, ...prev]));
      })
      .catch((error) => {
        toast.update(toastId, {
          render: 'Something went wrong when adding comment',
          type: toast.TYPE.ERROR,
          autoClose: 2000,
          isLoading: false,
        });
      })
      .finally(() => {
        commentInputRef.current.value = '';
      });
  };

  useEffect(() => {
    console.log(context.data.token);
    fetchComments();
    // cancel axios request
  }, [videoId]);

  return (
    <div className='comment-wrapper flex-col'>
      {context.data.isLoggedIn && (
        <div className='comment-form'>
          <form onSubmit={addComment} className='flex-col'>
            <input ref={commentInputRef} type='text' placeholder='Add your comment' />
          </form>
        </div>
      )}
      <h3 className='comment-header'>Comment Section</h3>
      <div className='comments flex-col'>
        <p className='num-of-comments'>{comments.length} comments</p>
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div key={comment.Id} className='single-comment flex-col'>
                <div className='user-date inline spread'>
                  <p className='comment-user'>{comment.User?.Username}</p>
                  <p className='date-of-comment'>{comment.CreatedOn}</p>
                </div>
                <p className='comment-body'>{comment.Content}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
