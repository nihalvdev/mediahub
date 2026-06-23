import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Video() {

    const [videoData, setVideoData] = useState([])

    const fetchVideos = async () => {
        try {
            const response = await axios.get('/api/v1/video/get-all-videos',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setVideoData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        fetchVideos()
    }, [])

    return (
        <div className="min-h-screen mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-6">
                {videoData && videoData.length > 0 ? (
                    videoData.map((video) => (
                        <Link to={`/video/${video._id}`} key={video._id}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200 dark:bg-gray-950 dark:text-white dark:border-2 dark:border-gray-200">
                                {/* Video Thumbnail */}
                                <div className="relative dark:border-b-2">
                                    <img
                                        src={video.imageUrl}
                                        alt="Video Thumbnail"
                                        className="w-full h-48 object-cover"
                                    />
                                </div>

                                {/* Video Details */}
                                <div className="p-4">
                                    <div className="flex items-start space-x-3 mb-2">
                                        <img
                                            src={video.userId.avatar}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full border border-gray-300"
                                        />
                                        <div>
                                            <h1 className="text-lg font-semibold text-gray-900 truncate dark:text-white">
                                                {video.title}
                                            </h1>
                                            <p className="text-sm text-gray-500 dark:text-white">
                                                {video.userId.name}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Video Description */}
                                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 dark:text-white">
                                        {video.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No videos available</p>
                )}
            </div>
        </div>
    )
}

export default Video
