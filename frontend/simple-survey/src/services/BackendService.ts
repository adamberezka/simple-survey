import axios from 'axios';
import { SurveyAnswerRequest, SurveyRequestBody } from '../types/Types';

// const hostUrl = "";
const hostUrl = "http://localhost:8080";

const loginUrl = hostUrl + "/user/login";
const surveyUrl = hostUrl + "/surveys";
const logsUrl = hostUrl + "/user/logs";

export const loginUser = (jwt: string) => axios.post(loginUrl, {jwt: jwt});
export const createSurvey = (survey: SurveyRequestBody, jwt: string) => axios.post(surveyUrl + "/create", { survey, jwt });
export const getUserSurveys = (userId: number, jwt: string) => axios.post(surveyUrl + "/user-surveys", { userId, jwt });
export const getSurvey = (hash: string, jwt: string) => axios.post(surveyUrl + "/get", { hash, jwt });
export const answerSurvey = (surveyData: SurveyAnswerRequest) => axios.post(surveyUrl + "/answer", { ...surveyData });
export const getLogs = (jwt: string, from: Date, to: Date, allLogs: boolean) => axios.post(logsUrl, {jwt: jwt, from: from, to: to, allLogs: allLogs});
export const getSurveyResults = (jwt: string, userId: number, hash: string) => axios.post(surveyUrl + "/survey-results", {jwt: jwt, userId: userId, hash: hash});
export const downloadZippedLogs = (jwt: string, from: Date, to: Date, allLogs: boolean) => axios.post(hostUrl + "/user/download-logs", {jwt: jwt, from: from, to: to, allLogs: allLogs}, {method: 'POST', responseType: 'blob'});