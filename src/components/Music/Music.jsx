import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Music() {

    const [musicData, setMusicData] = useState([])

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

    useEffect( () => {
        fetchMusics()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-6">
            {musicData && musicData.length > 0 ? (
                musicData.map((music) => (
                    <Link to={`/music/${music._id}`} key={music._id}>
                        <div className="border-[1px] text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                            <div className="relative">
                                <img 
                                    src={music.image} 
                                    alt="Song Thumbnail" 
                                    className="w-full h-40 rounded-lg object-cover"
                                />
                                <div className="absolute -bottom-4 left-4 flex items-center">
                                    <img 
                                        src={music.userId.avatar} 
                                        alt="User Avatar" 
                                        className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                                    />
                                    <p className="ml-3 -mb-6 text-sm font-semibold dark:text-white">{music.userId.name}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h1 className="text-lg font-bold text-gray-900 truncate dark:text-white">{music.songName}</h1>
                                <p className="text-sm text-gray-500 mt-1">Singer: {music.singerName}</p>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Music
