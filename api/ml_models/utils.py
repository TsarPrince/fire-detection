import joblib
import numpy as np
import pandas as pd

class FireAlarmPredictor:
    def __init__(self, 
                 model_path='C:\\Users\\princ\\Documents\\languages\\py\\endsem-project\\training\\out\\random_forest_model.joblib', 
                 scaler_path='C:\\Users\\princ\\Documents\\languages\\py\\endsem-project\\training\\out\\minmax_scaler.joblib'):
        """
        Initialize the predictor with pre-trained model and scaler
        """
        try:
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
        except FileNotFoundError as e: 
            raise Exception(f"Model or scaler files not found. Ensure they are in the correct directory. {e}")

    def predict(self, input_data):
        """
        Predict fire alarm status
        
        :param input_data: DataFrame or dict with sensor measurements
        :return: Prediction (0 or 1)
        """
        # Ensure input is a DataFrame
        if isinstance(input_data, dict):
            input_data = pd.DataFrame([input_data])
        
        # Scale the input data
        scaled_data = self.scaler.transform(input_data)
        
        # Make prediction
        prediction = self.model.predict(scaled_data)
        
        return int(prediction[0])  # Convert to simple integer
