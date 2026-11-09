import hmac
import hashlib
import urllib.parse
import json
from django.conf import settings

def verify_telegram_init_data(init_data_string: str) -> dict | bool:
    """
    Validates data received from Telegram Mini App against the Bot Token.
    Returns the parsed user dict if verified, False otherwise.
    """
    if not init_data_string:
        return False

    try:
        # 1. Parse the query parameters into a dictionary
        parsed_data = dict(urllib.parse.parse_qsl(init_data_string, keep_blank_values=True))
        
        if 'hash' not in parsed_data:
            return False
            
        received_hash = parsed_data.pop('hash')
        
        # 2. Sort keys alphabetically and format as key=value joined by newlines
        data_check_string = "\n".join([f"{k}={v}" for k, v in sorted(parsed_data.items())])
        
        # 3. Create the secret key using the bot token
        bot_token = settings.TELEGRAM_BOT_TOKEN
        secret_key = hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()
        
        # 4. Calculate the local validation hash
        calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
        
        # 5. Securely compare signatures to prevent timing attacks
        if hmac.compare_digest(calculated_hash, received_hash):
            # Extract and parse the nested user JSON object data
            user_json = parsed_data.get('user', '{}')
            return json.loads(user_json)
            
        return False
    except Exception:
        return False