import React, { FocusEvent, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import Sidebar from "../components/Sidebar";
import { QuestionType, ReduxState, RequestQuestion, User } from "../types/Types";


const SurveyResult: React.FC = () => {

  const user = useSelector<ReduxState, User>(state => state.user);
  const navigate = useNavigate();

  return (
    <Container>
      <ContainerContent>
        
      </ContainerContent>
    </Container>
  );
}

export default SurveyResult;