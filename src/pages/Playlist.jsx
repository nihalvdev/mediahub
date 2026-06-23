import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Playlist() {

    const [playlists, setPlaylists] = useState([])
    const [newPlaylistName, setNewPlaylistName] = useState('')
    const [isAddingPlaylist, setIsAddingPlaylist] = useState(false)

    useEffect( () => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('/api/v1/playlist/get-user-all-playlist', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                })

                setPlaylists(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchPlaylists()
    }, [])

    const addToPlaylist = async () => {
        if (!newPlaylistName.trim()) {
            alert('Playlist name cannot be empty')
            return
        }

        try {
            const response = await axios.post('/api/v1/playlist/create-playlist', {
                name: newPlaylistName,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })

            setPlaylists( (prev) => [...prev, response.data.data])
            setNewPlaylistName('')
            setIsAddingPlaylist(false)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen dark:bg-gray-950 dark:text-white mb-16">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">🎵 My Playlists</h1>
    
          {/* Add New Playlist Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsAddingPlaylist(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 focus:outline-none"
            >
              ➕ Add New Playlist
            </button>
          </div>
    
          {/* Add New Playlist Form */}
          {isAddingPlaylist && (
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 shadow-md rounded flex items-center space-x-4">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  placeholder="Enter playlist name"
                  className="px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                <button
                  onClick={addToPlaylist}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsAddingPlaylist(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
    
          {/* Playlist Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {playlists.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-white col-span-full">No playlists found.</p>
            ) : (
              playlists.map((playlist) => (
                <div
                  key={playlist._id}
                  className="bg-white shadow-lg rounded overflow-hidden transform hover:scale-100 transition-transform dark:bg-gray-950 dark:border-2 dark:border-gray-200"
                >
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{playlist.name}</h2>
                    <p className="text-gray-500 dark:text-white text-sm mb-4">
                      Created on: {new Date(playlist.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 px-4 pb-4">
                    {playlist.items.map((item) => (
                      <Link
                        to={`/${item.type}/${item.itemId}`}
                        key={item._id}
                        className="group block rounded overflow-hidden shadow-md hover:shadow-lg dark:border-[1px]"
                      >
                        <img
                          src={item.type === "video" ? item.details.imageUrl : item.details.image}
                          alt={item.type === "video" ? "Video Thumbnail" : "Song Thumbnail"}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2">
                          <h3 className="text-gray-800 dark:text-white font-medium group-hover:text-blue-600 transition-colors truncate">
                            {item.type === "video" ? item.details.title : item.details.songName}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
    )
}

export default Playlist
