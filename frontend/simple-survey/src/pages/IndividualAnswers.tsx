import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useMatch } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import Loading from "../components/Loading";
import QuestionAnswer from "../components/QuestionAnswer";
import { getIndividualAnswers } from "../services/BackendService";
import { QuestionType, ReduxState } from "../types/Types";
import { ReactComponent as ArrowLeftIcon } from "../icons/ArrowLeft.svg"; 
import { ReactComponent as ArrowRightIcon } from "../icons/ArrowRight.svg"; 

const IndividualAnswers: React.FC = () => {
  const user = useSelector((state: ReduxState) => state.user);
  const match = useMatch("/individual-answers/:hash");
  const location = useLocation();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [next, setNext] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [surveyAnswers, setSurveyAnswers] = useState<[[]]>();
  const [totalAnswers, setTotalAnswers] = useState<number>();
  const surveyTemplate = location?.state?.surveyTemplate;

  useEffect(() => {
    setLoading(true);
    getIndividualAnswers(user.jwt, match?.params.hash!, next)
    .then(res => {
      if (res.data.error) {
        setError(error);
        setLoading(false);
      }
      setSurveyAnswers(res.data.surveyData.answers);
      setTotalAnswers(res.data.surveyData.totalAnswers);
      setLoading(false);
    })
    .catch(err => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const handlePageChange = () => {
    
  }

  console.log(surveyTemplate);
  console.log(surveyAnswers);
  

  return (
    <Container>
      <ContainerContent className="px-16">
        {loading || !surveyAnswers?.length || !surveyTemplate ? 
        (<div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Loading />
            Loading answers...
          </div>
        </div>) :
        (error ? 
        <div>{error}</div> :
        <div className="flex flex-col gap-y-6">
          <div className="fixed top-1/2 left-[275px] group flex flex-col justify-center items-center cursor-pointer">
            <ArrowLeftIcon className="h-8 w-8"/>
            <div className="invisible group-hover:visible">Previous</div>
          </div>
          <div className="fixed top-1/2 right-[10px] group flex flex-col justify-center items-center cursor-pointer">
            <ArrowRightIcon className="h-8 w-8"/>
            <div className="invisible group-hover:visible">Next</div>
          </div>
          <div>Answer {page + 1} of {totalAnswers}</div>
          <div className="flex flex-col gap-y-2">
            {surveyAnswers[page].map((questionAnswer: {questionId: number, possibleAnswerId: number | string, content: string}) => {
              const question = surveyTemplate?.questions.find((question: {id: number, type: QuestionType}) => question.id === questionAnswer.questionId);
              
              return <QuestionAnswer 
                  question={question}
                  possibleAnswers={question.possibleAnswers}
                  answer={question.type === QuestionType.OPEN ? questionAnswer.content : questionAnswer.possibleAnswerId}
                  updateAnswer={() => null}
                />
            }  
            )}
          </div>
        </div>
        )
        }
      </ContainerContent>
    </Container>
  );
}

export default IndividualAnswers;