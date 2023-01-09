import { Router } from 'express';
import { answerSurvey, createSurvey, getIndividualSurveyAnswers, getSurvey, getSurveyResults, getUserSurveys } from '../controllers/surveys';

const surveyRouter = Router();

surveyRouter.post('/create', createSurvey);
surveyRouter.post('/get', getSurvey);
surveyRouter.post('/user-surveys', getUserSurveys);
surveyRouter.post('/answer', answerSurvey);
surveyRouter.post('/survey-results', getSurveyResults);
surveyRouter.post('/individual-answers', getIndividualSurveyAnswers);

export default surveyRouter;