import { FocusEventHandler } from "react";
import { RequestQuestion } from "../types/Types";
import Question from "./Question";
import TextArea from "./TextArea";

interface OpenQuestionProps {
  title: string,
  deleteQuestion: () => void,
  updateQuestion: (value: string) => void,
  onBlur: FocusEventHandler<HTMLTextAreaElement>,
  content: string
}

const OpenQuestion: React.FC<OpenQuestionProps> = ({
  title,
  deleteQuestion,
  updateQuestion,
  onBlur,
  content
}) => {
  return (
    <Question onBlur={onBlur} content={content} deleteQuestion={deleteQuestion} title={title} updateQuestion={updateQuestion}>
    </Question>
  );
};

export default OpenQuestion;