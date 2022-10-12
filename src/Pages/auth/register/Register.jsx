import React from 'react'
import SignUpForm from '../../../components/pages/register/SignUp'
import UserLayout from '../../../components/shared/layouts/UserLayout'


const Register = () => {
  return (
    <UserLayout className='register'>
        <SignUpForm />
    </UserLayout>
  )
}

export default Register