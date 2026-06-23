import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import search from "../../assets/search.png"

function Search() {

    const [searchParams] = useSearchParams()
    const query = searchParams.get('query')
    const [results, setResults] = useState({ videos: [], musics: [] })

    useEffect( () => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`/api/v1/user/search?query=${query}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                })
                setResults(response.data.data)
            } catch (error) {
               console.log(error) 
            }
        }

        if (query) {
            fetchResults()
        }
    }, [query])

    return (
        <div className="p-6">
            {/* Header */}
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white">
                Search Results for: <span className="text-blue-600">{query}</span>
            </h1>

            {/* Results Section */}
            {results.videos.length > 0 || results.musics.length > 0 ? (
                <div>
                    {/* Videos Section */}
                    <section className="mb-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.videos.map((video) => (
                                <Link
                                    key={video._id}
                                    to={`/video/${video._id}`}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden dark:bg-gray-950 dark:border-[1px]"
                                >
                                    <img
                                        src={video.imageUrl}
                                        alt={video.title}
                                        className="w-full h-40 object-cover dark:border-b-[1px]"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-white mt-1 truncate">{video.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Music Section */}
                    <section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.musics.map((music) => (
                                <Link
                                    key={music._id}
                                    to={`/music/${music._id}`}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 overflow-hidden  dark:bg-gray-950 dark:border-[1px]"
                                >
                                    <img
                                        src={music.image}
                                        alt={music.songName}
                                        className="w-full h-40 object-cover dark:border-b-[1px]"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-white">
                                            {music.songName}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 truncate dark:text-white">
                                            Singer: {music.singerName}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            ) : (
                <div className="flex flex-col items-center mt-20">
                    <img
                        src={search} 
                        alt="No Results Found"
                        className="w-64 h-64 object-contain"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mt-6">No Results Found</h2>
                    <p className="text-gray-500 dark:text-white mt-2">Try searching for something else.</p>
                </div>
            )}
        </div>
    )
}

export default Search
