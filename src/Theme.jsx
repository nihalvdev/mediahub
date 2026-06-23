import React, { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

function Theme() {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const element = document.documentElement

    useEffect( () => {
        element.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    const changeTheme = () => {
        setTheme( (prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }
    return (
        <div>
            <ul>
                <li>
                    <NavLink 
                        className={`block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition duration-300`}
                    >
                        {theme === 'dark' ? (
                            <div onClick={changeTheme} className='flex flex-row gap-3'>
                                <FiMoon className='text-xl'/> 
                                <span className='text-sm'>Light Mode</span>
                            </div>
                        ) : (
                            <div onClick={changeTheme} className='flex flex-row gap-3'>
                                <FiSun className='text-xl'/> 
                                <span className='text-sm'>Dark Mode</span>
                            </div>
                        )}
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Theme
