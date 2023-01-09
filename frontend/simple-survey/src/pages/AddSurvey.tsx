import React, { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckBoxQuestion from "../components/CheckboxQuestion";
import Container from "../components/Container";
import ContainerContent from "../components/ContainerContent";
import Loading from "../components/Loading";
import OpenQuestion from "../components/OpenQuestion";
import RadioButtonQuestion from "../components/RadioButtonQuestion";
import TextArea from "../components/TextArea";
import { createSurvey } from "../services/BackendService";
import { QuestionType, ReduxState, RequestQuestion } from "../types/Types";

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

const isSurveyValid = (questions: RequestQuestion[]) => {
  if (!!questions.find(question => !question.content.length))
    return false;

  if (questions.some(question => question.type !== QuestionType.OPEN && !question.possibleAnswers.length))
    return false;

  if (questions.some(question => question.possibleAnswers.some(answer => !answer.content.length)))
    return false;

  return true;
}

const AddSurvey: React.FC = () => {
  const [questions, setQuestionList] = useState<RequestQuestion[]>([]);
  const [title, setTitle] = useState<string>("Survey title");
  const [description, setDescription] = useState<string>("Survey description");
  const [loading, setLoading] = useState<boolean>(false);
  const {ownerId, jwt} = useSelector<ReduxState, {ownerId: number, jwt: string}>(state => ({ownerId: state.user?.id, jwt: state.user?.jwt}));
  const navigate = useNavigate();

  const surveyValid = isSurveyValid(questions);
  
  const handleSubmit = () => {
    setLoading(true);
    createSurvey({ownerId, title, description, questions}, jwt)
      .then(_res => {
        navigate("/surveys");
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <Container>
      <ContainerContent>
        {loading ? 
        (<div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Loading />
            Submitting your survey, please wait...
          </div>
        </div>) :
        <>
          <div className="mb-6">
            <TextArea 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Survey title"
              inputClassName="text-4xl font-bold mb-2 outline-none border-0"
            />
            <TextArea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Survey description"
              inputClassName="text-xl font-normal mb-2 outline-none border-0"
            />
          </div>
          <div>
            <div className="flex flex-col w-full gap-y-4">
              {// eslint-disable-next-line array-callback-return
              questions.map((question, index) => {
                
                if (question.type === QuestionType.OPEN)
                  return <OpenQuestion 
                    key={index}
                    index={index}
                    content={question.content} deleteQuestion={() => deleteQuestion(index, setQuestionList, questions)} 
                    title={question.type}
                    updateQuestion={updateQuestion(index, setQuestionList, questions)}
                  />

                if (question.type === QuestionType.CHECKBOX)
                  return <CheckBoxQuestion
                    key={index}
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
                    key={index}
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
              <div 
                className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#25ea3f] rounded-2xl text-center w-60 h-8 font-semibold" 
                onClick={() => addQuestion(QuestionType.OPEN, setQuestionList, questions)}
              >
                + Add Open Question
              </div>

              <div 
                className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#25ea3f] rounded-2xl text-center w-60 h-8 font-semibold" 
                onClick={() => addQuestion(QuestionType.CHECKBOX, setQuestionList, questions)}
              >
                + Add Checkbox Question
              </div>

              <div 
                className="m-4 flex flex-row justify-center items-center cursor-pointer text-body-text bg-[#25ea3f] rounded-2xl text-center w-60 h-8 font-semibold" 
                onClick={() => addQuestion(QuestionType.RADIO, setQuestionList, questions)}
              >
                + Add Radio Button Question
              </div>
            </div>
          </div>
          
          {!!questions.length && 
          <div className="flex justify-center items-center mt-4"> 
            <div className={surveyValid ? "cursor-pointer" : "cursor-not-allowed"}>
              <div 
                className={`text-xl flex-grow-0 rounded-2xl bg-primary text-white px-12 py-2 select-none ${!surveyValid && "pointer-events-none"}`} 
                onClick={() => handleSubmit()}
              >
                Submit survey
              </div>
            </div>
          </div>
          }
        </>}
      </ContainerContent>
    </Container>
  );
}

export default AddSurvey;