import React from 'react';
import AddVideoForm from '../../components/pages/AdminVideos/AddVideoForm';
import AdminVideo from '../../components/pages/AdminVideos/AdminVideo';
import AdminLayout from '../../components/shared/layouts/AdminLayout';

const AdminVideoPage = () => {
  return (
    <AdminLayout className='admin-video-page'>
      <AdminVideo />
    </AdminLayout>
  );
};

export default AdminVideoPage;
