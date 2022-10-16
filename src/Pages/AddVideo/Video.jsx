import React from 'react';
import AddVideoForm from '../../components/pages/AddVideo/AddVideoForm';
import AdminLayout from '../../components/shared/layouts/AdminLayout';

const Video = () => {
  return (
    <AdminLayout className='video'>
      <AddVideoForm />
    </AdminLayout>
  );
};

export default Video;
