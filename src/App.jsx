import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './pages/Home';
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';
import Chats from './pages/Chats';
import Contexts from './contexts/Contexts';

import "./assets/sass/main.scss";

import Navbar from './assets/components/nav/Navbar';

function App() {
  return (
    <Contexts>
      <Router>
        <Routes>
          <Route path='/' element={
            <main style={{ overflowX: "hidden" }}>
              <Navbar />
              <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/about' />
              </Routes>
            </main>
          } />
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
