import React, { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login';
import Chats from './pages/Chats';
import "./assets/sass/main.scss";
import { ChatContextProvider } from './contexts/ChatContext';

function App() {
  const [user, setUser] = useState({});
  
  return (
    <AuthContextProvider onWake={setUser}>
    <ChatContextProvider>
      <Router>
        <Routes>
          <Route path='/signup' element={ <RegisterPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/chats' element={
              <Chats />
          } />
        </Routes>
      </Router>
    </ChatContextProvider>
    </AuthContextProvider>
  )
}

export default App
