import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import { ReduxState, User } from "../types/Types";
import { ReactComponent as CheckCircleIcon } from "../icons/CheckCircle.svg";
import { getSurveyResults } from "../services/BackendService";
import Loading from "../components/Loading";

const SurveyResult: React.FC = () => {
  const user = useSelector<ReduxState, User>(state => state.user);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const match = useMatch("/survey-result/:hash");

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
        // TODO
        console.log(res.data);
        setLoading(false);
      }
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });


    return () => setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        </div>)}
      </ContainerContent>
    </Container>
  );
}

export default SurveyResult;