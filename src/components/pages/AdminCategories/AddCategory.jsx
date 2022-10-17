import React, { useContext, useRef, useState } from 'react';
import './styles/AddCategory.scss';
import { BsCameraFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const AddCategory = () => {
  const context = useContext(AuthContext);
  const [image, setImage] = useState('');
  const titleInputRef = useRef();

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (image == '') {
      toast.error('Please add an image');
      return;
    } else if (!titleInputRef.current.value) {
      toast.error('Please enter a category title');
      return;
    }

    const categoryTitle = titleInputRef.current.value;
    const formdata = new FormData();
    formdata.append('Name', categoryTitle);
    formdata.append('ImageFile', image);
    await axios
      .post(`${process.env.REACT_APP_API}/api/categories`, formdata, {
        headers: {
          Authorization: `Bearer ${context.data.token}`,
        },
      })
      .then((response) => {
        toast.success('Category added successfully');
      })
      .catch((error) => {
        toast.error('Something went wrong when creating category');
      });
  };

  return (
    <div className='add-category-form'>
      <form>
        <div className='content-wrapper'>
          <div className='input-wrapper'>
            <h1>Add Category</h1>
            <input ref={titleInputRef} className='input' type='text' placeholder='Title' />
            <label for='inputTag'>
              <BsCameraFill className='icon' /> Upload Image
              <input onChange={handleImageUpload} id='inputTag' type='file' />
            </label>
            {image.name}
            <button onClick={handleSumbit} type='submit'>
              Sumbit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
