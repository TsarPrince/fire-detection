import {
  FaThermometerHalf,
  FaTint,
  FaCloud,
  FaWind,
  FaChartLine,
  FaFlask,
  FaLeaf,
  FaAtom,
  FaIcons,
  FaCalendar,
  FaAlignCenter,
} from "react-icons/fa";

export const SENSOR_DESCRIPTIONS = {
  UTC: {
    icon: <FaCalendar />,
    description: "Coordinated Universal Time timestamp of the sensor reading.",
    range: "Unix timestamp (seconds since January 1, 1970)",
    significance: "Provides precise temporal context for the measurement",
  },
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
    description:
      "Total Volatile Organic Compounds in parts per billion. Indicates presence of airborne chemicals that might be associated with combustion.",
    range: "0 to 60,000 ppb",
    significance:
      "Can detect early signs of potential fire through chemical emissions",
  },
  "eCO2[ppm]": {
    icon: <FaWind />,
    description:
      "Equivalent Carbon Dioxide in parts per million. Measures air quality and potential combustion indicators.",
    range: "400 to 60,000 ppm",
    significance:
      "Elevated levels can suggest increased metabolic activity or combustion",
  },
  "Raw H2": {
    icon: <FaFlask />,
    description:
      "Raw hydrogen gas concentration. Hydrogen can be a byproduct of certain chemical reactions or combustion processes.",
    range: "0 to 65,535",
    significance:
      "Can indicate chemical changes or potential fire-related reactions",
  },
  "Raw Ethanol": {
    icon: <FaAtom />,
    description:
      "Raw ethanol concentration. Ethanol is a flammable organic compound.",
    range: "0 to 65,535",
    significance: "Presence of flammable compounds can increase fire risk",
  },
  "Pressure[hPa]": {
    icon: <FaChartLine />,
    description:
      "Atmospheric pressure in hectopascals. Can indicate environmental changes that might affect fire conditions.",
    range: "900 to 1100 hPa",
    significance: "Pressure changes can influence fire behavior and spread",
  },
  "PM1.0": {
    icon: <FaLeaf />,
    description:
      "Particulate Matter 1.0 micrometers or smaller. Indicates very fine particulate concentration.",
    range: "0 to 1000 μg/m³",
    significance: "Can suggest combustion or smoke presence",
  },
  "PM2.5": {
    icon: <FaLeaf />,
    description:
      "Particulate Matter 2.5 micrometers or smaller. Indicates fine particulate concentration.",
    range: "0 to 1000 μg/m³",
    significance: "Key indicator of smoke or combustion particles",
  },
  "NC0.5": {
    icon: <FaIcons />,
    description: "Number Concentration of particles 0.5 micrometers or larger.",
    range: "0 to 1,000,000 particles/cm³",
    significance: "Measures tiny particle density in the air",
  },
  "NC1.0": {
    icon: <FaIcons />,
    description: "Number Concentration of particles 1.0 micrometers or larger.",
    range: "0 to 1,000,000 particles/cm³",
    significance: "Tracks larger particle concentration",
  },
  "NC2.5": {
    icon: <FaIcons />,
    description: "Number Concentration of particles 2.5 micrometers or larger.",
    range: "0 to 1,000,000 particles/cm³",
    significance: "Indicates presence of larger particulate matter",
  },
  CNT: {
    icon: <FaAlignCenter />,
    description:
      "Potentially a counter or cumulative measurement of sensor readings.",
    range: "Varies based on specific implementation",
    significance: "May track cumulative sensor events or readings",
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
