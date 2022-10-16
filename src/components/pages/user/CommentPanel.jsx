import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CommentPanel.scss';
import '../../shared/styles/shared.scss';
import Button from './Button';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { CgClose, CgEye } from 'react-icons/cg';
import { AiOutlineEdit } from 'react-icons/ai';
import { useRef } from 'react';

const CommentPanel = () => {
  const [userComments, setUserComments] = useState([]);
  const [editingInProcess, setEditingInProcess] = useState(false);
  const editInputRef = useRef();
  const hiddenCommentIdRef = useRef();
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUserComments = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/reactions/comments/user`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        response.data.forEach((comment) => {
          const commentCreatedOn = new Date(comment.CreatedOn);
          comment.CreatedOn = format(commentCreatedOn, 'd MMM yyyy');
        });
        setUserComments(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong when fetching comments');
      });
  };

  const deleteComment = async (commentid) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/api/reactions/comments/${commentid}`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        const commentToBeDeleted = userComments.findIndex((c) => c.Id == commentid);
        userComments.splice(commentToBeDeleted, 1);
        const leftComments = userComments;
        setUserComments((prev) => (prev = [...leftComments]));
        toast.success('Comment deleted succesfully');
      })
      .catch((error) => {
        toast.error('Something went wrong when deleting comment');
      });
  };

  const openEditForm = (comment) => {
    setEditingInProcess((prev) => (prev = true));
    editInputRef.current.value = comment.Content;
    hiddenCommentIdRef.current.value = comment.Id;
  };

  const closeEditForm = (e) => {
    e.preventDefault();
    editInputRef.current.value = '';
    hiddenCommentIdRef.current.value = undefined;
    setEditingInProcess((prev) => (prev = false));
  };

  const editComment = async (e) => {
    e.preventDefault();

    if (editInputRef.current.value == '') {
      toast.error('Comment can not be empty');
      return;
    }

    await axios
      .put(
        `${process.env.REACT_APP_API}/api/reactions/comments/${hiddenCommentIdRef.current.value}`,
        {
          content: editInputRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        }
      )
      .then((response) => {
        const commentToBeChanged = userComments.findIndex((c) => c.Id == response.data.Id);
        userComments[commentToBeChanged].Content = response.data.Content;
        setUserComments((prev) => (prev = [...userComments]));
        toast.success('Comment edited sucessfully');
      })
      .catch((error) => {
        toast.error('Something went wrong while editing comment');
      })
      .finally(() => {
        editInputRef.current.value = '';
        setEditingInProcess((prev) => (prev = false));
      });
  };

  useEffect(() => {
    fetchUserComments();
  }, []);

  return (
    <div className='user-comment-wrapper flex-col'>
      <form className={`edit-comment-form flex-col ${editingInProcess && 'form-show'}`}>
        <input ref={editInputRef} type='text' />
        <div className='button-wrapper inline'>
          <input onClick={editComment} type='submit' value='Edit Comment' />
          <input ref={hiddenCommentIdRef} type='hidden' />
          <input onClick={closeEditForm} className='cancel-button' type='submit' value='Cancel' />
        </div>
      </form>

      <p>{userComments.length} comments</p>
      {userComments.map((comment) => {
        return (
          <div key={comment.Id} className='single-comment inline spread'>
            <div className='video-comment-image'>
              <img src={`https://img.youtube.com/vi/${comment.VideoId}/mqdefault.jpg`} />
            </div>
            <div className='comment-details'>
              <p className='comment-content'>{comment.Content}</p>
              <p className='comment-created-date'>{comment.CreatedOn}</p>
            </div>
            <div className='single-comment-right inline'>
              <Button onclick={() => openEditForm(comment)} color='orange' buttonText='Edit'>
                <AiOutlineEdit />
              </Button>
              <Button onclick={() => navigate(`/watch/${comment.VideoId}`)} color='blue' buttonText='View'>
                <CgEye />
              </Button>
              <Button onclick={() => deleteComment(comment.Id)} color='red' buttonText='Delete'>
                <CgClose />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentPanel;
