import React from 'react';

interface QuestionProps {
  children?: React.ReactNode,
  title?: string
}

const Question: React.FC<QuestionProps>= ({
  title,
  children
}) => {
  return (
    <>
      {title}
      {children}
    </>
  );
};

export default Question;
