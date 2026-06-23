import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import { DetailPage, Disliked, Home, Liked, Music, News, Playlist, PrivateRoute, Search, SignIn, SignUp, Upload, UserDetails, UserMusic, UserProfile, Users, UserVideo, Video } from "./index"
import Theme from "./Theme"

function App() {

  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/video" element={<Video/>} />
          <Route path="/music" element={<Music/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/user-profile" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
          <Route path="/news" element={<News/>} />
          <Route path="/:type/:id" element={<DetailPage/>} />
          <Route path="/likes" element={<PrivateRoute><Liked/></PrivateRoute>}/>
          <Route path="/dislikes" element={<PrivateRoute><Disliked/></PrivateRoute>}/>
          <Route path="/playlist" element={<PrivateRoute><Playlist/></PrivateRoute>}/>
          <Route path="/theme" element={<PrivateRoute><Theme/></PrivateRoute>}/>
          <Route path="/your-videos" element={<PrivateRoute><UserVideo/></PrivateRoute>}/>
          <Route path="/your-musics" element={<PrivateRoute><UserMusic/></PrivateRoute>}/>
          <Route path="/search" element={<Search/>}/>

          <Route path="/users" element={<PrivateRoute requiredAdmin={true}><Users/></PrivateRoute>}/>
          <Route path="/users/:id" element={<PrivateRoute requiredAdmin={true}><UserDetails/></PrivateRoute>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
