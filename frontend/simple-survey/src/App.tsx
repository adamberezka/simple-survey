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
import Sidebar from './components/Sidebar';
import { useSelector } from 'react-redux';
import { ReduxState } from './types/Types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import IndividualAnswers from './pages/IndividualAnswers';
import ErrorPage from './pages/ErrorPage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App: React.FC = () => {
  const user = useSelector((state: ReduxState) => state.user);

  return (
    <ErrorBoundary onError={(error) => console.error(error)} fallback={<ErrorPage />}>
      <Router>
        <DataWrapper>
          {user && <Sidebar username={user.username} email={user.email} imgUrl={user.imageUrl} isAdmin={user.isAdmin}/>}
          <Routes>
            <Route path="/login" element={<Login userLoggedIn={!!user}/>} />
            <Route path="/surveys/:hash" element={<SurveyAnswer/>} />
            <Route path="/surveys" element={<Surveys/>} />
            <Route path="/add-survey" element={<AddSurvey/>} />
            <Route path="/survey-result/:hash" element={<SurveyResult />} />
            <Route path="/individual-answers/:hash" element={<IndividualAnswers />} />
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
