import { Router } from 'express';
import { createSurvey } from '../contollers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);

export default surveyRouter;