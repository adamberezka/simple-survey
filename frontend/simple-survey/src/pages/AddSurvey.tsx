import React, { useState } from "react"
import Container from "../components/Container";
import OpenQuestion from "../components/OpenQuestion";
import Sidebar from "../components/Sidebar";
import { QuestionType, RequestQuestion } from "../types/Types";

const AddSurvey: React.FC = () => {

  const [questions, setQuestionList] = useState<RequestQuestion[]>([]);

  const addQuestion = () => {
    setQuestionList([...questions, {
      content: "",
      type: QuestionType.OPEN,
      possibleAnswers: []
    }])
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
          <div>
            {questions.map((question) => 
              <OpenQuestion title="XDXDXDXDXDXD"></OpenQuestion>
            )}
          </div>

          <div onClick={() => addQuestion()}>
            +
          </div>
        </div>
      </div>

    </Container>
  );
}

export default AddSurvey;