import React from 'react';
import './styles/UserProfile.scss';
import '../../shared/styles/shared.scss';

import ProfileData from './ProfileData';
import ProfileStats from './ProfileStats';
import jwtDecode from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const UserProfile = () => {
  const context = useContext(AuthContext);
  const userData = jwtDecode(context.data.token);

  return (
    <div className='user-profile'>
      <ProfileData profile={userData} />
      <ProfileStats profile={userData} />
    </div>
  );
};

export default UserProfile;
