import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { MdThumbDown, MdThumbUp } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Theme from '../../Theme'

function UserSidebar() {

    const { status, isAdmin } = useSelector( (state) => state.auth)

    return (
        <div>
            <ul className='space-y-4'>
                { status ? ( isAdmin ? null : (
                    <>
                        <li>
                            <NavLink 
                                to="/likes" 
                                className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                            >
                                <div className='flex flex-row gap-3'>
                                    <MdThumbUp className='text-xl'/> 
                                    <span className='text-sm'>Liked</span>
                                </div>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink 
                                to="/dislikes" 
                                className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                            >
                                <div className='flex flex-row gap-3'>
                                    <MdThumbDown className='text-xl'/> 
                                    <span className='text-sm'>Disliked</span>
                                </div>
                            </NavLink>
                        </li>
                
                        <li>
                            <Theme/>
                        </li>
                    </>
                 )) : (
                    <li>
                        <NavLink 
                            to='/signin' 
                            className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                        >
                            <div className='flex flex-row gap-3'>
                                <FaRegUserCircle className='text-xl'/> 
                                <span className='text-base'>SignIn</span>
                            </div>  
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default UserSidebar
