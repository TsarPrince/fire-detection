import React, { useState } from "react";
import { SensorData } from "../types/SensorData";
import { predictFireAlarm } from "../utils/predictFireAlarm";
import {
  SENSOR_DESCRIPTIONS,
  SensorFieldDescription,
} from "./SensorFieldDescription";
import { ResultDisplay } from "./ResultDisplay";

export const FireAlarmForm: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    "Temperature[C]": 22.5,
    "Humidity[%]": 45.0,
    "TVOC[ppb]": 300,
    "eCO2[ppm]": 400,
    "Raw H2": 15000,
    "Raw Ethanol": 20000,
    "Pressure[hPa]": 1013.25,
    "PM1.0": 10,
    "PM2.5": 15,
    "NC0.5": 100,
    "NC1.0": 50,
    "NC2.5": 25,
    CNT: 1000,
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SensorData, value: number) => {
    setSensorData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setResult(null);
      const predictionResult = await predictFireAlarm(sensorData);
      setResult(predictionResult);
      setError(null);
    } catch (err) {
      console.log({ err });
      setError("Prediction failed. Please check your input.");
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Fire Alarm Prediction System
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {(Object.keys(sensorData) as Array<keyof SensorData>).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                {field}
              </label>
              <input
                type="number"
                step="0.1"
                value={sensorData[field]}
                onChange={(e) =>
                  handleInputChange(field, parseFloat(e.target.value))
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Predict Fire Risk
          </button>

          {error && (
            <div className="mt-4 text-red-500 text-center">{error}</div>
          )}
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Sensor Input Details</h2>
          {/* random_forest_explainability_analysis */}
          {[
            // "CNT",
            // "UTC",
            "Pressure[hPa]",
            "TVOC[ppb]",
            "Raw Ethanol",
            "Humidity[%]",
            "Raw H2",
            "NC0.5",
            "Temperature[C]",
            // "PM1.0",
            // "PM2.5",
            // "eCO2[ppm]",
            // "NC1.0",
            // "NC2.5",
          ].map((field) => (
            <SensorFieldDescription
              key={field}
              fieldName={field as keyof typeof SENSOR_DESCRIPTIONS}
            />
          ))}
        </div>
      </div>

      {result && (
        <div className="mt-8">
          <ResultDisplay result={result} />
        </div>
      )}
    </div>
  );
};
