import React, { FocusEvent, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Sidebar from "../components/Sidebar";
import { QuestionType, ReduxState, RequestQuestion, User } from "../types/Types";


const SurveyResult: React.FC = () => {

  const user = useSelector<ReduxState, User>(state => state.user);
  const navigate = useNavigate();

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar email={user.email} username={user.username} imgUrl={user.imageUrl} isAdmin={user.isAdmin}/>
      <div className="h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl overflow-y-scroll">
        
      </div>
    </Container>
  );
}

export default SurveyResult;