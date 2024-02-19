import logo from './logo.svg';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import './App.css';
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
