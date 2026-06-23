import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi';
import { MdTitle, MdDescription, MdImage } from 'react-icons/md';
import { FaVideo } from 'react-icons/fa';
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadVideo() {

    const { userData } = useSelector( (state) => state.auth)
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoFile, setVideoFile] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const [videoUploadProgress, setVideoUploadProgress] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!videoUrl && !imageUrl) {
            toast.error("Please select and upload files before submitting.");
            return;
        }

        setIsUploading(true)

        try {
            await saveDetailsToBackend({ title, description, videoUrl, imageUrl })
            toast.success("Video Uploaded Successfully!!!")

            setTitle('')
            setDescription('')
            setImageFile(null)
            setVideoFile(null)
            setVideoUrl(null)
            setImageUrl(null)
        } catch (error) {
            console.log(error)
            toast.error("Error uploading video or image.");
        } finally {
            setIsUploading(false)
            setVideoUploadProgress(null)
            setImageUploadProgress(null)
        }
    }

    const saveDetailsToBackend = async (data) => {
        try {
            const userId = userData._id
            const requestedData = { ...data, userId }
            await axios.post('/api/v1/video/upload-video', requestedData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    const handleUpload = (file, folder, setProgress, setUrl) => {
        const storageRef = ref(storage, `Video/${folder}/${file.name}`)   
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
                toast.success(`${folder === 'videos' ? 'Video' : 'Image'} uploaded successfully!!`)
            }
        )
    }

    const handleVideoSelect = async (e) => {
        const file = e.target.files[0]
        setVideoFile(file)
        handleUpload(file, 'videos', setVideoUploadProgress, setVideoUrl)
    }

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        setVideoFile(file)
        handleUpload(file, 'images', setImageUploadProgress, setImageUrl)
    }

    return (
        <div className="w-full lg:max-w-none mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 dark:bg-gray-800">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white flex items-center justify-center gap-2">
                    <FiUpload className="text-blue-500 text-4xl" />
                    Upload Video
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                {/* Title Field */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <MdTitle className="text-blue-400" />
                        Title
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter video title"
                        value={title}
                        onChange={ (e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 dark:bg-transparent dark:text-white"
                    />
                </div>

                {/* Video Upload Field */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <FaVideo className="text-blue-400" />
                        Video
                    </label>
                    {videoUploadProgress === null ? (
                        <input 
                            type="file" 
                            accept="video/*"
                            onChange={handleVideoSelect}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none file:bg-blue-500 file:text-white file:py-2 file:px-4 file:rounded-md hover:file:bg-blue-600 transition duration-200 dark:text-white"
                        />
                    ) : (
                        <p className="text-lg font-medium text-blue-500 dark:text-white">Uploading Video... {Math.round(videoUploadProgress)}%</p>
                    )}
                </div>

                {/* Image Upload Field */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <MdImage className="text-blue-400" />
                        Image
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

                {/* Description Field */}
                <div className="flex flex-col">
                    <label className="text-lg font-medium text-gray-700 dark:text-white flex items-center gap-2">
                        <MdDescription className="text-blue-400" />
                        Description
                    </label>
                    <textarea 
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter video description"
                        className="border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 dark:bg-transparent dark:text-white"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <button 
                        type="submit"
                        disabled={isUploading || (!videoUrl && !imageUrl)}
                        className={`flex items-center gap-2 px-6 py-3 ${isUploading ? 'bg-gray-400' : 'bg-blue-500'} text-white font-semibold text-lg rounded-md shadow-md hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 ${isUploading ? '' : 'hover:bg-blue-600 focus:ring-blue-300'}`}
                    >
                        <FiUpload className="text-xl" />
                        Upload
                    </button>
                </div>

                <ToastContainer/>
            </form>
        </div>
    )
}

export default UploadVideo
