import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Overview/Header&Container/Header';
import SideBar from '../SideBar/SideBar';

const Dashboard = () => {
  return (
    <div className='flex'>
      <SideBar />
      <div className='w-full h-full'>
        <div className='container mx-auto p-2 md:p-6'>
          <Header />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;