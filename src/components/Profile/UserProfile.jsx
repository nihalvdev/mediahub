import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { logout } from '../../store/authSlice'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Theme from '../../Theme'

function UserProfile() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector( (state) => state.auth )

    const [videos, setVideos] = useState({})
    const [musics, setMusics] = useState({})

    const handleLogout = async () => {
        setLoading(true)

        try {
            localStorage.clear()
            dispatch(logout())
            await axios.post('/api/v1/user/user-logout',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            navigate('/signin')
       }catch (error) {
            console.error(error)
       }finally{
            setLoading(false)
       }
    }

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
        getUserVideos()
        getUserMusic()
    }, [])

    return (
        <div className="flex flex-col items-center w-full px-4 md:px-0 my-8">
            {/* User Details Section */}
            <div className="bg-gray-100 dark:bg-gray-800 w-full max-w-4xl p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    {/* Profile Image */}
                    <img
                        src={userData?.avatar}
                        alt="User Avatar"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-lg"
                    />
                    {/* User Info */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {userData?.name}
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
                            {userData?.email}
                        </p>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2">
                            ID: {userData?._id}
                        </p>
                    </div>
                </div>
             </div>

            {/* Navigation Links */}
            <div className="w-full max-w-4xl mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:hidden">
                <Link
                    to="/your-videos"
                    className="flex flex-col items-center justify-center gap-3 bg-blue-500 text-white py-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-xl"
                >
                    <span className="text-3xl font-semibold">🎥</span>
                    <span className="text-base font-medium">Your Videos</span>
                </Link>

                <Link
                    to="/your-musics"
                    className="flex flex-col items-center justify-center gap-3 bg-green-500 text-white py-6 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 hover:shadow-xl"
                >
                    <span className="text-3xl font-semibold">🎵</span>
                    <span className="text-base font-medium">Your Musics</span>
                </Link>

                <Link
                    to="/likes"
                    className="flex flex-col items-center justify-center gap-3 bg-yellow-500 text-white py-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-all duration-300 hover:shadow-xl"
                >
                    <span className="text-3xl font-semibold">👍</span>
                    <span className="text-base font-medium">Liked Videos</span>
                </Link>

                <Link
                    to="/dislikes"
                    className="flex flex-col items-center justify-center gap-3 bg-pink-500 text-white py-6 rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-300 hover:shadow-xl"
                >
                    <span className="text-3xl font-semibold">👎</span>
                    <span className="text-base font-medium">Dislikes Videos</span>
                </Link>

                <Link
                    to="/playlist"
                    className="flex flex-col items-center justify-center gap-3 bg-purple-500 text-white py-6 rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300 hover:shadow-xl"
                >
                    <span className="text-3xl font-semibold">📂</span>
                    <span className="text-base font-medium">Playlists</span>
                </Link>

                <div
                    className="flex flex-col items-center justify-center gap-3 bg-purple-500 text-white py-6 rounded-lg shadow-lg hover:bg-purple-600 transition-all duration-300 hover:shadow-xl"
                >
                    <Theme/>
                </div>
            </div>

            {/* Large Screen Video and Music Section */}
            <div className="hidden lg:block w-full max-w-4xl mt-12">
                {/* Your Videos Section */}
                <div className="mb-10">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Your Videos
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {videos && videos.length > 0 ? (
                        videos.map((video) => (
                            <div
                                key={video._id}
                                to={`/video/${video._id}`}
                                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={video.imageUrl}
                                    alt={video.title}
                                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                                />
                                <h1 className="mt-3 text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {video.title}
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {video.desc}
                                </p>
                                <div className='flex justify-end'>
                                    <button 
                                        className="mt-3 text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        onClick={ () => handleDeleteVideo(video._id)}    
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            You have no videos.{' '}
                            <Link to="/upload" className="text-blue-500 hover:underline">
                                Upload Video
                            </Link>
                        </p>
                        )}
                    </div>
                </div>

                {/* Your Musics Section */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Your Musics
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {musics && musics.length > 0 ? (
                        musics.map((music) => (
                            <div
                                key={music._id}
                                to={`/music/${music._id}`}
                                className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={music.image}
                                    alt={music.songName}
                                    className="w-full h-32 md:h-40 object-cover rounded-lg"
                                />
                                <h1 className="mt-3 text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {music.songName}
                                </h1>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {music.singerName}
                                </p>
                                <div className='flex justify-end'>
                                    <button 
                                        className="mt-3 text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        onClick={ () => handleDeleteMusic(music._id)}    
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            You have no music.{' '}
                            <Link to="/upload" className="text-blue-500 hover:underline">
                                Upload Music
                            </Link>
                        </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <button
                className={`mt-12 mb-10 flex items-center gap-3 px-8 py-3 bg-red-500 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
                onClick={handleLogout}
            >
                <FiLogOut className="text-2xl" />
                {loading ? 'Signing out...' : 'Sign Out'}
            </button>
            
            <ToastContainer/>
        </div>
    )
}

export default UserProfile
