import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Survey } from "../entities/Survey";
import { Question, QuestionType } from "../entities/Question";
import { PossibleAnswer } from "../entities/PossibleAnswer";

const surveyRepository = AppDataSource.getRepository(Survey);
const questionRepository = AppDataSource.getRepository(Question);
const answerRepository = AppDataSource.getRepository(PossibleAnswer);

interface RequestPossibleAnswers {
  content: string;
}

interface RequestQuestion {
  type: QuestionType;
  content: string;
  possibleAnswers: RequestPossibleAnswers[];
}

interface SurveyRequestBody {
  ownerId: number;
  title: string;
  description: string;
  questions: RequestQuestion[];
}

const createSurvey = async (req: Request, res: Response) => {
  try {
    const surveyData: SurveyRequestBody = req.body.survey;
  
    const newSurvey = new Survey(surveyData.ownerId, surveyData.title, surveyData.description, true);
    await newSurvey.save();
  
    surveyData.questions.forEach(async (question: RequestQuestion) => {
      const newQuestion = new Question(newSurvey.id, question.content, question.type);
  
      await newQuestion.save();
  
      question.possibleAnswers.forEach(async (answer: RequestPossibleAnswers) => {
        const newAnswer = new PossibleAnswer(newQuestion.id, answer.content);

        newAnswer.save();
      });
    });
    
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({error});
  }
}

const getUserSurveys = async (req: Request, res: Response) => {
  try {
    const surveys: Survey[] = await surveyRepository.findBy({ownerId: req.body.userId});

    return res.status(200).json({surveys});
  } catch (error) {
    return res.status(500).json({error})
  }
}

const getSurvey = async (req: Request, res: Response) => {
  try {
    const survey = await surveyRepository.findOneBy({ id: req.body.surveyId });
    const questions = await questionRepository.findBy({ surveyId: survey!.id });
    
    const retQuestions = await Promise.all(questions.map(async (question: Question) => {
      const answers = await answerRepository.findBy({ questionId: question.id });
      return {
        type: question.type,
        content: question.content,
        possibleAnswers: answers.map((answer: PossibleAnswer) => ({ content: answer.content }))
      };
    }));

    let retSurvey: SurveyRequestBody = {
      ownerId: survey?.ownerId!,
      title: survey?.title!,
      description: survey?.description!,
      questions: retQuestions,
    };
    
    return res.status(200).json({retSurvey});
  } catch (error) {
    return res.status(500).json({error});
  }
}

// TODO
// const answerSurvey = async (req: Request, res: Response) => {
//   try {
//     const surveyId = req.body.surveyId;



//   } catch (error) {
//     return res.status(500).json({error});
//   }
// }

export { createSurvey, getUserSurveys, getSurvey };