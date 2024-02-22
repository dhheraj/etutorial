import logo from './logo.svg';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import './App.css';
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";
import Posts from "./Components/Posts/Posts";
import UploadPost from "./Components/UploadPost/UploadPost";
import TextPost from "./Components/UploadPost/TextPost/TextPost";
import ImagePost from "./Components/UploadPost/ImagePost/ImagePost";
function App() {
  return (
    <>
    
      {/* <p
        className='text-center text-7xl text-green-300 bg-black'
      >App</p> */}
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/posts"
            element={<Posts />}
          />
          <Route
            exact
            path="/profile"
            element={<Profile />}
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            exact
            path="/uploadpost"
            element={<UploadPost />}
          />
           <Route
            exact
            path="/uploadpost/textpost"
            element={<TextPost />}
          />
          <Route
            exact
            path="/uploadpost/imagepost"
            element={<ImagePost />}
          />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
