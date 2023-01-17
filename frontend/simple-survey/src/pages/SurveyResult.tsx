import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import { ReduxState, SurveyRequestBody, User, RequestQuestion, QuestionType } from "../types/Types";
import { ReactComponent as CheckCircleIcon } from "../icons/CheckCircle.svg";
import { getSurveyResults } from "../services/BackendService";
import Loading from "../components/Loading";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import Button from "../components/Button";

interface surveyData {
  surveyTemplate: SurveyRequestBody,
  resultsData: {[key: number]: {[key: number]: number}}
}

const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
  
};

const SurveyResult: React.FC = () => {
  const user = useSelector<ReduxState, User>(state => state.user);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState<surveyData>();
  const match = useMatch("/survey-result/:hash");
  const navigate = useNavigate();

  const surveyLink = window.location.href.replace("survey-result", "surveys");

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!linkCopied) {
      navigator.clipboard.writeText(e.currentTarget.textContent || "");
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSurveyResults(user.jwt, user.id, match?.params.hash!)
    .then(res => {
      if (res.data.error) {
        setError(res.data.error);
        setLoading(false);
      } else {
        setSurveyData(res.data);        
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });


    return () => setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderQuestionResults = (question: RequestQuestion) => {
    const questionResults = Object.keys(surveyData?.resultsData[question.id]!).map(resultKey => surveyData?.resultsData[question.id][Number(resultKey)]);
    const labels = questionResults.map((_result, index) => index + 1 + ".");
    const data = {
      labels,
      datasets: [
        {
          data: questionResults,
          backgroundColor: 'rgba(62, 0, 112, 0.5)',
        }
      ]
    }

    return (
      <div className="flex flex-col mt-2" key={question.id}>
        <div className="mb-2">{question.content}</div>
        <div className="flex flex-col pl-6 mb-2">
          {question.possibleAnswers.map((possibleAnswer, index) => 
            <div>{index + 1 + ". "}{possibleAnswer.content}</div>
          )}
        </div>
        <Bar options={chartOptions} data={data} />
      </div>
    );
  }

  return (
    <Container>
      <ContainerContent>
        {loading ? 
        (<div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Loading />
            Loading survey results...
          </div>
        </div>) :
        (error ? 
        <div>{error}</div> :
        <div className="flex flex-col">
          <div className="flex flex-col mb-6">
            <div className="text-4xl font-bold mb-2">{surveyData?.surveyTemplate?.title}</div>
            <div className="text-xl font-normal">{surveyData?.surveyTemplate?.description}</div>
          </div>
          <div className="flex flex-col mb-6">
            Share survey with this link:
            <div className="flex flex-row gap-x-4">
              <div className="cursor-pointer" onClick={(e) => handleLinkClick(e)}>
                {surveyLink}
              </div>
              <div className={`invisible flex flex-row text-[#33ea30] gap-x-2 transition-opacity ease-in duration-1000 opacity-100 ${ linkCopied && "!visible !opacity-0" }`}>
                Link Copied!
                <CheckCircleIcon />
              </div> 
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="text-4xl font-bold w-full">Individual survey answers</div>
            <Button onClick={() => navigate(`/individual-answers/${match?.params.hash!}`, {
              state: {
                surveyTemplate: surveyData?.surveyTemplate
              }
            })} className="text-xl flex-grow-0 rounded-2xl bg-primary text-white px-12 py-2 mt-6 w-max">View individual answers</Button>
          </div>
          <div className="flex flex-col">
            <div className="text-4xl font-bold">Closed questions answer results</div>
            {surveyData?.surveyTemplate.questions.filter(question => question.type !== QuestionType.OPEN).map(question => 
              renderQuestionResults(question)
            )}
          </div>
        </div>)}
      </ContainerContent>
    </Container>
  );
}

export default SurveyResult;