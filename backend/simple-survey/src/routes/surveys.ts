import { Router } from 'express';
import { answerSurvey, createSurvey, getSurvey, getUserSurveys } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);
surveyRouter.post('/get', getSurvey);
surveyRouter.post('/user-surveys', getUserSurveys);
surveyRouter.post('/answer', answerSurvey);

export default surveyRouter;