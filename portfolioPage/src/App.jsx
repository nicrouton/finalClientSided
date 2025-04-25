import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./pages/Home";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Dashboard from "./pages/pPage";
import MakeAccount from "./components/SignIn/CreateAccount";
import GSignIn1 from "./components/SignIn/SignIn1";
import Tellaboutself from "./components/SignIn/TellAboutSelf";

import "./App.css";

function App() {
  const location = useLocation();

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/GSignin1" element={<GSignIn1 />} />
        <Route path="/MakeAccount" element={<MakeAccount />} />
        <Route path="/tellaboutself" element={<Tellaboutself />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        {/* <Route path="/MakeAccount" element={<MakeAccount />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;