import React from "react"
import { RequestPossibleAnswers } from "../types/Types";
import Checkbox from "./Checkbox";

interface CheckboxAnswerProps {
  values: number[];
  possibleAnswers: RequestPossibleAnswers[];
  onChange: (values: number[]) => void;
  disabled?: boolean
}

const CheckboxAnswer: React.FC<CheckboxAnswerProps> = ({
  values,
  possibleAnswers,
  onChange,
  disabled = false
}) => {
  const handleOnChange = (value: number) => {
    if (!values.includes(value)) {
      onChange([...values, value]);
    } else {
      onChange(values.filter(answerId => answerId !== value));
    }
  }

  return (
    <div className={`px-2 flex flex-col gap-y-3 ${disabled ? "pointer-events-none" : ""}`}>
      {possibleAnswers.map(answer => (
        <div className="flex items-center gap-x-2 w-full cursor-pointer" onClick={() => handleOnChange(answer.id!)} key={answer.id}>
          <Checkbox checked={values.includes(answer.id!)}/>
          <div className="select-none">{answer.content}</div>
        </div>
      ))}
    </div>
  );
}

export default CheckboxAnswer;