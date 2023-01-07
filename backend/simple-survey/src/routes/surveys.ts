import { Router } from 'express';
import { answerSurvey, createSurvey, getSurvey, getSurveyResults, getUserSurveys } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);
surveyRouter.post('/get', getSurvey);
surveyRouter.post('/user-surveys', getUserSurveys);
surveyRouter.post('/answer', answerSurvey);
surveyRouter.post('/survey-results', getSurveyResults);

export default surveyRouter;