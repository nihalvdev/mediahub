import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Theme from "../../Theme"

function Users() {

    const [users, setUsers] = useState({})

    useEffect( () => {
        const getUserDetails = async () => {
            try {
                const response = await axios.get('/api/v1/admin/get-all-users',{
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                })
                setUsers(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUserDetails()
    }, [])

    return (
        <div className="w-full max-w-7xl mx-auto mt-10 p-6">
            <div className='relative lg:hidden -top-10 items-center flex justify-center'>
                <Theme/>
            </div>
            {/* User Management Header */}
            <div className="text-center items-center mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    Users
                </h1>
            </div>
            {/* User Cards */}
            {users && users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* User Avatar */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-28 h-28 rounded-full border-[3px] border-blue-500 object-cover shadow-md"
                                />
                            </div>
                            {/* User Information */}
                            <div className="text-center">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {user.email}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Created On: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            {/* View Details Button */}
                            <div className="mt-4 flex justify-center">
                                <Link
                                    to={`/users/${user._id}`}
                                    className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                                >
                                    View Details <span className='font-extrabold text-lg'>&#8594;</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-16">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        No users found. Please wait while we load the data.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Users
