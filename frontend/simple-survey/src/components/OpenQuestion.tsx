import { FocusEventHandler } from "react";
import Question from "./Question";
import TextArea from "./TextArea";

interface OpenQuestionProps {
  title: string,
  deleteQuestion: () => void,
  onBlur: FocusEventHandler<HTMLTextAreaElement>,
  content: string
}

const OpenQuestion: React.FC<OpenQuestionProps>= ({
  title,
  deleteQuestion,
  onBlur,
  content
}) => {
  return (
    <Question onBlur={onBlur} content={content} deleteQuestion={deleteQuestion} title={title}>
    </Question>
  );
};

export default OpenQuestion;