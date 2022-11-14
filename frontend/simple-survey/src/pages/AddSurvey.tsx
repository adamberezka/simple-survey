import React, { useState } from "react"
import Container from "../components/Container";
import OpenQuestion from "../components/OpenQuestion";
import Sidebar from "../components/Sidebar";
import { RequestQuestion } from "../types/Types";

const AddSurvey: React.FC = () => {

  const [questions, setQuestionList] = useState([]);

  const addQuestion = () => {
    setQuestionList(questions.concat())
  }

  const mapQuestions = (questions : RequestQuestion[]) => {
    questions.map((question) => {
      switch(question.type) {
        <OpenQuestion></OpenQuestion>
      }
    })
  }

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar>

      </Sidebar>
      
      <div className="h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl">
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            Title
          </div>
          <div className="text-xl font-normal">
            Description
          </div>
        </div>
        <div className="flex content-evenly">
          
          <div onClick={addQuestion}>

          </div>
        </div>
      </div>

    </Container>
  );
}

export default AddSurvey;