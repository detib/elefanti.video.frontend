import React from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '../../components/pages/videoview/VideoPlayer'
import UserLayout from '../../components/shared/layouts/UserLayout'

const VideoView = () => {
  return (
    <UserLayout className='watch'>
      <VideoPlayer />
    </UserLayout>
  )
}

export default VideoView