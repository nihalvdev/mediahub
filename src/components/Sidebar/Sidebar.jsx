import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { GiMusicalNotes } from 'react-icons/gi'
import { FaFilm, FaList, FaNewspaper } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AdminSidebar from './AdminSidebar'
import UserSidebar from './UserSidebar'

function Sidebar() {

    const { status, isAdmin } = useSelector( (state) => state.auth)

    return (
        <nav className="h-full w-full p-4 border-t-2 lg:border-r-[2px] lg:border-t-0 border-gray-300 flex flex-col gap-4 overflow-y-auto dark:bg-gray-950 dark:text-white">
            <ul className="space-y-4">
                <li>
                    <NavLink 
                        to="/" 
                        className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                    >
                        <div className='flex flex-row gap-3'>
                            <IoHomeOutline className='text-lg'/> 
                            <span className='text-sm'>Home</span>
                        </div>
                    </NavLink>
                </li>

                { status ? ( isAdmin ? null : (
                    <div>
                        <li>
                            <NavLink 
                                to="/playlist" 
                                className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                            >
                                <div className='flex flex-row gap-3'>
                                    <FaList className='text-xl'/> 
                                    <span className='text-sm'>Playlist</span>
                                </div>
                            </NavLink>
                        </li>
                        <div className='w-full h-[1px] mt-2 p-0 bg-gray-500'></div>
                    </div>
                )) : null}

                <li>
                    <NavLink 
                        to="/video" 
                        className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                    >
                        <div className='flex flex-row gap-3'>
                            <FaFilm className='text-xl'/> 
                            <span className='text-sm'>Video</span>
                        </div>
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/music" 
                        className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                    >
                        <div className='flex flex-row gap-3'>
                            <GiMusicalNotes className='text-xl'/> 
                            <span className='text-sm'>Music</span>
                        </div>
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        to="/news" 
                        className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                    >
                        <div className='flex flex-row gap-3'>
                            <FaNewspaper className='text-xl'/> 
                            <span className='text-sm'>News</span>
                        </div>
                    </NavLink>
                </li>

                <div className='w-full h-[1px] m-0 p-0 bg-gray-500'></div>

                {isAdmin ? ( <AdminSidebar/> ) : ( <UserSidebar/> )}
            </ul>
        </nav>
    )
}

export default Sidebar
