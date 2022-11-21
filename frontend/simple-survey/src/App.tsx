import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSurvey from './pages/AddSurvey';
import Login from './pages/Login';
import Surveys from './pages/Surveys';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/surveys" element={<Surveys/>} />
        <Route path="/add-survey" element={<AddSurvey/>} />
        <Route path="/" element={<Navigate to="/login"/>}/>
      </Routes>
    </Router>
  );
}

export default App;
