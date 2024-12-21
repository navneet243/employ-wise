import React, { createContext, useState, useEffect } from 'react';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error,setError] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getUsers(currentPage);
    }, [currentPage]);

    // fetches the user list
    const getUsers = async (page) => {
        try {
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.data);
                setCurrentPage(data.page);
                setTotalPages(data.total_pages);
            }
        } catch (err) {
            setError(`Error fetching users: ${err.message}`);
        }
    };

    // Update user
    const updateUser = (updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
    };
  
    // Delete user
    const deleteUser = (id) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

  return (
    <UsersContext.Provider value={{ users, totalPages, currentPage, setCurrentPage, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};
