import axios from "axios";
import { SensorData } from "../types/SensorData";

export async function predictFireAlarm(sensorData: SensorData) {
  try {
    const response = await axios.post("http://localhost:8000/api/ml/predict/", {
      UTC: Math.floor(Date.now() / 1000),
      // DO NOT SPREAD ...sensorData
      // as this specific order must be preserved
      "Temperature[C]": sensorData["Temperature[C]"],
      "Humidity[%]": sensorData["Humidity[%]"],
      "TVOC[ppb]": sensorData["TVOC[ppb]"],
      "eCO2[ppm]": sensorData["eCO2[ppm]"],
      "Raw H2": sensorData["Raw H2"],
      "Raw Ethanol": sensorData["Raw Ethanol"],
      "Pressure[hPa]": sensorData["Pressure[hPa]"],
      "PM1.0": sensorData["PM1.0"],
      "PM2.5": sensorData["PM2.5"],
      "NC0.5": sensorData["NC0.5"],
      "NC1.0": sensorData["NC1.0"],
      "NC2.5": sensorData["NC2.5"],
      CNT: sensorData.CNT,
    });
    return response.data;
  } catch (error: any) {
    alert(error.response.data.error);
    console.error("Prediction error:", error);
    throw error;
  }
}
