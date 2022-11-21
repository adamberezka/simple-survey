import axios from 'axios';
import { SurveyRequestBody } from '../types/Types';

// const hostUrl = "";
const hostUrl = "http://192.168.1.49:8080";

const loginUrl = hostUrl + "/user/login";
const surveyUrl = hostUrl + "/surveys";

export const loginUser = (jwt: string) => axios.post(loginUrl, {jwt: jwt});
export const createSurvey = (survey: SurveyRequestBody, jwt: string) => axios.post(surveyUrl + "/create", {survey, jwt});
export const getUserSurveys = (userId: number, jwt: string) => axios.post(surveyUrl + "/get-users", {userId, jwt});