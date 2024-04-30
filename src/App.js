import logo from './logo.svg';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React,{useContext, useState} from 'react';
import { PrimeReactProvider } from 'primereact/api';
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


// import {AuthContext} from "./Context/AuthContext";
import PreviewPost from './Components/Home/PreviewPost/PreviewPost';
import EditPost from './Components/Posts/EditPost/EditPost';
import PreviewProfile from './Components/Home/PreviewProfile/PreviewProfile';
import PreviewImagePost from './Components/Home/PreviewImagePost/PreviewImagePost';

function App({ Component }) {
  return (
    <div className='h-screen'>   
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
          <Route
            exact
            path="/search/postpreview/:userId/:postId"
            element={<PreviewPost />}
          />
          <Route
            exact
            path="/search/imagepostpreview/:userId/:postId"
            element={<PreviewImagePost />}
          />
          <Route
            exact
            path="/search/profilepreview/:userId"
            element={<PreviewProfile />}
          />
          <Route
          exact
          path="/editpost/:postId"
          element={<EditPost />}
        />
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
      
      
    </div>
  );
}

export default App;
