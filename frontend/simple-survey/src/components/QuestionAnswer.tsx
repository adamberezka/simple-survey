import React from "react"
import { QuestionType, RequestQuestion } from "../types/Types";
import OpenAnswer from "./OpenAnswer";

interface QuestionAnswerProps {
  question: RequestQuestion
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question
}) => {


  return (
    <div className="w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="text-lg font-semibold mb-4 ml-1">{question?.content}</div>
      {question.type === QuestionType.OPEN &&
        <OpenAnswer 
          value={"Xd"}
          onChange={() => null}
        />
      }
    </div>
  );
}

export default QuestionAnswer;