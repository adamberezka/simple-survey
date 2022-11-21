
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
  content: string
}

export interface RequestQuestion {
  content: string;
  type: QuestionType;
  possibleAnswers: RequestPossibleAnswers[]
}

export interface SurveyRequestBody {
  ownerId: number;
  title: string;
  description: string;
  questions: RequestQuestion[];
}

export enum QuestionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  OPEN = 'open'
}