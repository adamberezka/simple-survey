import { Router } from 'express';
import { createSurvey, getSurvey, getUserSurveys } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);
surveyRouter.post('/get', getSurvey);
surveyRouter.post('/get-users', getUserSurveys);

export default surveyRouter;