from fastapi import FastAPI, Request
from pydantic import BaseModel
import re

# Initialize FastAPI app
app = FastAPI()

# Malicious patterns for simple detection
SQLI_PATTERNS = [
    r"(?:')|(?:--)|(/\*)|(\*/)|(\bOR\b)|(\bAND\b)",
    r"(UNION SELECT|SELECT \*|DROP TABLE|INSERT INTO|DELETE FROM)",
]

XSS_PATTERNS = [
    r"(<script.*?>.*?</script>)",
    r"(onerror|onload|alert|document\.cookie)",
]

# Request model
class APIRequest(BaseModel):
    url: str
    payload: str

# Helper function to check vulnerabilities
def check_vulnerability(payload: str):
    for pattern in SQLI_PATTERNS:
        if re.search(pattern, payload, re.IGNORECASE):
            return "SQL Injection Detected"
    for pattern in XSS_PATTERNS:
        if re.search(pattern, payload, re.IGNORECASE):
            return "Cross-Site Scripting (XSS) Detected"
    return "Safe"

# Root route
@app.get("/")
async def root():
    return {"message": "API Security Scanner is running!"}

# Vulnerability detection route
@app.post("/analyze_request/")
async def analyze_request(request: APIRequest):
    result = check_vulnerability(request.payload)

    if result != "Safe":
        return {
            "status": "Suspicious API",
            "threat_type": result,
            "action": "Blocked for security reasons",
        }
    else:
        return {
            "status": "Safe API",
            "threat_type": "None",
            "accuracy": "99%",  # Simulate accuracy for now
        }
