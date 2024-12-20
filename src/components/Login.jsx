import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

const Login = ({setIsLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useContext(AuthContext);

  const Navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and Password are required');
      return false;
    }
    return true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    if(!validateForm()) return;

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        Navigate('/users');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid Credentails');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className='mx-auto w-6/12 mt-24 flex flex-col items-center p-8 bg-blue-200 rounded-md shadow-md max-w-md'>   
        <div>
            <h1 className='text-center text-bold text-3xl p-2'>Login</h1>
        </div>
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='Enter Email'
                    className='mt-5 p-2 rounded-md w-full'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='mt-3 p-2 rounded-md w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <button className='mt-9 p-2 font-semibold rounded-md w-full bg-blue-300 hover:bg-blue-400'>Login</button>
            </form>
        </div>
    </div>
  );
}

export default Login;