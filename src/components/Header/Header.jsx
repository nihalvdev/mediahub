import React, { useState } from 'react'
import { FaRegUserCircle, FaSearch } from 'react-icons/fa'
import { RiVideoUploadLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"

function Header() {
    const { status, isAdmin, userData } = useSelector( (state) => state.auth)
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [isSearchActive, setIsSearchActive] = useState(false)

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            const searchQuery = query.trim()
            if (searchQuery) {
                navigate(`/search?query=${searchQuery}`)
                setQuery('')
                setIsSearchActive(false)
            }
        }
    }

    return (
        <header className="w-full border-b-[2px] border-gray-200 shadow-md p-4 flex items-center justify-between sticky top-0 z-50 dark:bg-gray-950 dark:text-white">
            {/* Left: Logo or Title */}
            <Link to='/' className={`${isSearchActive ? 'hidden' : 'flex items-center gap-3'} `}>
                <img
                    src={logo}
                    alt="MediaHub Logo"
                    className="h-8 w-8 object-contain rounded-lg"
                />
                <h1 className="text-2xl font-bold text-gray-800 tracking-wide hover:text-blue-500 transition-colors duration-300 dark:text-white">
                    MediaHub
                </h1>
            </Link>

            {/* Center: Search Bar */}
            <div className="relative flex-1 flex justify-center items-center lg:block lg:ml-80">
                {isSearchActive || window.innerWidth >= 1024 ? (
                    <div className="flex items-center w-full lg:w-auto">
                        <FaSearch className="text-gray-600 dark:text-white absolute left-4" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch} // Trigger search on Enter
                            placeholder="Search"
                            className="w-full lg:max-w-sm border-2 border-gray-600 dark:border-white rounded-full pl-10 pr-4 py-2 placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-transparent"
                        />
                        <button
                            onClick={() => {
                                setIsSearchActive(false);
                                setQuery("");
                            }}
                            className="ml-2 text-gray-500 dark:text-white lg:hidden"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsSearchActive(true)}
                        className="text-lg text-gray-600 dark:text-white lg:hidden ml-32"
                    >
                        <FaSearch />
                    </button>
                )}
            </div>

            {/* Right: User and Upload Icons */}
            { status ? ( isAdmin ? (
                        <div className={`flex justify-center items-center ${isSearchActive ? 'hidden' : ''}`}>
                            <Link 
                                to='/signin' 
                                className="flex items-center bg-blue-600 text-white font-bold py-2 px-1 lg:px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                            >
                                <FaRegUserCircle className="mr-2 hidden lg:block" />  {/* Sign-in Icon */}
                                <span className='text-[10px] lg:text-base'>Sign Out</span>
                            </Link>
                        </div>
                    ) : (
                        <div className={`flex flex-row gap-5 ${isSearchActive ? 'hidden' : ''}`}>
                            <div>
                                <Link to='/upload'>
                                    <RiVideoUploadLine className="text-2xl" />
                                </Link>
                            </div>
                            <div className="hidden lg:flex items-center space-x-2">
                                <Link to="/user-profile" className="flex items-center space-x-2">
                                    {/* Avatar */}
                                    <img 
                                        src={userData.avatar} 
                                        alt={userData.name} 
                                        className="h-7 w-7 rounded-full border-2 border-gray-300 object-cover"
                                    />
                                    
                                    {/* User name */}
                                    <h1 className="text-base font-medium ">
                                        {userData.name}
                                    </h1>
                                </Link>
                            </div>
                        </div> 
                    )       
                ) : (
                    <div className="flex justify-center items-center">
                        <Link 
                            to='/signin' 
                            className="flex items-center bg-blue-600 text-white font-bold py-2 px-1 lg:px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            <FaRegUserCircle className="mr-2 hidden lg:block" />  {/* Sign-in Icon */}
                            <span className='text-[10px] lg:text-base'>Sign In</span>
                        </Link>
                    </div>
                )}
        </header>
    )
}

export default Header
