import { FocusEventHandler } from "react";
import { RequestQuestion } from "../types/Types";
import Question from "./Question";
import TextArea from "./TextArea";

interface OpenQuestionProps {
  title: string,
  index: number,
  deleteQuestion: () => void,
  updateQuestion: (value: string) => void,
  content: string
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({
  title,
  index,
  deleteQuestion,
  updateQuestion,
  content
}) => {
  return (
    <div className="w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="flex justify-center items-center text-white absolute -top-2 -right-2 h-6 w-6 bg-[#f03232] rounded-full cursor-pointer" onClick={deleteQuestion}>
        <div className="font-bold">
          X
        </div>
      </div>
      <div className="text-lg font-semibold mb-4 ml-1">{`${index + 1} - ${title} question`}</div>
      <Question  content={content} updateQuestion={updateQuestion} />
    </div>
  );
};

export default OpenQuestion;