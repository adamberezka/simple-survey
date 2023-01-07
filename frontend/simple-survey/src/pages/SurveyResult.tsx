import React, { FocusEvent, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import { ReduxState, User } from "../types/Types";
import { ReactComponent as CheckCircleIcon } from "../icons/CheckCircle.svg";

const SurveyResult: React.FC = () => {
  const user = useSelector<ReduxState, User>(state => state.user);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const navigate = useNavigate();

  const surveyLink = window.location.href.replace("survey-result", "surveys");

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!linkCopied) {
      navigator.clipboard.writeText(e.currentTarget.textContent || "");
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1000);
    }
  };

  return (
    <Container>
      <ContainerContent>
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
        </div>
      </ContainerContent>
    </Container>
  );
}

export default SurveyResult;