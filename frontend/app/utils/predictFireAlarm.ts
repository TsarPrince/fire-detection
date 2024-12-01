import axios from "axios";
import { SensorData } from "../types/SensorData";

export async function predictFireAlarm(sensorData: SensorData) {
  try {
    const response = await axios.post("http://localhost:8000/api/ml/predict/", {
      UTC: Math.floor(Date.now() / 1000),
      ...sensorData,
    });
    return response.data;
  } catch (error: any) {
    alert(error.response.data.error);
    console.error("Prediction error:", error);
    throw error;
  }
}
