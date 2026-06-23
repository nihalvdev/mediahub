import React from 'react'
import { FaFilm, FaMusic, FaNewspaper, FaRegUserCircle } from 'react-icons/fa'
import { IoHomeOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function SmallScreenSidebar() {

    const { status, isAdmin, userData } = useSelector( (state) => state.auth)

    return (
        <div className="fixed bottom-0 left-0 w-full border-t-2 border-gray-400 flex justify-around p-2 z-50 bg-white  h-12 items-center dark:text-white dark:bg-gray-950">
            <Link to="/" className="flex flex-col items-center">
                <div className='flex flex-col justify-center items-center'>
                    <IoHomeOutline className='text-xl'/>
                    <span className='text-xs'>Home</span>
                </div> 
            </Link>
            <Link to="/video" className="flex flex-col items-center">
                <div className='flex flex-col justify-center items-center'>
                    <FaFilm className='text-xl'/>
                    <span className='text-xs'>Video</span>
                </div> 
            </Link>
            <Link to="/news" className="flex flex-col items-center">
                <div className='flex flex-col justify-center items-center'>
                    <FaNewspaper className='text-xl'/>
                    <span className='text-xs'>News</span>
                </div> 
            </Link>
            <Link to="/music" className="flex flex-col items-center">
                <div className='flex flex-col justify-center items-center'>
                    <FaMusic className='text-xl'/>
                    <span className='text-xs'>Music</span>
                </div> 
            </Link>
            <div className="flex flex-col items-center">
                { status ? ( isAdmin ? (
                    <Link to='/users'>
                        <div className='flex flex-col justify-center items-center'>
                            <FaRegUserCircle className='text-lg'/>
                            <span className='text-xs'>Users</span>
                        </div> 
                        
                    </Link>
                ) : (
                    <Link to='/user-profile'>
                        <div className='flex flex-col justify-center items-center'>
                            <img 
                                src={userData.avatar} 
                                alt="Avatar"
                                className='h-6 w-6 rounded-full border-2' 
                            />
                            <span className='text-xs'>Profile</span>
                        </div> 
                        
                    </Link>
                )) : (
                    <div className='flex flex-col justify-center items-center'>
                        <FaRegUserCircle className='text-xl'/>
                        <span className='text-[8px]'>Login First</span>
                    </div>
                ) }
            </div>
      </div>
    )
}

export default SmallScreenSidebar
