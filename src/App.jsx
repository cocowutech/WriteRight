import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import HeaderComponent from './components/HeaderComponent';
import Home from "./Home"
import AboutUs from "./AboutUs"
import ToeflGrader from "./ToeflGrader"
import Register from "./Register"
import Login from "./Login";
import UserProfile from "./UserProfile"
import {
  RecoilRoot,
} from 'recoil';

function App() {

  return (
    <RecoilRoot>
      <Router>
      <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/toefl-grader" element={<ToeflGrader/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user-profile" element={<UserProfile/>} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
