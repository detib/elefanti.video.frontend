import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AddCategory from './AddCategory';
import CategoryPanel from './CategoryPanel';
import './styles/AdminCategoryComponent.scss';

const AdminCategoryComponent = () => {
  return (
    <div className='admin-category'>
      <Tabs>
        <TabList>
          <Tab>Categories</Tab>
          <Tab>Add Category</Tab>
        </TabList>
        <TabPanel>
          <CategoryPanel />
        </TabPanel>
        <TabPanel>
          <AddCategory />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AdminCategoryComponent;
