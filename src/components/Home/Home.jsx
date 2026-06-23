import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {

    const [videoData, setVideoData] = useState([])
    const [musicData, setMusicData] = useState([])
    const [combinedData, setCombinedData] = useState([])

    const fetchMusics = async () => {
        try {
            const response = await axios.get('/api/v1/music/get-all-musics',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setMusicData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

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
        fetchMusics()
    }, [])

    useEffect(() => {
        const tempCombined = []
        let videoIndex = 0
        let musicIndex = 0

        // Alternate between videos and music
        while (videoIndex < videoData.length || musicIndex < musicData.length) {
            if (videoIndex < videoData.length) {
                tempCombined.push({ ...videoData[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (videoIndex < videoData.length) {
                tempCombined.push({ ...videoData[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (videoIndex < videoData.length) {
                tempCombined.push({ ...videoData[videoIndex], type: 'video' })
                videoIndex += 1
            }
            if (musicIndex < musicData.length) {
                tempCombined.push({ ...musicData[musicIndex], type: 'music' })
                musicIndex += 1
            }
        }

        setCombinedData(tempCombined)
    }, [videoData, musicData])

    return (
        <div className='dark:bg-gray-950 dark:text-white'>
            <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-6">
                {combinedData && combinedData.length > 0 ? (
                    combinedData.map((item, index) => (
                        <Link
                            to={`/${item.type}/${item._id}`}
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-950 dark:text-white dark:border-2 dark:border-gray-200"
                        >
                            <div className="relative dark:border-b-2 dark:border-gray-200">
                                <img
                                    src={item.type === 'video' ? item.imageUrl : item.image}
                                    alt={item.type === 'video' ? 'Video Thumbnail' : 'Song Thumbnail'}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-start space-x-3 mb-1">
                                    <img
                                        src={item.userId.avatar || <FaRegUserCircle />}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full border border-gray-300"
                                    />
                                    <div>
                                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                            {item.type === 'video' ? item.title : item.songName}
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-white">{item.userId.name}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-sm mb-4 line-clamp-3 dark:text-white">
                                    {item.type === 'video' ? item.desc : `Singer: ${item.singerName}`}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-white">Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Home
