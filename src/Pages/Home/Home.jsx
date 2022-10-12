import React from 'react';
import HomeBanner from '../../components/pages/home/HomeBanner';
import VideoFeed from '../../components/pages/home/VideoFeed';
import UserLayout from '../../components/shared/layouts/UserLayout';

const Home = () => {
  return (
    <UserLayout>
      <HomeBanner />
      <VideoFeed />
    </UserLayout>
  );
};

export default Home;
