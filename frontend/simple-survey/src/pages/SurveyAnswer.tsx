import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Container from "../components/Container";
import QuestionAnswer from "../components/QuestionAnswer";
import { getSurvey } from "../services/BackendService";
import { QuestionType, ReduxState, RequestQuestion, SurveyRequestBody } from "../types/Types";

const SurveyAnswer: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyRequestBody>();
  const match = useMatch("/surveys/:hash");
  const user = useSelector((state: ReduxState) => state.user);

  useEffect(() => {
    getSurvey(match?.params.hash!, user.jwt)
      .then(res => {
        // TODO: might add empty answer for open questions during survey creation
        let survey = res.data.retSurvey;
        survey.questions = survey.questions.map((question: RequestQuestion) => {
          if (question.type === QuestionType.OPEN) {
            question.possibleAnswers.push({content: ""});
            return question;
          } else
            return question; 
        });
        setSurveyData(survey);
      })
      .catch(err => console.log(err))
  }, []);

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
            {surveyData.questions.map(question => <QuestionAnswer question={question}/>)}
          </div>
        }
      </div>
    </Container>
  );
}

export default SurveyAnswer;