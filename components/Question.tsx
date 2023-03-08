import React from "react";

type QuestionProps = {
  question: string;
  answer: string;
  isExpanded: boolean;
  onQuestionClick: () => void;
};

const Question: React.FC<QuestionProps> = ({
  question,
  answer,
  isExpanded,
  onQuestionClick,
}) => {
  return (
    <div className="pt-6">
      <dt className="text-lg">
        <button
          className="text-left w-full flex justify-between items-start text-gray-400"
          onClick={onQuestionClick}
        >
          <span className="font-medium text-gray-900">{question}</span>
          <span className="ml-6 h-7 flex items-center">
            <svg
              className={`${
                isExpanded ? "-rotate-180" : "rotate-0"
              } w-6 h-6 transform`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </dt>
      {isExpanded && (
        <dd className="mt-2 pr-12">
          <p className="text-base text-gray-500">{answer}</p>
        </dd>
      )}
    </div>
  );
};

export default Question;
