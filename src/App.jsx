import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';
import Chats from './pages/Chats';
import Contexts from './contexts/Contexts';

import "./assets/sass/main.scss";

function App() {
  return (
    <Contexts>
      <Router>
        <Routes>
          <Route path='/signup' element={ <RegisterPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/chats' element={
              <Chats />
          } />
        </Routes>
      </Router>
    </Contexts>
  )
}

export default App
