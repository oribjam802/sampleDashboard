import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import heroImg from "./assets/hero.png"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Layout from "./Layout"
import Home from "./pages/Home"
import NoteDetail from "./pages/NoteDetail"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/notes/:id" element={<NoteDetail />}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
