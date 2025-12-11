import React from "react";

export default function Sidebar({ currentStep, setCurrentStep, completedSteps }) {
  const steps = ["Personal Details", "Bank Details", "GST Details", "Documents"];

  return (
    <div className="bg-white shadow-lg border-r w-72 h-screen px-6 py-8">
      <h1 className="text-2xl font-bold text-orange-600 mb-10 flex items-center gap-2">
        🚚 Ride<span className="text-gray-800">On</span>
      </h1>
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isDisabled = index > 0 && !completedSteps.includes(index - 1);

          return (
            <button
              key={index}
              onClick={() => !isDisabled && setCurrentStep(index)}
              disabled={isDisabled}
              className={`w-full text-left group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentStep === index
                  ? "bg-orange-100 text-orange-600 font-semibold ring-2 ring-orange-500"
                  : isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium border ${
                  currentStep === index
                    ? "bg-orange-500 text-white"
                    : isDisabled
                    ? "bg-gray-200 text-gray-400 border-gray-300"
                    : "bg-white border-gray-300 text-gray-500 group-hover:border-orange-500"
                }`}
              >
                {index + 1}
              </span>
              {step}
            </button>
          );
        })}
      </div>
    </div>
  );
}
