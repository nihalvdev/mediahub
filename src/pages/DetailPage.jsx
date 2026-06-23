import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { useSelector } from 'react-redux';

function DetailPage() {

    const { id, type } = useParams()
    const [data, setData] = useState(null)
    const [videoData, setVideoData] = useState([])
    const [musicData, setMusicData] = useState([])
    const [commentData, setCommentData] = useState([])
    const [combinedData, setCombinedData] = useState([])
    const [description, setDescription] = useState('')
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    const { userData, isAdmin, status } = useSelector( (state) => state.auth)

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

    const fetchDetails = async () => {
        try {
            if (type === 'video') {
                const response = await axios.get(`/api/v1/video/get-video-details/${id}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                })
                setData(response.data.data)
            } else {
                const response = await axios.get(`/api/v1/music/get-music-details/${id}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                })
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async (videoId) => {
        try {
            const data = { description, videoId }
            const response = await axios.post('/api/v1/comment/add-comment', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            if (response.status === 200) {
                toast.success("Comment Added Successfully!!!")
                getAllComment()
            }
            setDescription('')
        } catch (error) {
            console.log(error)
        }
    }

    const getAllComment = async () => {
        try {
            const dataId = data._id
            const response = await axios.get(`/api/v1/comment/get-comment/${dataId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setCommentData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async () => {
        try {
            await axios.patch(`/api/v1/${type}/like/${data._id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            fetchDetails()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislike = async () => {
        try {
            await axios.patch(`/api/v1/${type}/dislike/${data._id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            fetchDetails()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUserPlaylists = async () => {
        try {
            const response = await axios.get('/api/v1/playlist/get-user-playlist',{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
            setPlaylists(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveToPlaylist = async () => {
        if (!selectedPlaylist) {
            toast.error("Please select a playlist")
            return
        }

        try {
            const response = await axios.post('/api/v1/playlist/save-to-playlist', {
                playlistId: selectedPlaylist,
                itemId: data._id,
                type: type
            },{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })

            if (response.status === 200) {
                toast.success("Saved to Playlist!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreatePlaylist = async () => {
        const playlistName = prompt("Enter a name for your new playlist:")

        if (!playlistName) {
            alert("Playlist name cannot be empty.")
            return
        }

        try {
            const response = await axios.post('/api/v1/playlist/create-playlist', {
                name: playlistName
            },{
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })

            if (response.status === 200) {
                const newPlaylist = response.data.data

                setPlaylists( (prevPlaylist) => [...prevPlaylist, newPlaylist])
                setSelectedPlaylist(newPlaylist._id)

                toast.success('Playlist Created Successfully')
            } else {
                toast.error("Failed to create playlist.")
            }

        } catch (error) {
            console.log(error)
            toast.error("An error occurred while creating the playlist.")
        }
    }

    useEffect( () => {
        fetchVideos()
        fetchMusics()
        fetchDetails()
    }, [id, type])

    useEffect(() => {
        if (data && data._id) {
            getAllComment();
            isAdmin ? null : fetchUserPlaylists()
        }
    }, [data]);

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

    if (!data) return <p>Loading...</p>;

    return (
        <div className="flex flex-col lg:flex-row lg:space-x-6 p-6 lg:p-6 min-h-screen">
            {/* Main Content - Video/Audio and Comments */}
            <div className="w-full lg:w-2/3">
                {/* Video or Audio Section */}
                <div className="bg-black rounded-lg overflow-hidden h-64 md:h-96">
                    {type === 'video' ? (
                        <video
                            key={data.videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <source src={data.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <video
                            key={data.songFile}
                            controls
                            autoPlay
                            className="w-full h-full"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <source src={data.songFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
        
                {/* Title, Description, Like, Dislike, Subscribe, and Save to Playlist Section */}
                <div className="bg-white rounded-lg mt-6 p-6 shadow-lg flex flex-col space-y-4 dark:bg-gray-950 dark:border-[1px]">
                    {/* Title Section */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {type === 'video' ? data.title : data.songName} 
                        </h1>
                        <p className="text-gray-600 dark:text-white text-sm mt-1">
                            {type === 'video' ? data.desc : `Singer: ${data.singerName} | ${data.desc}`}
                        </p>
                    </div>

                    {/* User Info and Subscribe Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={data.userId.avatar || "/default-avatar.jpg"} 
                                alt="Avatar" 
                                className="h-10 w-10 rounded-full border border-gray-300"
                            />
                            <h1 className="font-semibold text-gray-800 dark:text-white">@{data.userId.name}</h1>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <button 
                                onClick={handleLike}
                                disabled={!userData || isAdmin}
                                className={`flex items-center space-x-1 text-gray-600 dark:text-white dark:hover:text-blue-500 hover:text-blue-500 transition duration-150 ease-in-out ${userData ? '' : 'cursor-not-allowed' } ${isAdmin ? 'cursor-not-allowed' : ''}`}
                            >
                                <MdThumbUp className="text-xl"/>
                                <span className="lg:text-sm text-xs font-medium">Like {data.likes.length || 0}</span>
                            </button>

                            <button 
                                onClick={handleDislike}
                                disabled={!userData || isAdmin}
                                className={`flex items-center space-x-1 text-gray-600 dark:text-white dark:hover:text-red-500 hover:text-red-500 transition duration-150 ease-in-out ${userData ? '' : 'cursor-not-allowed'} ${isAdmin ? 'cursor-not-allowed' : ''}`}
                            >
                                <MdThumbDown className="text-xl"/>
                                <span className="lg:text-sm text-xs font-medium">Dislike {data.dislikes.length || 0}</span>
                            </button>
                        </div>
                    </div>

                    {/* Save to Playlist */}
                    {isAdmin ? ( null ) : (
                        <div className="flex items-center space-x-4 justify-end text-gray-500">
                            <div className={`flex flex-row gap-2 items-center space-x-2 ${isAdmin || !userData ? 'hidden' : ''}`}>
                                <div className='flex flex-col lg:flex-row gap-2 justify-center items-center'>
                                    <div className='flex flex-row gap-2'>
                                        <select
                                            value={selectedPlaylist}
                                            onChange={(e) => setSelectedPlaylist(e.target.value)}
                                            className="px-3 py-2 rounded border border-gray-300"
                                            disabled={!userData || playlists.length === 0}
                                        >
                                            {playlists.length === 0 ? (
                                                <option value="">Create a Playlist</option>
                                            ) : (
                                                <>
                                                    <option value="">Select Playlist</option>
                                                    {playlists.map((playlist) => (
                                                        <option key={playlist._id} value={playlist._id}>
                                                            {playlist.name}
                                                        </option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                        
                                        {playlists.length === 0 && (
                                            <button
                                                onClick={handleCreatePlaylist}  
                                                className="bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-full hover:bg-blue-600 transition duration-150 ease-in-out "
                                            >
                                                Create Playlist
                                            </button>
                                        )}

                                    </div>
                                    <div>
                                        <button
                                            onClick={handleSaveToPlaylist}
                                            disabled={!userData || !selectedPlaylist || playlists.length === 0}
                                            className="bg-blue-500 text-white font-medium px-3 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-700 transition duration-150 ease-in-out text-sm lg:text-base"
                                        >
                                            Save to Playlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Comment Section */}
                <div className={`bg-white dark:bg-gray-950 dark:border-[1px] rounded-lg mt-6 p-6 max-h-[50vh] overflow-y-auto shadow-md overflow-hidden lg:max-h-[60vh]`}>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Comments</h2>
                    <div className="space-y-3">
                        {/* Comment input field with improved styling */}
                        <div className={`flex items-center space-x-3 ${isAdmin || !userData ? 'hidden' : ''}`}>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-grow p-3 border dark:bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                onClick={() => handleComment(data._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            >
                                Post
                            </button>
                        </div>
        
                        {/* Display Comments */}
                        <div className="space-y-4 mt-6">
                            {commentData && commentData.length > 0 ? (
                                commentData.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="bg-white dark:bg-gray-950 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
                                    >
                                        <div className="flex items-center space-x-3 mb-2">
                                            <img
                                                src={comment.userId?.avatar || "/default-avatar.jpg"} // fallback image if avatar is missing
                                                alt="Avatar"
                                                className="w-10 h-10 rounded-full border-2 border-blue-500"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">@{comment.userId?.name || "Anonymous"}</p>
                                                <p className="text-xs text-gray-500 dark:text-white">{new Date(comment.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 text-sm leading-relaxed dark:text-white">{comment.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">No comments for this content...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        
            {/* Right Side - Suggested Content */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0 h-auto">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 dark:text-white">Suggested Content</h2>
                <div className="space-y-4 h-auto mb-10">
                    {combinedData && combinedData.length > 0 ? (
                        combinedData.map((item, index) => (
                            <Link
                                to={`/${item.type}/${item._id}`}
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex dark:bg-gray-950 dark:border-[1px]"
                            >
                                <img
                                    src={item.type === 'video' ? item.imageUrl : item.image}
                                    alt={item.type === 'video' ? 'Video Thumbnail' : 'Song Thumbnail'}
                                    className="w-32 h-20 object-cover"
                                />
                                <div className="p-3 w-full">
                                    <h1 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                        {item.type === 'video' ? item.title : item.songName}
                                    </h1>
                                    <p className="text-xs text-gray-500 dark:text-white truncate">
                                        {item.userId?.name}
                                    </p>
                                    <p className="text-xs text-gray-700 dark:text-white line-clamp-2">
                                        {item.type === 'video' ? item.desc : `Singer: ${item.singerName}`}
                                    </p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">No content available</p>
                    )}
                </div>
            </div>

            <ToastContainer/>
        </div>
    )
}

export default DetailPage
