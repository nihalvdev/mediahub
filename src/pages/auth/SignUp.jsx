import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(false)

        if (!email || !password || !name || !avatar) {
            setError('All fields are required. Please fill out every field.')
            return  // Stop form submission if fields are missing
        }

        setLoading(true)

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)

        try {
            const response = await axios.post('/api/v1/user/register',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },{
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                }
            )

            if (response.status === 200 || response.data.success) {
                navigate('/signin')
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Registration failed. Please try again.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 mb-10 text-black">
            <form className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
                {/* Sign Up Header */}
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Sign Up</h1>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Name</label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                        <span className="px-3 text-gray-500 dark:text-white">
                            <FaUser />
                        </span>
                        <input 
                            type="text" 
                            placeholder="Enter your name"
                            id='name'
                            value={name}
                            onChange={ (e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border-none outline-none focus:ring-0 dark:bg-transparent dark:text-white"
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email</label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                        <span className="px-3 text-gray-500 dark:text-white">
                            <FaEnvelope />
                        </span>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            id='email'
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border-none outline-none focus:ring-0 dark:bg-transparent dark:text-white"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                        <span className="px-3 text-gray-500 dark:text-white">
                            <FaLock />
                        </span>
                        <input 
                            type={passwordVisible ? "text" : "password"}  // Toggle between text and password
                            placeholder="Enter your password"
                            id='password'
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border-none outline-none focus:ring-0 dark:bg-transparent dark:text-white"
                        />
                        <span 
                            className="px-3 text-gray-500 dark:text-white cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}  {/* Toggle eye icon */}
                        </span>
                    </div>
                </div>

                {/* Avatar Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Avatar</label>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                        <span className="px-3 text-gray-500 dark:text-white">
                            <FaCamera />
                        </span>
                        <input 
                            type="file"
                            id='avatar'
                            accept='image/*'
                            required
                            onChange={ (e) => setAvatar(e.target.files[0])}
                            className="w-full px-4 py-2 border-none outline-none focus:ring-0 dark:text-white"
                        />
                    </div>
                </div>

                {/* Sign Up Button */}
                <button 
                    className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    type='submit'
                    onClick={registerUser}
                    disabled={loading}
                >
                    {loading ? "Signing Up...": "Sign Up"}
                </button>

                {/* Additional Links */}
                <div className="flex justify-center mt-6 text-blue-600 dark:text-white">
                    <span>Already have an Account?  <Link to='/signin' className='underline dark:text-blue-500'> SignIn</Link></span>
                </div>
            </form>
        </div>
    )
}

export default SignUp
