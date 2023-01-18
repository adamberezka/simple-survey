import React from "react"
import { QuestionType, RequestPossibleAnswers, RequestQuestion } from "../types/Types";
import CheckboxAnswer from "./CheckboxAnswer";
import OpenAnswer from "./OpenAnswer";
import RadioAnswer from "./RadioAnswer";

interface QuestionAnswerProps {
  question: RequestQuestion;
  possibleAnswers: RequestPossibleAnswers[];
  answer: string | number | number[];
  updateAnswer: (answer: string | number | number[]) => void,
  disabled?: boolean
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  possibleAnswers,
  answer,
  updateAnswer,
  disabled = false
}) => {
  return (
    <div className="w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="text-lg font-semibold mb-4 px-1 overflow-hidden">{question?.content}</div>
      {question.type === QuestionType.OPEN &&
        <OpenAnswer 
          value={answer as string || ""}
          onChange={updateAnswer}
          disabled={disabled}
        />
      }
      {question.type === QuestionType.CHECKBOX &&
        <CheckboxAnswer 
          values={answer as number[] || []}
          possibleAnswers={possibleAnswers}
          onChange={updateAnswer}
          disabled={disabled}
        />
      }
      {question.type === QuestionType.RADIO &&
        <RadioAnswer 
          value={answer as number}
          possibleAnswers={possibleAnswers}
          onChange={updateAnswer}
          disabled={disabled}
        />
      }
    </div>
  );
}

export default QuestionAnswer;