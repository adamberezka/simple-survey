import axios from 'axios';
import { SurveyAnswerRequest, SurveyRequestBody } from '../types/Types';

// const hostUrl = "";
const hostUrl = "http://192.168.1.49:8080";

const loginUrl = hostUrl + "/user/login";
const surveyUrl = hostUrl + "/surveys";

export const loginUser = (jwt: string) => axios.post(loginUrl, {jwt: jwt});
export const createSurvey = (survey: SurveyRequestBody, jwt: string) => axios.post(surveyUrl + "/create", { survey, jwt });
export const getUserSurveys = (userId: number, jwt: string) => axios.post(surveyUrl + "/user-surveys", { userId, jwt });
export const getSurvey = (hash: string, jwt: string) => axios.post(surveyUrl + "/get", { hash, jwt });
export const answerSurvey = (surveyData: SurveyAnswerRequest) => axios.post(surveyUrl + "/answer", { ...surveyData });