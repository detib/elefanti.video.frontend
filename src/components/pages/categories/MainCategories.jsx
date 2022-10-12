import React, { useState, useEffect } from 'react';
import './styles/MainCategories.scss';
import '../../shared/styles/shared.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MainCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/categories`)
      .then((response) => {
        setCategories((prev) => (prev = response.data));
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='main-categories flex-col'>
      <h2 className='main-categories__title'>Main Categories</h2>
      <div className='main-categories__categories'>
        {categories.map((category) => {
          return (
            <Link key={category.Id} to={`/categories/${category.Name}`} className='single-category'>
              <img src='https://source.unsplash.com/random/550x400' alt='' />
              <div className='single-category__name'>
                <p>{category.Name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategories;