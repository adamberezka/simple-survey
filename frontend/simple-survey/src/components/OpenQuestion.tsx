interface QuestionProps {
  title: string,
  
}

const Question: React.FC<QuestionProps>= ({
  title,
}) => {
  return (
    <Question title={title}>
      Input
    </Question>
  );
};

export default Question;