import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";

import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from 'react';
import Home from "./pages/Home";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import NavigationBar from "./components/NavigationBar/NavigationBar";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;