import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDetails() {
    const { id } = useParams()

    const [userDetails, setUserDetails] = useState({})
    const navigate = useNavigate()

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/api/v1/admin/get-users-details/${id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setUserDetails(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMedia = async (id, type) => {
        try {
            const response = await axios.delete(`/api/v1/admin/media/${id}?type=${type}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            toast.success(response.data.message)
            getUserDetails()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`/api/v1/admin/delete-user/${id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            navigate('/users')
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getUserDetails()
    }, [])

    return (
        <div className="mb-16 p-4 rounded-lg shadow-lg space-y-8">
            {/* User Information */}
            <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <img
                    src={userDetails.user?.avatar || 'default-avatar.png'}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                    <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Name: {userDetails.user?.name}</h1>
                    <p className="text-sm text-gray-500">ID: {id}</p>
                    <p className="text-sm text-gray-500">Email: {userDetails.user?.email}</p>
                    <p className="text-sm text-gray-500">
                        Created: {new Date(userDetails.user?.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Section Component */}
            {[
                { title: 'Videos', data: userDetails.videos, type: 'video', showDelete: true },
                { title: 'Musics', data: userDetails.musics, type: 'music', showDelete: true },
                { title: 'Liked Videos', data: userDetails.likedVideos, type: 'video', showDelete: false },
                { title: 'Disliked Videos', data: userDetails.dislikedVideo, type: 'video', showDelete: false },
                { title: 'Liked Musics', data: userDetails.likedMusic, type: 'music', showDelete: false },
                { title: 'Disliked Musics', data: userDetails.dislikedMusic, type: 'music', showDelete: false },
            ].map(({ title, data, type, showDelete }) => (
                <Link key={title}>
                    <h1 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4 mt-5 dark:text-white">{title}:</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-950 dark:border-[1px]"
                                >
                                    <Link to={`/${type}/${item._id}`}>
                                        <img
                                            src={item.imageUrl || item.image}
                                            alt={`${type} Thumbnail`}
                                            className="w-full h-32 object-cover rounded-md mb-3"
                                        />
                                    </Link>
                                    <h2 className="text-lg font-medium text-gray-700 dark:text-white truncate">
                                        {type === 'video' ? `Title: ${item.title}` : `Song: ${item.songName}`}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-white truncate">
                                        {type === 'video'
                                            ? `Description: ${item.desc}`
                                            : `Singer: ${item.singerName}`}
                                    </p>
                                    <p className="text-sm text-gray-400 dark:text-white mt-2">ID: {item._id}</p>
                                    {showDelete && (
                                        <button 
                                            className="mt-3 text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                            onClick={ () => deleteMedia(item._id, type)}    
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 dark:text-white">No {title.toLowerCase()} found.</p>
                        )}
                    </div>
                </Link>
            ))}

            <div className='flex justify-center items-center'>
                <button
                    className={`mt-12 mb-10 flex items-center gap-3 px-8 py-3 bg-red-500 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300`}
                    onClick={handleDeleteUser}
                >
                    <FaRegUserCircle className="text-2xl" />
                    Delete User
                </button>
            </div>

            <ToastContainer/>
        </div>
    )
}

export default UserDetails



