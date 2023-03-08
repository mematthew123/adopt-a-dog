import React, { useState } from "react";
import Question from "../components/Question";

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const questions: Faq[] = [
  {
    id: 1,
    question: "What is Adopt MT?",
    answer:
      "Adopt MT is a website that helps connect potential pet owners with animal shelters and rescues in Montana.",
  },
  {
    id: 2,
    question: "How can I adopt a pet?",
    answer:
      "To adopt a pet, simply browse our listings of available animals and contact the shelter or rescue organization to start the adoption process.",
  },
  {
    id: 3,
    question: "What are the adoption fees?",
    answer:
      "Adoption fees vary depending on the shelter or rescue organization, as well as the animal being adopted. Please contact the organization for more information.",
  },
  {
    id: 4,
    question: "What should I expect during the adoption process?",
    answer:
      "The adoption process typically involves filling out an application, meeting with the animal, and potentially undergoing a home check. The organization will be able to provide more specific information about their adoption process.",
  },
  {
    id: 5,
    question: "Can I adopt a pet if I live outside of Montana?",
    answer:
      "Adopt MT focuses on connecting potential pet owners with animal shelters and rescues in Montana, so we recommend searching for organizations in your local area.",
  },
];

const FAQ: React.FC = () => {
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<number[]>([]);

  const handleQuestionClick = (id: number) => {
    if (expandedQuestionIds.includes(id)) {
      setExpandedQuestionIds(expandedQuestionIds.filter((q) => q !== id));
    } else {
      setExpandedQuestionIds([...expandedQuestionIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {questions.map((q) => (
            <Question
              key={q.id}
              question={q.question}
              answer={q.answer}
              isExpanded={expandedQuestionIds.includes(q.id)}
              onQuestionClick={() => handleQuestionClick(q.id)}
            />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
