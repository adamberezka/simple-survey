import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Survey } from "../entities/Survey";
import { Question, QuestionType } from "../entities/Question";
import { PossibleAnswer } from "../entities/PossibleAnswer";
import { decryptSurveyId, encryptSurveyId } from "../utils/encryptionUtils";
import { SurveyAnswer } from "../entities/SurveyAnswer";
import { QuestionAnswer } from "../entities/QuestionAnswer";
import jwtDecode from "jwt-decode";
import { User } from "../entities/User";
import { In } from "typeorm";

const surveyRepository = AppDataSource.getRepository(Survey);
const questionRepository = AppDataSource.getRepository(Question);
const answerRepository = AppDataSource.getRepository(PossibleAnswer);
const surveyAnswerRepository = AppDataSource.getRepository(SurveyAnswer);
const questionAnswersRepository = AppDataSource.getRepository(QuestionAnswer);
const userRepository = AppDataSource.getRepository(User);

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
    
    for await (const question of surveyData.questions) {
      const newQuestion = new Question(newSurvey.id, question.content, question.type);
      await newQuestion.save();

      for await (const answer of question.possibleAnswers) {
        const newAnswer = new PossibleAnswer(newQuestion.id, answer.content);
        await newAnswer.save();
      }
    }

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
    return res.status(500).json({error});
  }
}

const getSurvey = async (req: Request, res: Response) => {
  try {
    const hash = req.body.hash.split("_");
    const surveyId = decryptSurveyId({iv: hash[0], content: hash[1]});

    const reqUserEmail = (jwtDecode(req.body.jwt) as { email: string })?.email;
    const reqUser = await userRepository.findOneBy({ email: reqUserEmail });
    const surveyAnswer = await surveyAnswerRepository.findOneBy({ surveyId: surveyId, userId: reqUser?.id  });

    if (!!surveyAnswer) {
      return res.status(200).json({ error: "You have already answered this survey!" }); 
    }

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

const getSurveyResults = async (req: Request, res: Response) => {
  try {
    const hash = req.body.hash.split("_");
    const surveyId = decryptSurveyId({ iv: hash[0], content: hash[1] });
    
    const survey = await surveyRepository.findOneBy({ id: surveyId });

    if (!survey?.id) {
      return res.status(200).json({ error: "Sorry, survey not found!" });
    }
    
    if (survey?.ownerId !== req.body.userId) {
      return res.status(200).json({ error: "Sorry, survey not found!" });
      // return res.status(200).json({ error: "Sorry, only author of this survey can view its results!" });
    }

    const surveyQuestions = await questionRepository.findBy({ surveyId: survey.id });
    const surveyAnswers = await surveyAnswerRepository.findBy({ surveyId: survey.id }); 
    const surveyAnswerIds = surveyAnswers.map(answer => answer.id);
    const questionAnswers = await questionAnswersRepository.find({where: { surveyAnswerId: In(surveyAnswerIds) }});

    let surveyTemplate: SurveyRequestBody = { ...survey, questions: [] };
    let surveyResults: {[key: number]: {[key: number]: number}} = {};

    for (const question of surveyQuestions) {
      surveyTemplate.questions.push({ ...question, possibleAnswers: [] });
      const answers = await answerRepository.findBy({ questionId: question.id });

      surveyResults[question.id] = {}

      for (const answer of answers) {
        surveyTemplate.questions[surveyTemplate.questions.length - 1].possibleAnswers.push({ id: answer.id, content: answer.content });
        surveyResults[question.id][answer.id] = 0;
      }
    }

    for (const questionAnswer of questionAnswers) {
      if (!!questionAnswer.possibleAnswerId) {
        surveyResults[questionAnswer.questionId][questionAnswer.possibleAnswerId] = surveyResults[questionAnswer.questionId][questionAnswer.possibleAnswerId] + 1;
      }
    }

    return res.status(200).json({ surveyTemplate: surveyTemplate, resultsData: surveyResults });
  } catch (error) {
    return res.status(500).json({error});
  }
}

const getIndividualSurveyAnswers = async (req: Request, res: Response) => {
  try {
    const hash = req.body.hash.split("_");
    const surveyId = decryptSurveyId({ iv: hash[0], content: hash[1] });

    if (req.body.next === 0) {
      const decodedToken: {email: string} = jwtDecode(req.body.jwt);
      const survey = await surveyRepository.findOneBy({id: surveyId});
      const user = await userRepository.findOneBy({email: decodedToken.email});
  
      if ((!!survey && !!user && (survey.ownerId !== user.id)) || !survey) {
        return res.status(200).json({error: "Sorry, no survey was found!"});
      }
    }

    const [_answers, count] = await surveyAnswerRepository.findAndCountBy({ surveyId: surveyId });
    const [surveyAnswers, _count] = await surveyAnswerRepository.findAndCount({where: { surveyId: surveyId }, order: {id: "ASC"}, skip: req.body.next, take: 1}); 

    let surveyData: {answers: QuestionAnswer[][], totalAnswers: number} = { answers: [], totalAnswers: count };

    for (const surveyAnswer of surveyAnswers) {
      const questionAnswers = await questionAnswersRepository.findBy({surveyAnswerId: surveyAnswer.id});
      surveyData.answers.push([ ...questionAnswers ]);
    }

    return res.status(200).json({ surveyData });
  } catch (error) {
    return res.status(500).json({error});
  }
}

export { createSurvey, getUserSurveys, getSurvey, answerSurvey, getSurveyResults, getIndividualSurveyAnswers };