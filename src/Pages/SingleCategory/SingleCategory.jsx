import React from 'react';
import SingleCategoryVideos from '../../components/pages/singlecategory/SingleCategoryVideos';
import UserLayout from '../../components/shared/layouts/UserLayout';

const SingleCategory = () => {

  return (
    <UserLayout className='single-category'>
      <SingleCategoryVideos />
    </UserLayout>
  );
};

export default SingleCategory;
