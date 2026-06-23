import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserMusic() {

    const [musics, setMusics] = useState({})

    const getUserMusic = async () => {
        try {
            const response = await axios.get('/api/v1/music/get-user-music',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setMusics(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteMusic = async (musicId) => {
        try {
            const response = await axios.delete(`/api/v1/music/delete-music/${musicId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            getUserMusic()
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getUserMusic()
    }, [])

    return (
        <div className="w-full max-w-6xl mt-5 p-6">
            {/* Your Musics Section */}
            <div className="mb-10">
                <h1 className="flex justify-center text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Your Musics
                </h1>
                {musics && musics.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {musics.map((music) => (
                            <Link
                                key={music._id}
                                to={`/music/${music._id}`}
                                className="group relative bg-gray-50 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-950 dark:border-2 dark:border-gray-200"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img
                                        src={music.image}
                                        alt={music.songName}
                                        className="w-full h-full object-cover group-hover:opacity-90"
                                    />
                                </div>
                                {/* Music Info */}
                                <div className="p-4">
                                    <h1 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                                        {music.songName}
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                                        {music.singerName}
                                    </p>
                                </div>
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                                    <div className="text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        🎵
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <button 
                                        className="mt-3 my-5 mx-10 text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        onClick={ () => handleDeleteMusic(music._id)}    
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
                            You have no music yet.
                        </p>
                        <Link
                            to="/upload"
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300"
                        >
                            Upload Music
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserMusic
