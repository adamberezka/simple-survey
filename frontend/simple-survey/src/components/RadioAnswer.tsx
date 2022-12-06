import React from "react"
import { RequestPossibleAnswers } from "../types/Types";
import RadioButton from "./RadioButton";

interface RadioAnswerProps {
  value: number;
  possibleAnswers: RequestPossibleAnswers[];
  onChange: (value: number) => void
}

const RadioAnswer: React.FC<RadioAnswerProps> = ({
  value,
  possibleAnswers,
  onChange
}) => {
  const handleOnChange = (value: number) => {
    onChange(value);
  }

  return (
    <div className="px-2 flex flex-col gap-y-3">
      {possibleAnswers.map(answer => (
        <div className="flex items-center gap-x-2 w-full cursor-pointer" onClick={() => handleOnChange(answer.id!)} key={answer.id}>
          <RadioButton checked={answer.id === value} />
          <div className="select-none">{answer.content}</div>
        </div>
      ))}
    </div>
  );
}

export default RadioAnswer;