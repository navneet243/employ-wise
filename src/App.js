import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Users from './components/Users';
import EditUsers from './components/EditUsers';
import ProtectedRoute from './utils/ProtectedRoute';

function App() { 
  
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/users' element={<ProtectedRoute><Users/></ProtectedRoute>} />
          <Route path='/edit-user/:id' element={<ProtectedRoute><EditUsers/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
