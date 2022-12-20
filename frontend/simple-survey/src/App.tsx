import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSurvey from './pages/AddSurvey';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SurveyAnswer from './pages/SurveyAnswer';
import Surveys from './pages/Surveys';
import {ErrorBoundary} from 'react-error-boundary'
import DataWrapper from './components/DataWrapper';
import BrowseLogs from './pages/BrowseLogs';
import SurveyResult from './pages/SurveyResult';

const  App: React.FC = () => {
  return (
    <ErrorBoundary onError={(error) => console.error(error)} fallback={(<div>ERROR</div>)}>
      <Router>
        <DataWrapper>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/surveys/:hash" element={<SurveyAnswer/>} />
            <Route path="/surveys" element={<Surveys/>} />
            <Route path="/add-survey" element={<AddSurvey/>} />
            <Route path="/survey-result/:hash" element={<SurveyResult/>} />
            <Route path="/logs" element={<BrowseLogs/>} />
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </DataWrapper>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
