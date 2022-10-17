import React, { useContext, useEffect, useRef, useState } from 'react';
import './styles/CategoryPanel.scss';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgClose, CgEye } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../user/Button';
import { AuthContext } from '../../../context/AuthContext';

const CategoryPanel = () => {
  const context = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [editingInProcess, setEditingInProcess] = useState(false);
  const editTitleRef = useRef();
  const hiddenCategoyRef = useRef();
  const navigate = useNavigate();

  const openEditForm = (category) => {
    editTitleRef.current.value = category.Name;
    hiddenCategoyRef.current.value = category.Id;
    setEditingInProcess((prev) => (prev = true));
  };

  const closeEditForm = () => {
    setEditingInProcess((prev) => (prev = false));
  };

  const editCategory = async (e) => {
    e.preventDefault();

    const newTitle = editTitleRef.current.value;
    const categoryId = hiddenCategoyRef.current.value;

    if (!newTitle.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    const notification = toast.loading('Updating Category');
    await axios
      .put(
        `${process.env.REACT_APP_API}/api/categories/${categoryId}`,
        {
          Name: newTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${context.data.token}`,
          },
        }
      )
      .then((response) => {
        setCategories((current) =>
          current.map((category) => {
            if (category.Id == response.data.Id) {
              category = response.data;
            }
            return category;
          })
        );
        toast.update(notification, {
          render: 'Succesfully updated category',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 2500,
        });
        closeEditForm();
      })
      .catch((error) => {
        console.log(error);
        toast.update(notification, {
          render: 'Something went wrong when updating video',
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 2500,
        });
      });
  };

  const deleteCategory = async (categoryId) => {
    const notification = toast.loading('Updating Category');
    await axios
      .delete(`${process.env.REACT_APP_API}/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        setCategories((current) => {
          const remaining = current.filter((category) => {
            if (category.Id != categoryId) return category;
          });
          return remaining;
        });
        toast.update(notification, {
          render: 'Succesfully deleted category',
          type: toast.TYPE.SUCCESS,
          isLoading: false,
          autoClose: 2500,
        });
      })
      .catch((error) => {
        toast.update(notification, {
          render: 'Something went wrong when deleting video',
          type: toast.TYPE.ERROR,
          isLoading: false,
          autoClose: 2500,
        });
      });
  };

  const fetchCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/categories`)
      .then((response) => {
        setCategories((prev) => (prev = response.data));
      })
      .catch((error) => {
        toast.error('Something went wrong when fetching categories');
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='admin-categories'>
      <form className={`edit-category-form ${editingInProcess && 'form-show flex-col'}`}>
        <input ref={editTitleRef} type='text' />
        <div className='button-wrapper inline'>
          <input onClick={editCategory} type='submit' value='Edit category' />
          <input ref={hiddenCategoyRef} type='hidden' />
          <input onClick={closeEditForm} className='cancel-button' type='submit' value='Cancel' />
        </div>
      </form>
      <div className='categories-wrapper flex-col'>
        {categories.map((category) => {
          return (
            <div key={category.Id} className='single-category inline spread'>
              <div className='category-image'>
                <img src={`${process.env.REACT_APP_API}/api/assets/category-images/${category.ImageName}`} />
              </div>
              <div className='category-details flex-col'>
                <p className='category-title'>{category.Name}</p>
              </div>
              <div className='single-category-right inline'>
                <Button onclick={() => openEditForm(category)} color='orange' buttonText='Edit'>
                  <AiOutlineEdit />
                </Button>
                <Button onclick={() => navigate(`/categories/${category.Id}`)} color='blue' buttonText='View'>
                  <CgEye />
                </Button>
                <Button onclick={() => deleteCategory(category.Id)} color='red' buttonText='Delete'>
                  <CgClose />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPanel;
