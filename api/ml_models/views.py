from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import FireAlarmPredictor

class FireAlarmPredictionView(APIView):
    def post(self, request):
        """
        Endpoint for fire alarm prediction
        
        Expected input:
        {
            "Temperature[C]": 20.5,
            "Humidity[%]": 45.0,
            # ... other sensor measurements
        }
        """
        try:
            # Validate input data
            input_data = request.data
            
            # Required columns from original dataset
            required_columns = [
                'UTC', 'Temperature[C]', 'Humidity[%]', 'TVOC[ppb]', 'eCO2[ppm]', 
                'Raw H2', 'Raw Ethanol', 'Pressure[hPa]', 'PM1.0', 'PM2.5', 
                'NC0.5', 'NC1.0', 'NC2.5', 'CNT'
            ]
            
            # Check if all required columns are present
            missing_columns = set(required_columns) - set(input_data.keys())
            if missing_columns:
                return Response({
                    'error': f'Missing columns: {missing_columns}'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Create predictor and make prediction
            predictor = FireAlarmPredictor()
            prediction = predictor.predict(input_data)
            
            return Response({
                'fire_alarm': prediction,
                'status': 'Fire Detected' if prediction == 1 else 'No Fire Detected'
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
