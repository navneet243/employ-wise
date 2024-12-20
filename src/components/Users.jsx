import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage]);

    const getUsers = async (page) => {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
                setCurrentPage(data.page);
                setTotalPages(data.total_pages);
                // console.log(data.data);
            }
        } catch (err) {
            setError('Error fetching users', err);
        }
    };

    const handleEdit = (id) => {
        Navigate(`/edit-user/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user.id !== id));
                alert('User deleted successfully');
            }
        } catch (err) {
        setError('Error deleting user', err);
        }
    }
    
  return (
    <div className='mx-auto w-7/12 mt-10 p-8 rounded-md shadow-md'>
        {error && <p className='text-center font-bold text-red-400 mb-5 '>{error}</p>}
        
        <div className='rounded shadow'>
            <h1 className='text-center text-bold text-3xl p-5 mb-3'>Users List</h1>
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
                            <h1></h1>
                            <h1>{user.email}</h1>
                            <button 
                                className='py-1 px-1 mt-2 bg-gray-200 rounded-lg'
                                onClick={() => handleEdit(user.id)}
                            >
                                Edit
                            </button>
                            <button 
                                className='py-1 px-1 mt-2 ml-3 bg-gray-200 rounded-lg'
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