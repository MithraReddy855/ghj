from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Simulated in-memory user database
users = {}

FACEBOOK_APP_ID = "1793215161406587"
FACEBOOK_APP_SECRET = "e35300f5afd48eaacd1474786132df65"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if email in users:
        return jsonify({"error": "User already exists"}), 400

    users[email] = {"password": password}
    return jsonify({"message": "Signup successful"}), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if users.get(email, {}).get("password") == password:
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/facebook-auth", methods=["POST"])
def facebook_auth():
    data = request.get_json()
    token = data.get("accessToken")
    user = data.get("user")

    if not token or not user:
        return jsonify({"error": "Missing token or user data"}), 400

    verify_url = f"https://graph.facebook.com/debug_token?input_token={token}&access_token={FACEBOOK_APP_ID}|{FACEBOOK_APP_SECRET}"
    try:
        r = requests.get(verify_url).json()
    except requests.RequestException:
        return jsonify({"error": "Failed to verify Facebook token"}), 500

    if r.get("data", {}).get("is_valid"):
        return jsonify({
            "message": f"Welcome {user.get('name')}",
            "email": user.get("email"),
            "picture": user.get("picture", {}).get("data", {}).get("url")
        }), 200

    return jsonify({"error": "Invalid Facebook token"}), 401

if __name__ == "__main__":
    app.run(debug=True, port=5000)
