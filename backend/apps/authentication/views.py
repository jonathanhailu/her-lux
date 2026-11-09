from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import jwt
from datetime import datetime, timedelta
from apps.authentication.utils import verify_telegram_init_data

class TelegramAuthView(APIView):
    def post(self, request):
        init_data = request.data.get('init_data')
        
        # 🚀 DEVELOPER BYPASS: If testing locally, immediately auto-login
        if settings.DEBUG:
            mock_user = {
                "id": 12345678, 
                "first_name": "Jonathan", 
                "username": "jonat"
            }
            
            payload = {
                'user_id': mock_user['id'],
                'exp': datetime.utcnow() + timedelta(days=7)
            }
            token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')
            
            return Response({
                "token": token,
                "user": mock_user,
                "message": "Debug mock login successful!"
            }, status=status.HTTP_200_OK)

        # --- PRODUCTION VALIDATION ENGINE ---
        if not init_data:
            return Response({"error": "Missing init_data payload"}, status=status.HTTP_400_BAD_REQUEST)

        user_data = verify_telegram_init_data(init_data)
        if not user_data:
            return Response({"error": "Invalid cryptographic signature"}, status=status.HTTP_401_UNAUTHORIZED)
            
        # Optional: You can handle user registration/retrieval models here later
        payload = {
            'user_id': user_data.get('id'),
            'exp': datetime.utcnow() + timedelta(days=7)
        }
        token = jwt.encode(payload, settings.JWT_SECRET, algorithm='HS256')

        return Response({
            "token": token,
            "user": user_data,
            "message": "Authentication successful!"
        }, status=status.HTTP_200_OK)