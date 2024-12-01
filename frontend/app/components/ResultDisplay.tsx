import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

interface ResultDisplayProps {
  result: {
    fire_alarm: number;
    status: string;
  };
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const isFireDetected = result.fire_alarm === 1;

  return (
    <div
      className={`
      p-6 rounded-lg shadow-xl flex items-center 
      ${
        isFireDetected
          ? "bg-red-100 border-4 border-red-500"
          : "bg-green-100 border-4 border-green-500"
      }
    `}
    >
      {isFireDetected ? (
        <FaExclamationTriangle className="text-5xl text-red-600 mr-4" />
      ) : (
        <FaCheckCircle className="text-5xl text-green-600 mr-4" />
      )}
      <div>
        <h2
          className={`
          text-2xl font-bold mb-2 
          ${isFireDetected ? "text-red-800" : "text-green-800"}
        `}
        >
          {result.status}
        </h2>
        <p
          className={`
          ${isFireDetected ? "text-red-600" : "text-green-600"}
        `}
        >
          {isFireDetected
            ? "Warning: Potential fire detected! Take immediate action."
            : "No immediate fire risk detected."}
        </p>
      </div>
    </div>
  );
};
