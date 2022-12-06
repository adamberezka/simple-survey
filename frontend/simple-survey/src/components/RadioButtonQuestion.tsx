import { FocusEventHandler, useState } from "react";
import { RequestPossibleAnswers } from "../types/Types";
import PossibleAnswer from "./PossibleAnswer";
import Question from "./Question";

interface RadioButtonQuestionProps {
  content: string,
  title: string,
  index: number,
  deleteQuestion: () => void,
  updateQuestion: (value: string) => void,
  answers: RequestPossibleAnswers[],
  addAnswer: () => void,
  deleteAnswer: (index: number) => void,
  updateAnswer: (index: number) => (value: string) => void,
}

const RadioButtonQuestion: React.FC<RadioButtonQuestionProps>= ({
  content,
  title,
  index,
  deleteQuestion,
  updateQuestion,
  answers,
  addAnswer,
  deleteAnswer,
  updateAnswer,
}) => {
  return (
    <div className="w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="flex justify-center items-center text-white absolute -top-2 -right-2 h-6 w-6 bg-[#f03232] rounded-full cursor-pointer" onClick={deleteQuestion}>
        <div className="font-bold">
          X
        </div>
      </div>
      <div className="text-lg font-semibold mb-4 ml-1">{`${index + 1} - ${title} question`}</div>
      <Question content={content} updateQuestion={updateQuestion} />
      <div className="mt-3 pl-2 flex flex-col gap-y-1">
        {answers.map((answer: RequestPossibleAnswers, index: number) => 
          <PossibleAnswer 
            key={index}
            content={answer.content}
            type="radio"
            deleteAnswer={() => deleteAnswer(index)}
            updateAnswer={updateAnswer(index)}
          />
        )}
      </div>
      <div className="cursor-pointer flex items-center justify-center gap-x-4 mt-3 pl-2 rounded-2xl border-solid border-primary border-2 py-1.5" onClick={() => addAnswer()}>
        <div className="h-6 w-6 p-0  flex justify-center items-center text-primary font-extrabold text-lg">
          <div className="-mt-1">+</div>
        </div>
        <div className="font-bold text-primary">Add possible answer</div>
      </div>
    </div>
  );
}

export default RadioButtonQuestion;