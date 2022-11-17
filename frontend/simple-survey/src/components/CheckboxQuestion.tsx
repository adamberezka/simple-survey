import { FocusEventHandler } from "react";
import Question from "./Question";

interface CheckboxQuestionProps {
  title: string,
  deleteQuestion: () => void,
  onBlur: FocusEventHandler<HTMLTextAreaElement>,
  content: string
}

const CheckBoxQuestion: React.FC<CheckboxQuestionProps>= ({
  title,
  deleteQuestion,
  content,
  onBlur
}) => {
  return (
    <Question onBlur={onBlur} content={content} deleteQuestion={deleteQuestion} title={title}>
    </Question>
  );
};

export default CheckBoxQuestion;