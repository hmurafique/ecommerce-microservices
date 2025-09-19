from flask import Flask, request, jsonify
import os, time
app = Flask(__name__)

@app.route('/api/pay', methods=['POST'])
def pay():
    data = request.json or {}
    # simulate processing
    time.sleep(1)
    return jsonify({"status":"ok","transaction_id":"txn_"+str(int(time.time()))})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
