import React from 'react';
import MainCategories from '../../components/pages/categories/MainCategories';
import UserLayout from '../../components/shared/layouts/UserLayout';

const Categories = () => {
  return (
    <UserLayout className='categories'>
        <MainCategories />
    </UserLayout>
  );
};

export default Categories;