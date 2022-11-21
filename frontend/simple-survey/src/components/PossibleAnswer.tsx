import React from "react";
import TextArea from "./TextArea";

interface PossibleAnswerProps {
  content: string,
  type?: "radio" | "checkbox" | null,
  deleteAnswer: () => void,
  updateAnswer: (value: string) => void,
}

const PossibleAnswer: React.FC<PossibleAnswerProps> = ({
  content,
  type = null,
  deleteAnswer,
  updateAnswer,
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer(e.target.value);
  }

  return (
    <div className="w-full relative flex gap-x-2 items-center">
      <div className="flex justify-center items-center text-white absolute -top-2 -right-2 h-6 w-6 bg-[#f03232] rounded-full cursor-pointer" onClick={deleteAnswer}>
        <div className="font-bold">
          X
        </div>
      </div>
      <div className={`h-6 w-6 border-solid border-2 border-primary ${type === "checkbox" ? "rounded-md -mt-1" : "rounded-full -mt-1.5"}`}></div>
      <TextArea onChange={(e) => handleOnChange(e)} value={content} placeholder="Your answer"/>
    </div>
  )
}

export default PossibleAnswer;