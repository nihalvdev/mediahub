import React from 'react'
import { FaMusic, FaRegUserCircle, FaUser, FaVideo } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Theme from '../../Theme'

function AdminSidebar() {

    const { status, isAdmin } = useSelector( (state) => state.auth )

    return (
        <div>
            <ul className='space-y-4'>
                { status ? ( isAdmin ? (
                    <>
                        <li>
                            <NavLink 
                                to="/users" 
                                className={({ isActive }) => `block px-3 py-2 rounded-lg ${isActive ? "text-white bg-gray-700" : "" } hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                            >
                                <div className='flex flex-row gap-3'>
                                    <FaUser className='text-xl'/> 
                                    <span className='text-sm'>User Details</span>
                                </div>
                            </NavLink>
                        </li>
                
                        <li>
                            <Theme/>
                        </li>
                    </>
                 ) : null 
                ) : (
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

export default AdminSidebar
