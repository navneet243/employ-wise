import React ,{useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';

function App() { 
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to='users'/> :<Login/>} />
        <Route path='/users' element={<Users/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
