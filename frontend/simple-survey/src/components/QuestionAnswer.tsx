import React from "react"
import { QuestionAnswerRequest, QuestionType, RequestPossibleAnswers, RequestQuestion } from "../types/Types";
import CheckboxAnswer from "./CheckboxAnswer";
import OpenAnswer from "./OpenAnswer";
import RadioAnswer from "./RadioAnswer";

interface QuestionAnswerProps {
  question: RequestQuestion;
  possibleAnswers: RequestPossibleAnswers[];
  answer: string | number | number[];
  updateAnswer: (answer: string | number | number[]) => void
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  possibleAnswers,
  answer,
  updateAnswer
}) => {
  return (
    <div className="w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="text-lg font-semibold mb-4 px-1 overflow-hidden">{question?.content}</div>
      {question.type === QuestionType.OPEN &&
        <OpenAnswer 
          value={answer as string || ""}
          onChange={updateAnswer}
        />
      }
      {question.type === QuestionType.CHECKBOX &&
        <CheckboxAnswer 
          values={answer as number[] || []}
          possibleAnswers={possibleAnswers}
          onChange={updateAnswer}
        />
      }
      {question.type === QuestionType.RADIO &&
        <RadioAnswer 
          value={answer as number}
          possibleAnswers={possibleAnswers}
          onChange={updateAnswer}
        />
      }
    </div>
  );
}

export default QuestionAnswer;