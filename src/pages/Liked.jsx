import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

function Liked() {

    const [likedVideo, setLikedVideo] = useState({})
    const [likedMusic, setLikedMusic] = useState({})
    const [combinedData, setCombinedData] = useState([])
    const navigate = useNavigate()

    const getlikedVideo = async () => {
        try {
            const response = await axios.get('/api/v1/video/get-liked-video',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setLikedVideo(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getLikedMusic = async () => {
        try {
            const response = await axios.get('/api/v1/music/get-liked-music',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setLikedMusic(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getlikedVideo()
        getLikedMusic()
    }, [])

    useEffect( () => {
        const tempCombined = []
        let videoIndex = 0
        let musicIndex = 0

        while (videoIndex < likedVideo.length || musicIndex < musicIndex.length ) {
            if (videoIndex < likedVideo.length) {
                tempCombined.push({ ...likedVideo[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (videoIndex < likedVideo.length) {
                tempCombined.push({ ...likedVideo[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (videoIndex < likedVideo.length) {
                tempCombined.push({ ...likedVideo[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (musicIndex < likedMusic.length) {
                tempCombined.push({ ...likedMusic[musicIndex], type: 'music' })
                musicIndex += 1
            }
        }

        setCombinedData(tempCombined)
    }, [likedMusic, likedVideo])

    return (
        <div className="min-h-screen py-8 pb-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Liked Videos & Music</h1>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {combinedData && combinedData.length > 0 ? (
                    combinedData.map((data) => (
                        <Link
                            key={data._id}
                            to={`/${data.type}/${data._id}`}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-100 dark:bg-gray-950 dark:border-2 dark:border-gray-200"
                        >
                            <div className="relative">
                                <img
                                    src={data.type === 'video' ? data.imageUrl : data.image}
                                    alt={data.type === 'video' ? 'Video Thumbnail' : 'Song Thumbnail'}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded-md text-xs font-semibold text-gray-700">
                                    {data.type === 'video' ? 'Video' : 'Music'}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                                        {data.userId.avatar ? (
                                            <img src={data.userId.avatar} alt="Avatar" className="w-full h-full" />
                                        ) : (
                                            <FaRegUserCircle className="text-gray-400 w-full h-full" />
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                            {data.type === 'video' ? data.title : data.songName}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-white">{data.userId.name}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-white text-sm line-clamp-3">
                                    {data.type === 'video' ? data.desc : `Singer: ${data.singerName}`}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No liked content available.</p>
                )}
            </div>
        </div>
    )
}

export default Liked
