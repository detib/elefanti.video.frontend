import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './styles/AdminVideo.scss';

import AddVideoForm from './AddVideoForm';
import Videos from './Videos';

const AdminVideo = () => {
  return (
    <div className='admin-video'>
      <Tabs>
        <TabList>
          <Tab>Videos</Tab>
          <Tab>Add Video</Tab>
        </TabList>
        <TabPanel>
          <Videos />
        </TabPanel>
        <TabPanel>
          <AddVideoForm />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminVideo;
