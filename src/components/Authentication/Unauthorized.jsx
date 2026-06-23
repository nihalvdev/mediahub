import React from 'react'

function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-700 dark:text-white">
            <h1 className="text-3xl font-bold">Unauthorized Access</h1>
            <p className="mt-4">You do not have permission to view this page.</p>
            <a href="/" className="mt-6 text-blue-500 dark:text-blue-400 underline">Go back to Home</a>
        </div>
    )
}

export default Unauthorized
