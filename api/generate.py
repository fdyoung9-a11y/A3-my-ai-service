from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json()
    destination = data.get("destination", "").strip()

    if not destination:
        return jsonify({
            "result": "여행지를 입력해주세요."
        }), 400

    recommendation = f"{destination} 여행을 추천합니다! 대표 명소, 맛집, 휴식 코스를 함께 즐겨보세요."

    return jsonify({
        "result": recommendation
    })