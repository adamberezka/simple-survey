
export interface ReduxState {
  user: User
}

export interface User {
  jwt: string,
  email: string,
  username: string,
  imageUrl: string,
  id: number
}

export interface RequestPossibleAnswers {
  id?: number;
  content: string
}

export interface RequestQuestion {
  content: string;
  id: number;
  type: QuestionType;
  possibleAnswers: RequestPossibleAnswers[]
}

export interface SurveyRequestBody {
  ownerId: number;
  id?: number;
  title: string;
  description: string;
  questions: RequestQuestion[];
}

export enum QuestionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  OPEN = 'open'
}

export interface SurveyAnswerData {
  surveyId: number;
  userId: number;
  answers: Map<number, string | number | number[] | null>;
}

export interface SurveyAnswerRequest {
  surveyId: number;
  userId: number;
  jwt: string;
  answers: QuestionAnswerRequest[]
}
export interface QuestionAnswerRequest {
  questionId: number
  possibleAnswerId: number | null;
  content: string | null;
}