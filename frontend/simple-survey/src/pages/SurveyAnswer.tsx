import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Container from "../components/Container";
import QuestionAnswer from "../components/QuestionAnswer";
import { getSurvey } from "../services/BackendService";
import { QuestionAnswerRequest, QuestionType, ReduxState, RequestQuestion, SurveyAnswerRequest, SurveyRequestBody } from "../types/Types";

const SurveyAnswer: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyRequestBody>();
  const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswerRequest>();
  const match = useMatch("/surveys/:hash");
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    getSurvey(match?.params.hash!, user.jwt)
      .then(res => {
        // TODO: might add empty answer for open questions during survey creation
        let survey = res.data.retSurvey;
        survey.questions = survey.questions.map((question: RequestQuestion) => {
          if (question.type === QuestionType.OPEN) {
            question.possibleAnswers.push({ content: "" });
            return question;
          } else
            return question; 
        });
        setSurveyData(survey);

        setSurveyAnswer({
          surveyId: survey.id,
          userId: user.id,
          answers: survey.questions.map((question: RequestQuestion) => ({ 
            questionId: question.id,
            content: "",
            userId: user.id,
          }))
        });
      })
      .catch(err => console.log(err))
  }, []);

  const updateAnswer = (questionId: number) => (content: string | QuestionAnswerRequest | QuestionAnswerRequest[]) => {
    let answers = surveyAnswer?.answers;

    const answerIndex = answers?.findIndex(answer => answer.questionId === questionId);

    answers![answerIndex!].content = content;

    setSurveyAnswer({ ...surveyAnswer!, answers: answers! });
  }

  return (
    <Container className="bg-body-text w-screen h-screen !items-start">
      <div className="w-full max-w-[1024px] px-6">
        {!!surveyData && 
          <section className="mt-10 w-full">
            <div className="text-4xl font-bold mb-2">
              {surveyData.title}
            </div>
            <div className="text-xl font-normal">
              {surveyData.description}
            </div>
          </section>
        }
        {!!surveyData && !!surveyData.questions.length && 
          <div className="flex flex-col mt-10 gap-y-4">
            {surveyData.questions.map(question => <QuestionAnswer question={question} content="" updateAnswer={updateAnswer(question.id)}/>)}
          </div>
        }
      </div>
    </Container>
  );
}

export default SurveyAnswer;