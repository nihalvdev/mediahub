import React, { useState } from 'react'
import UploadVideo from '../components/Video/UploadVideo';
import UploadMusic from '../components/Music/UploadMusic';

function Upload () {
  const [activeForm, setActiveForm] = useState('video'); // Default to video form

  return (
    <div className="w-full max-w-2xl mx-auto p-6 mb-16">
      <div className="flex justify-center space-x-4 mb-8 w-full">
        <button
          onClick={() => setActiveForm('video')}
          className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
            activeForm === 'video' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700 hover:bg-blue-400'
          }`}
        >
          Video
        </button>
        <button
          onClick={() => setActiveForm('music')}
          className={`px-4 py-2 rounded-md text-white font-semibold transition duration-300 ${
            activeForm === 'music' ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700 hover:bg-blue-400'
          }`}
        >
          Music
        </button>
      </div>

      {/* Render the appropriate form based on activeForm */}
      {activeForm === 'video' ? <UploadVideo /> : <UploadMusic />}
    </div>
  );
};

export default Upload
