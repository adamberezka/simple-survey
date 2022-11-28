import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSurvey from './pages/AddSurvey';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SurveyAnswer from './pages/SurveyAnswer';
import Surveys from './pages/Surveys';
import {ErrorBoundary} from 'react-error-boundary'

const  App: React.FC = () => {
  return (
    <ErrorBoundary onError={(error) => console.error(error)} fallback={(<div>ERROR</div>)}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/surveys/:hash" element={<SurveyAnswer/>} />
          <Route path="/surveys" element={<Surveys/>} />
          <Route path="/add-survey" element={<AddSurvey/>} />
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
