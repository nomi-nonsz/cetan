import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';
import Chats from './pages/Chats';
import "./assets/sass/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/signin' element={ <RegisterPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/chats' element={ <Chats /> } />
      </Routes>
    </Router>
  )
}

export default App
