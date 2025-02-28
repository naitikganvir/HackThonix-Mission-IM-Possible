import requests
from fastapi import FastAPI, Request

app = FastAPI()

# Replace with your Slack Webhook URL
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"


def send_slack_alert(ip: str, threat_score: int):
    """Send alert to Slack when a threat is detected."""
    message = {
        "text": f"🚨 *Suspicious API Request Detected!* 🚨\n\n🔍 *IP Address:* {ip}\n⚠️ *Threat Score:* {threat_score}%\n🛡️ *Action:* Request Blocked"
    }

    try:
        response = requests.post(SLACK_WEBHOOK_URL, json=message)
        response.raise_for_status()
    except Exception as e:
        print(f"Slack Alert Error: {e}")


@app.middleware("http")
async def threat_detection_middleware(request: Request, call_next):
    """Middleware to check and block suspicious requests."""
    client_ip = request.client.host

    # Dummy threat score (replace with ML or threat feed logic)
    threat_score = 75 if "malicious" in request.url.path else 0

    if threat_score > 50:  # Block if score > 50%
        send_slack_alert(client_ip, threat_score)
        return {"message": "Suspicious activity detected. Request blocked.", "threat_score": threat_score}

    response = await call_next(request)
    return response


@app.get("/")
def read_root():
    return {"message": "API Security Scanner Running"}

