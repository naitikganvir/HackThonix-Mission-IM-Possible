import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
data = pd.read_csv("api_security_dataset.csv")

# Split features and labels
X = data[['sql_injection', 'xss', 'csrf', 'ssrf', 'rce', 'dir_traversal']]
y = data['label']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "api_security_model.pkl")

# Print accuracy
accuracy = model.score(X_test, y_test)
print(f"Model trained successfully! Accuracy: {accuracy * 100:.2f}%")
