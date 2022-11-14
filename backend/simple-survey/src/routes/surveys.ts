import { Router } from 'express';
import { createSurvey } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);

export default surveyRouter;