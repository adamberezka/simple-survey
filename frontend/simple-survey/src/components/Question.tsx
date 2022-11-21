import React, { FocusEventHandler, useState } from 'react';
import { RequestQuestion } from '../types/Types';
import TextArea from './TextArea';

interface QuestionProps {
  children?: React.ReactNode,
  title?: string,
  deleteQuestion: () => void,
  updateQuestion?: (value: string) => void,
  onBlur: FocusEventHandler<HTMLTextAreaElement>,
  content: string
}

const Question: React.FC<QuestionProps>= ({
  title,
  children,
  deleteQuestion,
  updateQuestion,
  onBlur,
  content
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion && updateQuestion(e.target.value);
  }

  return (
    <div className="flex flex-col w-full rounded-2xl border p-4 border-[#d6d6d6] relative">
      <div className="flex justify-center items-center text-white absolute -top-2 -right-2 h-6 w-6 bg-[#FF0000] rounded-full cursor-pointer" onClick={deleteQuestion}>
        <div className="font-bold">
          X
        </div>
      </div>
      <TextArea onChange={(e) => handleOnChange(e)} value={content} placeholder="Your question"/>
      {children}
    </div>
  );
};

export default Question;
