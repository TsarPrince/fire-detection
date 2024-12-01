from django.urls import path
from .views import FireAlarmPredictionView

urlpatterns = [
    path('predict/', FireAlarmPredictionView.as_view(), name='fire-alarm-prediction'),
]
