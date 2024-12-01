import React from "react";
import {
  FaThermometerHalf,
  FaTint,
  FaCloud,
  FaWind,
  FaChartLine,
} from "react-icons/fa";

export const SENSOR_DESCRIPTIONS = {
  "Temperature[C]": {
    icon: <FaThermometerHalf />,
    description:
      "Ambient temperature in Celsius. Higher temperatures can indicate potential fire risk.",
    range: "0°C to 100°C",
    significance: "Critical for detecting heat-related anomalies",
  },
  "Humidity[%]": {
    icon: <FaTint />,
    description:
      "Relative humidity percentage. Low humidity can increase fire risk.",
    range: "0% to 100%",
    significance: "Affects combustibility of materials",
  },
  "TVOC[ppb]": {
    icon: <FaCloud />,
    description: "Total Volatile Organic Compounds in parts per billion.",
    range: "0 to 60,000 ppb",
    significance: "Indicates presence of airborne chemicals",
  },
  "eCO2[ppm]": {
    icon: <FaWind />,
    description: "Equivalent Carbon Dioxide in parts per million.",
    range: "400 to 60,000 ppm",
    significance: "Measures air quality and potential combustion",
  },
  "Pressure[hPa]": {
    icon: <FaChartLine />,
    description: "Atmospheric pressure in hectopascals.",
    range: "900 to 1100 hPa",
    significance: "Can indicate environmental changes",
  },
};

interface SensorFieldDescriptionProps {
  fieldName: keyof typeof SENSOR_DESCRIPTIONS;
}

export const SensorFieldDescription: React.FC<SensorFieldDescriptionProps> = ({
  fieldName,
}) => {
  const details = SENSOR_DESCRIPTIONS[fieldName];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-2">
        <span className="mr-2 text-2xl text-blue-500">{details.icon}</span>
        <h3 className="font-bold text-lg">{fieldName}</h3>
      </div>
      <p className="text-gray-600 mb-2">{details.description}</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <strong>Range:</strong> {details.range}
        </div>
        <div>
          <strong>Significance:</strong> {details.significance}
        </div>
      </div>
    </div>
  );
};
