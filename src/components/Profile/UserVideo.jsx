import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserVideo() {

    const [videos, setVideos] = useState({})

    const getUserVideos = async () => {
        try {
            const response = await axios.get('/api/v1/video/get-user-video',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setVideos(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteVideo = async (videoId) => {
        try {
            const response = await axios.delete(`/api/v1/video/delete-video/${videoId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            getUserVideos()
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getUserVideos()
    }, [])

    return (
        <div className="w-full max-w-6xl mt-5 p-6">
            {/* Your Videos Section */}
            <div className="mb-10">
                <h1 className="flex text-3xl font-extrabold justify-center text-gray-900 dark:text-white mb-6">
                    Your Videos
                </h1>
                {videos && videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {videos.map((video) => (
                            <Link
                                key={video._id}
                                to={`/video/${video._id}`}
                                className="group relative bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img
                                        src={video.imageUrl}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:opacity-90"
                                    />
                                </div>
                                {/* Video Info */}
                                <div className="p-4">
                                    <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                        {video.title}
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                                        {video.desc}
                                    </p>
                                </div>
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-95 flex items-center justify-center transition duration-300">
                                    <div className="text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        ▶️
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <button 
                                        className="mt-3 my-5 mx-10 text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        onClick={ () => handleDeleteVideo(video._id)}    
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 p-10 rounded-lg shadow-md">
                        <p className="text-gray-600 dark:text-gray-400 text-center">
                            You have no videos yet.
                        </p>
                        <Link
                            to="/upload"
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Upload Video
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserVideo
