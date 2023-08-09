import React, { useState } from "react";

const FaqPage = () => {
  const faqData = [
    {
      question: "How do I search for job listings?",
      answer:
        "You can use the search bar on the homepage to search for job listings based on keywords, categories, or locations.",
    },
    {
      question: "How do I create a job seeker profile?",
      answer:
        "Click on the 'Sign Up' button and select the 'Job Seeker' option. Fill out the required information and create your profile.",
    },
    {
      question: "How can employers post job openings?",
      answer:
        "Employers can create an account and choose the 'Employer' option during sign up. After logging in, they can post job openings from the dashboard.",
    },
    {
      question: "How do I apply for a job?",
      answer:
        "Once you've found a job listing you're interested in, click on the 'Apply Now' button and follow the instructions to submit your application.",
    },
    {
      question: "Can I edit my job application after submitting?",
      answer:
        "No, you cannot edit your application after submitting. Make sure to review your application before submitting.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-orange-600 mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b py-3">
              <button
                className="flex justify-between items-center w-full text-lg font-semibold focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-slate-600">{faq.question}</span>
                <span className="text-orange-600">{expandedIndex === index ? "▲" : "▼"}</span>
              </button>
              {expandedIndex === index && <p className="text-gray-700 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
