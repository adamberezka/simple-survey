import { FocusEventHandler } from "react";
import Question from "./Question";

interface RadioButtonQuestionProps {
  title: string,
  deleteQuestion: () => void,
  onBlur: FocusEventHandler<HTMLTextAreaElement>,
  content: string
}

const RadioButtonQuestion: React.FC<RadioButtonQuestionProps>= ({
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

export default RadioButtonQuestion;