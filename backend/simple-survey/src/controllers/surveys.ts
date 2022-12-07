import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Survey } from "../entities/Survey";
import { Question, QuestionType } from "../entities/Question";
import { PossibleAnswer } from "../entities/PossibleAnswer";
import { decryptSurveyId, encryptSurveyId } from "../utils/encryptionUtils";
import { SurveyAnswer } from "../entities/SurveyAnswer";
import { QuestionAnswer } from "../entities/QuestionAnswer";

const surveyRepository = AppDataSource.getRepository(Survey);
const questionRepository = AppDataSource.getRepository(Question);
const answerRepository = AppDataSource.getRepository(PossibleAnswer);

interface RequestPossibleAnswers {
  id: number;
  content: string;
}

interface RequestQuestion {
  id: number;
  type: QuestionType;
  content: string;
  possibleAnswers: RequestPossibleAnswers[];
}

interface SurveyRequestBody {
  ownerId: number;
  id: number;
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
    let savedSurveys: Survey[] = await surveyRepository.findBy({ownerId: req.body.userId});

    const surveys = savedSurveys.map((survey: Survey) => {
      const surveyHash: {iv: string, content: string} = encryptSurveyId(survey.id);
      return { ...survey, hash: `${surveyHash.iv}_${surveyHash.content}` }
    });

    return res.status(200).json({surveys});
  } catch (error) {
    return res.status(500).json({error})
  }
}

const getSurvey = async (req: Request, res: Response) => {
  try {
    const hash = req.body.hash.split("_");
    const surveyId = decryptSurveyId({iv: hash[0], content: hash[1]});

    const survey = await surveyRepository.findOneBy({ id: surveyId });
    const questions = await questionRepository.findBy({ surveyId: survey!.id });

    const retQuestions = await Promise.all(questions.map(async (question: Question) => {
      const answers = await answerRepository.findBy({ questionId: question.id });
      return {
        id: question.id,
        type: question.type,
        content: question.content,
        possibleAnswers: answers.map((answer: PossibleAnswer) => ({ id: answer.id, content: answer.content }))
      };
    }));

    let retSurvey: SurveyRequestBody = {
      ownerId: survey?.ownerId!,
      id: survey?.id!,
      title: survey?.title!,
      description: survey?.description!,
      questions: retQuestions,
    };
    
    return res.status(200).json({retSurvey});
  } catch (error) {
    return res.status(500).json({error});
  }
}


const answerSurvey = async (req: Request, res: Response) => {
  try {
    const newSurveyAnswer = new SurveyAnswer(req.body.surveyId, req.body.userId);
    await newSurveyAnswer.save();

    for await (const answer of req.body.answers) {
      const newAnswer = new QuestionAnswer(answer.questionId, answer.possibleAnswerId, answer.content, req.body.userId, newSurveyAnswer.id);

      await newAnswer.save();
    }

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({error});
  }
}

export { createSurvey, getUserSurveys, getSurvey, answerSurvey };