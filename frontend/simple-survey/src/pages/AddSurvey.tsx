import React, { FocusEvent, useState } from "react"
import CheckBoxQuestion from "../components/CheckboxQuestion";
import Container from "../components/Container";
import OpenQuestion from "../components/OpenQuestion";
import RadioButtonQuestion from "../components/RadioButtonQuestion";
import Sidebar from "../components/Sidebar";
import { QuestionType, RequestQuestion } from "../types/Types";

const addQuestion = (type: QuestionType, setQuestionList: Function, questions: RequestQuestion[]) => {
  setQuestionList([...questions, {
    content: "",
    type: type,
    possibleAnswers: []
  }])
}

const deleteQuestion = (index: number, setQuestionList: Function, questions: RequestQuestion[]) => {
  questions.splice(index, 1);
  setQuestionList([...questions]);
}

const updateQuestion = (index: number, setQuestionList: Function, questions: RequestQuestion[]) => (value: string) => {
  let newQuestions = questions;
  newQuestions[index].content = value;
  setQuestionList([ ...newQuestions ]);
}

const addAnswer = (index: number, setQuestionList: Function, questions: RequestQuestion[]) => {
  let newQuestions = questions;
  newQuestions[index].possibleAnswers.push({content: ""});
  setQuestionList([ ...newQuestions ]);
}

const deleteAnswer = (index: number, setQuestionList: Function, questions: RequestQuestion[]) => (answerIndex: number) => {
  let newQuestions = questions;
  newQuestions[index].possibleAnswers.splice(answerIndex, 1);
  setQuestionList([ ...newQuestions ]);
}

const updateAnswer = (index: number, setQuestionList: Function, questions: RequestQuestion[]) => (answerIndex: number) => (value: string) => {
  let newQuestions = questions;
  newQuestions[index].possibleAnswers[answerIndex].content = value;
  setQuestionList([ ...newQuestions ]);
}

const AddSurvey: React.FC = () => {
  const [questions, setQuestionList] = useState<RequestQuestion[]>([]);

  return (
    <Container className="bg-body-text w-screen h-screen">
      <Sidebar />
      
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
            {questions.map((question, index) => {
              
              if (question.type === QuestionType.OPEN)
                return <OpenQuestion 
                  index={index}
                  content={question.content} deleteQuestion={() => deleteQuestion(index, setQuestionList, questions)} 
                  title={question.type}
                  updateQuestion={updateQuestion(index, setQuestionList, questions)}
                />

              if (question.type === QuestionType.CHECKBOX)
                return <CheckBoxQuestion
                  index={index} 
                  content={question.content} deleteQuestion={() => deleteQuestion(index, setQuestionList, questions)} 
                  title={question.type}
                  answers={question.possibleAnswers}
                  addAnswer={() => addAnswer(index, setQuestionList, questions)}
                  updateQuestion={updateQuestion(index, setQuestionList, questions)}
                  deleteAnswer={deleteAnswer(index, setQuestionList, questions)}
                  updateAnswer={updateAnswer(index, setQuestionList, questions)}
                />

              if (question.type === QuestionType.RADIO)
                return <RadioButtonQuestion 
                  index={index}
                  content={question.content} deleteQuestion={() => deleteQuestion(index, setQuestionList, questions)} 
                  title={question.type}
                  answers={question.possibleAnswers}
                  addAnswer={() => addAnswer(index, setQuestionList, questions)}
                  updateQuestion={updateQuestion(index, setQuestionList, questions)}
                  deleteAnswer={deleteAnswer(index, setQuestionList, questions)}
                  updateAnswer={updateAnswer(index, setQuestionList, questions)}
                />
            }
            )}
          </div>
          <div className="w-full flex flex-row justify-center mt-4">
            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.OPEN, setQuestionList, questions)}>
              + Add Open Question
            </div>

            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.CHECKBOX, setQuestionList, questions)}>
              + Add Checkbox Question
            </div>

            <div className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#1cf038] rounded-2xl text-center w-60 h-8 font-semibold" onClick={() => addQuestion(QuestionType.RADIO, setQuestionList, questions)}>
              + Add Radio Button Question
            </div>
          </div>
        </div>
      </div>

    </Container>
  );
}

export default AddSurvey;