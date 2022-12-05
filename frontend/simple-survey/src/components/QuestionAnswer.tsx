import React from "react"
import { QuestionAnswerRequest, QuestionType, RequestQuestion } from "../types/Types";
import OpenAnswer from "./OpenAnswer";

interface QuestionAnswerProps {
  question: RequestQuestion;
  content: string | QuestionAnswerRequest | QuestionAnswerRequest[];
  updateAnswer: (content: string | QuestionAnswerRequest | QuestionAnswerRequest[]) => void
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  content,
  updateAnswer
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