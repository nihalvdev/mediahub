import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const endpoint = isAdmin ? '/api/v1/admin/admin-login' : '/api/v1/user/user-login'

            const response = await axios.post(endpoint, {
                email,
                password
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            } )

            const { accessToken, refreshToken } = response.data.data

            if (isAdmin) {
                const adminData = response.data.data
                dispatch(login({ user: adminData, isAdmin: true }))

                localStorage.setItem('accessToken', accessToken)
                localStorage.setItem('refreshToken', refreshToken)
                localStorage.setItem('userData', JSON.stringify(adminData))
                localStorage.setItem('isAdmin', JSON.stringify(true))
                navigate('/video')

            }else {
                const { user } = response.data.data
                dispatch(login({ user, isAdmin: false }))

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userData', JSON.stringify(user));
                localStorage.setItem('isAdmin', JSON.stringify(false));
                navigate('/');
            }

        } catch (error) {
            if(error.response && error.response.data){
                setError(error.response.data.message || "Login Failed.. Check Creadentials")
            }else{
                setError("Something went wrong....")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 dark:bg-gray-800">
                {/* Sign In Header */}
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Sign In</h1>

                <form action="#" method='POST'>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                            <span className="px-3 text-gray-500 dark:text-white">
                                <FaEnvelope />
                            </span>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border-none outline-none focus:ring-0 text-black dark:text-white dark:bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                            <span className="px-3 text-gray-500 dark:text-white">
                                <FaLock />
                            </span>
                            <input 
                                type={passwordVisible ? "text" : "password"}  
                                placeholder="Enter your password"
                                value={password}
                                onChange={ (e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border-none outline-none focus:ring-0 text-black dark:text-white dark:bg-transparent"
                            />
                            <span 
                                className="px-3 text-gray-500 dark:text-white cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}  
                            </span>
                        </div>
                    </div>

                    {/* Radio button for toggle signin */}
                    <div className='m-4 text-black'>
                        <label className='p-4'>
                            <input
                                type="radio"
                                value="user"
                                checked={!isAdmin}
                                onChange={() => setIsAdmin(false)}
                            />
                            <span className='font-semibold p-1 text-base dark:text-white'>User</span>
                        </label>
                        <label className='p-4'>
                            <input
                                type="radio"
                                value="admin"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(true)}
                            />
                            <span className='font-semibold p-1 text-base dark:text-white'>Admin</span>
                        </label>
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type='submit'
                        onClick={handleSignIn}
                        className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105' }`}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In' }
                    </button>

                </form>

                {/* Additional Links */}
                <div className="flex justify-center mt-6 text-blue-600 dark:text-white">
                    <span>Don't have an account?   <Link to='/signup' className='underline dark:text-blue-400'> SignUp</Link></span> 
                </div>

                {error && <p className='text-red-500 text-center'> {error} </p> }
            </div>

        </div>
    )
}

export default SignIn
