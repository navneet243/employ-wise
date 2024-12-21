import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UsersContext } from '../utils/UserContext';
import { AuthContext } from '../utils/AuthContext';

const Users = () => {
    const [error, setError] = useState('');
    const {users, currentPage, setCurrentPage, totalPages, deleteUser} = useContext(UsersContext);
    const {token, logout} = useContext(AuthContext);
    const Navigate = useNavigate();

    // handle the user Edit, redirects to Edit-user page
    const handleEdit = (id) => {
        Navigate(`/edit-user/${id}`);
    }

    // delete the user from the list
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                deleteUser(id);
            }
        } catch (err) {
            setError(`Error deleting user: ${err.message}`);
        }
    }

    // Logout the user when Logout button is clicked
    const logoutSubmit =() => {
        logout();
        Navigate('/')
    }
    
  return (
    <div className='mx-auto w-7/12 mt-10 p-8 rounded-md shadow-md'>
        {error && <p className='text-center font-bold text-red-400 mb-5 '>{error}</p>}
        <div className='rounded shadow flex flex-wrap justify-between'>
            <h1 className='m-5 text-3xl font-semibold'>Users List</h1>
            {token && <button onClick={logoutSubmit} className='m-5 bg-gray-200 p-2 rounded-lg hover:bg-slate-300'>Logout</button>}
        </div>
        <div className='mt-2'>
            {
                users.map((user) => (
                    <div key={user.id} className='flex flex-wrap rounded-md shadow-md border-blue-100'>
                        <div className='w-24 h-24 m-2'>
                            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`}/>
                        </div>
                        <div className='h-24 m-2'>
                            <h1 className='text-base'>{user.first_name} {user.last_name}</h1>
                            <h1 className='text-sm sm:text-base'>{user.email}</h1>
                            <button 
                                className='py-1 px-1 mt-2 bg-gray-200 rounded-lg hover:bg-slate-300'
                                onClick={() => handleEdit(user.id)}
                            >
                                Edit
                            </button>
                            <button 
                                className='py-1 px-1 mt-2 ml-3 bg-gray-200 rounded-lg hover:bg-slate-300'
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className='mt-5 mb-1' >
            <div className='flex justify-center'>
                <button 
                    disabled={currentPage===1}
                    onClick={()=>setCurrentPage(currentPage-1)}
                    className='hover:underline p-1'
                >
                    Prev
                </button>
                <p className='mx-3 p-1 mt-1 text-sm font-semibold'>Page {currentPage} of {totalPages}</p>
                <button 
                    disabled={currentPage===totalPages} 
                    onClick={()=>setCurrentPage(currentPage+1)} 
                    className='hover:underline p-1'
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}

export default Users