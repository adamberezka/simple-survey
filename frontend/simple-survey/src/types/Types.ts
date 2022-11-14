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
  possibleAnswers: RequestPossibleAnswers[]
}

export interface SurveyRequestBody {
  ownerId: number;
  title: string;
  description: string;
  questions: RequestQuestion[];
}