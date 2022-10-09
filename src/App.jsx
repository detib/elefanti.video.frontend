import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.scss';
import SignUp from './components/pages/signup/SignUp';
import SignIn from './components/pages/signIn/SignIn';
import VideoView from './pages/Videoview/VideoView';
import Home from './pages/Home/Home';
import About from './pages/About/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/watch' element={<VideoView />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
