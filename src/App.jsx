import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import HeaderComponent from './components/HeaderComponent';
import Home from "./Home"
import AboutUs from "./AboutUs"
import ToeflGrader from "./ToeflGrader"
import Login from "./Login"
import UserProfile from "./UserProfile"

function App() {
  return (
    <>
      <HeaderComponent />
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/toefl-grader" element={<ToeflGrader/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user-profile" element={<UserProfile/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
