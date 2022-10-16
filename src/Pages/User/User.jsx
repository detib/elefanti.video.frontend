import React from 'react'
import UserProfile from '../../components/pages/user/UserProfile'
import UserLayout from '../../components/shared/layouts/UserLayout'


const User = () => {
  return (
    <UserLayout className='user'>
        <UserProfile />
    </UserLayout>
  )
}

export default User