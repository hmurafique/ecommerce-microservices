from flask import Flask, jsonify
import os
app = Flask(__name__)

# simple static catalog for demo (could be read from DB)
CATALOG = [
    {"id": 1, "name": "Widget A", "description":"Small widget", "price": 9.99},
    {"id": 2, "name": "Widget B", "description":"Large widget", "price": 19.99},
    {"id": 3, "name": "Gadget",   "description":"Handy gadget", "price": 29.99}
]

@app.route("/api/catalog")
def catalog():
    return jsonify(CATALOG)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
