import React, { useEffect, useState, useMemo } from "react"
import { useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import QuestionAnswer from "../components/QuestionAnswer";
import { answerSurvey, getSurvey } from "../services/BackendService";
import { QuestionType, ReduxState, RequestQuestion, SurveyAnswerData, SurveyAnswerRequest, SurveyRequestBody } from "../types/Types";

const SurveyAnswer: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyRequestBody>();
  const [surveyAnswer, setSurveyAnswer] = useState<SurveyAnswerData>();
  const match = useMatch("/surveys/:hash");
  const user = useSelector((state: ReduxState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    getSurvey(match?.params.hash!, user.jwt)
      .then(res => {
        let survey = res.data.retSurvey;
        survey.questions = survey.questions.map((question: RequestQuestion) => {
          if (question.type === QuestionType.OPEN) {
            question.possibleAnswers.push({ content: "" });
            return question;
          } else
            return question; 
        });
        setSurveyData(survey);

        const answersMap = new Map<number, string | number | number[] | null>();

        survey.questions.forEach((question: RequestQuestion) => { 
          answersMap.set(question.id, null)
        })

        setSurveyAnswer({
          surveyId: survey.id,
          userId: user.id,
          answers: answersMap
        });
      })
      .catch(err => console.log(err))
  }, []);

  const updateAnswer = (question: RequestQuestion) => (answer: string | number | number[]) => {
    const answerMap = surveyAnswer!.answers;

    answerMap?.set(question.id, answer);

    setSurveyAnswer({ ...surveyAnswer!, answers: answerMap });
  }

  const answersValid = useMemo(() => {
    let valid = true;

    surveyAnswer?.answers.forEach(answer => {
      if (!answer)
        valid = false;
    })

    return valid;
  }, [surveyAnswer]);

  const handleSubmit = () => {
    let surveyAnswerData: SurveyAnswerRequest = {
      surveyId: surveyData?.id!,
      userId: user.id,
      jwt: user.jwt,
      answers: []
    }

    Array.from(surveyAnswer?.answers.keys()!).forEach(questionId => {
      let questionAnswer;

      switch (surveyData?.questions.find(question => question.id === questionId)?.type) {
        case QuestionType.OPEN:
          
          questionAnswer = { 
            questionId: questionId,
            possibleAnswerId: null,
            content: surveyAnswer?.answers.get(questionId) as string,
          }

          surveyAnswerData.answers.push(questionAnswer);

          break;

        case QuestionType.RADIO:
          
          questionAnswer = { 
            questionId: questionId,
            possibleAnswerId: surveyAnswer?.answers.get(questionId) as number,
            content: null,
          }

          surveyAnswerData.answers.push(questionAnswer);

          break;

        case QuestionType.CHECKBOX:
          
          const answerIds = surveyAnswer?.answers.get(questionId) as number[];

          answerIds.forEach(answerId => {
            questionAnswer = { 
              questionId: questionId,
              possibleAnswerId: answerId as number,
              content: null,
            }
  
            surveyAnswerData.answers.push(questionAnswer);
          })

          break;
      
        default:
          break;
      }

    });

    answerSurvey(surveyAnswerData)
      .then(_res => {
        navigate("/surveys");
      })
      .catch(err => console.error(err))

  }

  return (
    <Container className="bg-body-text w-full min-h-screen overflow-x-hidden !items-start pb-12">
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
            {surveyData.questions.map(question => 
              <QuestionAnswer 
                key={question.id}
                question={question}
                possibleAnswers={surveyData.questions.find(questionInData => questionInData.id === question.id)?.possibleAnswers!} 
                answer={surveyAnswer?.answers.get(question.id)!} 
                updateAnswer={updateAnswer(question)}
              />
            )}
          </div>
        }
        <div className="flex justify-center items-center mt-12"> 
          <div className={answersValid ? "cursor-pointer" : "cursor-not-allowed"}>
            <div 
              className={`text-xl flex-grow-0 rounded-2xl bg-primary text-white px-12 py-2 select-none ${!answersValid && "pointer-events-none"}`} 
              onClick={() => handleSubmit()}
            >
              Submit answer
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default SurveyAnswer;