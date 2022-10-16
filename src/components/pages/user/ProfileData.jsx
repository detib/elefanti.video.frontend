import React, { useContext } from 'react';
import './styles/ProfileData.scss';
import '../../shared/styles/shared.scss';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileData = ({ profile }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('auth-token');
    context.setData({
      token: null,
      isLoggedIn: false,
    });
    navigate('/');
  };

  return (
    <div className='profile-data flex-col'>
      <div className='data-field flex-col'>
        <p className='data-field-desc'>Username: </p>
        <p className='data-field-content'>{profile.Username}</p>
      </div>
      <div className='data-field flex-col'>
        <p className='data-field-desc'>Name: </p>
        <p className='data-field-content'>{profile.Name}</p>
      </div>
      <div className='data-field flex-col'>
        <p className='data-field-desc'>Surname: </p>
        <p className='data-field-content'>{profile.Surname}</p>
      </div>
      <div className='data-field flex-col'>
        <p className='data-field-desc'>Role: </p>
        <p className='data-field-content'>{profile['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}</p>
      </div>
      <div onClick={logout} className='logout-button'>
        <p>Logout</p>
      </div>
    </div>
  );
};

export default ProfileData;
