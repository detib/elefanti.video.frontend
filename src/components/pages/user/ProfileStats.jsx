import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './styles/ProfileStats.scss';
import '../../shared/styles/shared.scss';
import CommentPanel from './CommentPanel';
import LikePanel from './LikePanel';

const ProfileStats = ({ profile }) => {
  const userid = profile.Id;
  return (
    <div className='profile-stats'>
      <Tabs>
        <TabList>
          <Tab>Comments</Tab>
          <Tab>Likes</Tab>
        </TabList>
        <TabPanel>
          <CommentPanel />
        </TabPanel>
        <TabPanel>
          <LikePanel />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProfileStats;
