import { Router } from 'express';
import { createSurvey, getSurvey } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);
surveyRouter.post('/get', getSurvey);

export default surveyRouter;