// Import Firebase SDK
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Firebase configaration details 
const firebaseConfig = {
    apiKey: "AIzaSyCd7tJ6FpKZDSEQs5bfs0S_yt7qRCGqjPE",
  authDomain: "mediahub-0307nv.firebaseapp.com",
  projectId: "mediahub-0307nv",
  storageBucket: "mediahub-0307nv.appspot.com",
  messagingSenderId: "253909408558",
  appId: "1:253909408558:web:7202b8364905e5c5c338bf",
  measurementId: "G-QNL1GGE41P"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Export Firebase storage to use in Components
const storage = getStorage(firebaseApp)

export { storage }