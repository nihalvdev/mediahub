import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { FaMusic, FaUser, FaFileAudio, FaFileImage, FaPen } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { MdDescription } from 'react-icons/md';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../../firebase';

function UploadMusic() {

    const { userData } = useSelector( (state) => state.auth)
    
    const [singerName, setSingerName] = useState('')
    const [songName, setSongName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [songFile, setSongFile] = useState(null)

    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [songFileUploadProgress, setSongFileUploadProgress] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [songFileUrl, setSongFileUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!imageUrl || !songFileUrl) {
            toast.error("Please select and upload files before submitting.")
            return
        }

        setIsUploading(true)

        try {
            await saveDetailsToBackend({ singerName, songName, description, imageUrl, songFileUrl })
            toast.success("Music Uploaded Successfully!!!")

            setSingerName('')
            setSongName('')
            setDescription('')
            setImage(null)
            setSongFile(null)
            setImageUrl(null)
            setSongFileUrl(null)
        } catch (error) {
            console.log(error)
            toast.error("Error Uploading audio and image")
        } finally {
            setIsUploading(false)
            setImageUploadProgress(null)
            setSongFileUploadProgress(null)
        }
    }

    const saveDetailsToBackend = async (data) => {
        try {
            const userId = userData._id
            const requestedData = { ...data, userId }
            await axios.post('/api/v1/music/upload-music', requestedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
        } catch (error) {
            throw new Error(error)
        }
    }
    
    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        setImage(file)
        handleUpload(file, 'images', setImageUploadProgress, setImageUrl)
    }

    const handleSongFileSelect = (e) => {
        const file = e.target.files[0]
        setSongFile(file)
        handleUpload(file, 'songFile', setSongFileUploadProgress, setSongFileUrl)
    }

    const handleUpload = (file, folder, setProgress, setUrl) => {
        const storageRef = ref(storage, `Music/${folder}/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress)
            },
            (error) => {
                console.log("Upload Error: ", error)
                toast.error("File Upload Failed. Please Try Again...")
            },
            async () => {
                const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
                setUrl(downloadUrl)
                toast.success(`${folder === 'songFile' ? 'Song File' : 'Image'} uploaded successfully!!`)
            }
        )
    }

    return (
        <div className="w-full lg:max-w-none mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 mb-16 dark:bg-gray-800">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <FiUpload className="text-blue-500 text-4xl" />
                    Upload Music
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                {/* Singer's Name */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <FaUser className="text-blue-400" />
                        Singer Name
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter Singer's Name like Name1, Name2...."
                        value={singerName}
                        onChange={ (e) => setSingerName(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 dark:bg-transparent dark:text-white"
                    />
                </div>

                {/* Song Name */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <FaMusic className="text-blue-400" />
                        Song Name
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter Song Name"
                        value={songName}
                        onChange={ (e) => setSongName(e.target.value) }
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 dark:text-white dark:bg-transparent"
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <MdDescription className="text-blue-400" />
                        Description
                    </label>
                    <textarea 
                        rows={5}
                        placeholder="Enter Music Description"
                        value={description}
                        onChange={ (e) => setDescription(e.target.value) }
                        className="border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 dark:text-white dark:bg-transparent"
                    />
                </div>

                {/* Song Thumbnail */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <FaFileImage className="text-blue-400" />
                        Song Thumbnail
                    </label>
                    {imageUploadProgress === null ? (
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md hover:file:bg-blue-600 transition duration-200 dark:text-white"
                        />
                    ) : (
                        <p className="text-lg font-medium text-blue-500 dark:text-white">Uploading Image... {Math.round(imageUploadProgress)}%</p>
                    )}
                </div>

                {/* Song File */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <FaFileAudio className="text-blue-400" />
                        Song File
                    </label>
                    {songFileUploadProgress === null ? (
                        <input 
                            type="file" 
                            accept="video/*"
                            onChange={handleSongFileSelect}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md hover:file:bg-blue-600 transition duration-200 dark:text-white"
                        />
                    ) : (
                        <p className="text-lg font-medium text-blue-500 dark:text-white">Uploading Video... {Math.round(songFileUploadProgress)}%</p>
                    )}
                </div>

                {/* Upload Button */}
                <div className="flex justify-center mt-6">
                    <button 
                        type="submit"
                        // disabled={isUploading || (!videoUrl && !imageUrl)}
                        className='flex items-center gap-2 px-6 py-3  text-white font-semibold text-lg rounded-md shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 bg-blue-500'
                    >
                        <FiUpload className="text-xl" />
                        Upload
                    </button>
                </div>
            </form>

            <ToastContainer/>
        </div>
    )
}

export default UploadMusic
