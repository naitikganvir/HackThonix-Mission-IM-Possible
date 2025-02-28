import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Sample dataset (expand this for better results)
data = {
    "request": [
        "SELECT * FROM users WHERE username='admin'--",  # SQL Injection
        "<script>alert('XSS')</script>",                # XSS Attack
        "DELETE FROM accounts WHERE id=1",             # API abuse
        "GET /safe-api-endpoint",                      # Safe request
        "INSERT INTO users VALUES ('malicious')"       # Malicious payload
    ],
    "label": [1, 1, 1, 0, 1]  # 1 = Malicious, 0 = Safe
}

df = pd.DataFrame(data)

# Text feature extraction
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["request"])
y = df["label"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the ML model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate the model
accuracy = accuracy_score(y_test, model.predict(X_test))
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save model and vectorizer
joblib.dump(model, "api_security_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
