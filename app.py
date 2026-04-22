from flask import Flask, render_template, request, jsonify 

app = Flask(__name__)

reports = []

@app.route('/')
def home():
    return render_template("index.html")

# Location-based alert
@app.route('/get_alert', methods=['POST'])
def get_alert():
    data = request.json
    lat = data['lat']

    if 10 < lat < 15:
        alert = "⚠️ Flood Warning in your region"
    elif 15 < lat < 20:
        alert = "⚠️ Cyclone Risk Area"
    else:
        alert = "✅ No major alerts"

    return jsonify({"alert": alert})

@app.route('/send_alert', methods=['POST'])
def send_alert():
    data = request.json
    message = data['message']

    cursor.execute("INSERT INTO alerts (message) VALUES (%s)", (message,))
    db.commit()

    return jsonify({"message": "Alert sent to all users"})


@app.route('/report', methods=['POST'])
def report():
    data = request.json
    new_report = {
        "name": data["name"],
        "type": data["type"],
        "message": data["message"],
    }

    reports.append(new_report)

    return jsonify({"message": "Report submitted successfully"})

@app.route('/reports')
def get_reports():
    return jsonify(reports)

if __name__ == "__main__":
    app.run(debug=True)
