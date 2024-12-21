import React, { useEffect, useState, useContext} from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import { UsersContext } from '../utils/UserContext';

const EditUser = () => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const {updateUser} = useContext(UsersContext);

  useEffect(() => {
    getUser(id);
  }, [id]);

  //fetching user data by id to update it
  const getUser = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://reqres.in/api/users/${id}`,{
        headers: {'Authorization': `Bearer ${token}`}
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
      } else {
        setError('Failed to fetch user');
      }
    } catch (err) {
      setError('Error fetching user');
    }
  };

  // updating the user's data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const updatedUser = { ...user, id: Number(id) };
        updateUser(updatedUser);
        navigate('/users');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error updating user');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="mx-auto w-6/12 mt-24 flex flex-col items-center p-8 bg-blue-200 rounded-md shadow-md max-w-md">
      <div>
        <h1 className="text-center text-bold text-3xl p-2 underline">Edit User Details</h1>
      </div>
      <div className="mt-2">
        <form onSubmit={handleUpdate}>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <label className="m-1">First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter First Name"
            className="m-1 mb-3 p-2 rounded-md w-full"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
          <label className="m-1">Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
            className="mt-1 mb-3 p-2 rounded-md w-full"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
          <label className="m-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="mt-1 p-2 rounded-md w-full"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <button className="mt-9 p-2 font-semibold rounded-md w-full bg-blue-300 hover:bg-blue-400">
            Update
          </button>
          <Link to={'/users'}>
            <button className="mt-6 p-2 font-semibold rounded-md w-full bg-blue-300 hover:bg-blue-400">
                Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
