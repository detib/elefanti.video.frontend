import React from 'react';
import LoginForm from '../../../components/pages/login/LoginForm';
import UserLayout from '../../../components/shared/layouts/UserLayout';

const Login = () => {
  return (
    <UserLayout className='login'>
      <LoginForm />
    </UserLayout>
  );
};

export default Login;
