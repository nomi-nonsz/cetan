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

function App() {
  const [user, setUser] = useState({});

  function ProtectedRoute ({ children }) {
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  }
  
  return (
    <AuthContextProvider onWake={setUser}>
      <Router>
        <Routes>
          <Route path='/signin' element={ <RegisterPage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/chats' element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App
