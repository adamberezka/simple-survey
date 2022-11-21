import React, { FocusEvent, useState } from "react"
import Container from "../components/Container";
import OpenQuestion from "../components/OpenQuestion";
import Sidebar from "../components/Sidebar";
import { QuestionType, RequestQuestion } from "../types/Types";

const AddSurvey: React.FC = () => {

  const [questions, setQuestionList] = useState<RequestQuestion[]>([]);

  const addQuestion = (type: QuestionType) => {
    setQuestionList([...questions, {
      content: "",
      type: type,
      possibleAnswers: []
    }])
  }
  
  const deleteQuestion = (index: number) => {
    questions.splice(index, 1);
    setQuestionList([...questions]);
  }

  const setContent = (index: number, content: string) => {
      console.log("OnBlur: " + content);
      questions[index].content = content;
  }

  const updateQuestion = (index: number) => (value: string) => {
    let newQuestions = questions;
    newQuestions[index].content = value;
    setQuestionList([ ...newQuestions ]);
  }

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar>

      </Sidebar>
      
      <div className="h-[90%] w-[90%] m-10 py-6 px-12 shadow-lg border-0 border-[#bbbbbb] bg-white rounded-2xl overflow-y-scroll">
        <div className="mb-6">
          <div className="text-4xl font-bold mb-2">
            Title
          </div>
          <div className="text-xl font-normal">
            Description
          </div>
        </div>
        <div>
          <div className="flex flex-col w-full gap-y-4">
            {questions.map((question, index) => 
              <OpenQuestion 
                onBlur={(e: FocusEvent<HTMLTextAreaElement>) => setContent(index, e.target.value)} 
                content={question.content} deleteQuestion={() => deleteQuestion(index)} 
                title={question.type}
                updateQuestion={updateQuestion(index)}
              />
            )}
          </div>
          <div className="w-full flex flex-row justify-center">
            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.OPEN)}>
              + Add Open Question
            </div>

            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.CHECKBOX)}>
              + Add Checkbox Question
            </div>

            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.RADIO)}>
              + Add Radio Button Question
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default AddSurvey;