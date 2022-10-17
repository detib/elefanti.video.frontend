import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './styles/AdminVideo.scss';

import AddVideoForm from './AddVideoForm';
import Videos from './Videos';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminVideo = () => {
  const [videoCategories, setVideoCategories] = useState([]);

  const getCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/categories`)
      .then((response) => {
        setVideoCategories((prev) => (prev = response.data));
      })
      .catch((error) => {
        toast.error('Something went wrong when fetching videos');
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='admin-video'>
      <Tabs>
        <TabList>
          <Tab>Videos</Tab>
          <Tab>Add Video</Tab>
        </TabList>
        <TabPanel>
          <Videos videoCategories={videoCategories}/>
        </TabPanel>
        <TabPanel>
          <AddVideoForm videoCategories={videoCategories} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminVideo;
