import Question from "./Question";

interface OpenQuestionProps {
  title: string,

}

const OpenQuestion: React.FC<OpenQuestionProps>= ({
  title,
}) => {
  return (
    <Question title={title}>
      Input
    </Question>
  );
};

export default OpenQuestion;