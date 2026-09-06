import os

from flask import Flask, request, jsonify
from openai import OpenAI, APITimeoutError, APIError

app = Flask(__name__)


@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json(silent=True) or {}

    companion = str(data.get("companion", "")).strip()
    people = str(data.get("people", "")).strip()
    budget = str(data.get("budget", "")).strip()
    travel_style = str(data.get("style", "")).strip()
    days = str(data.get("days", "")).strip()

    if not all([companion, people, budget, travel_style, days]):
        return jsonify({
            "result": "모든 항목을 입력해 주세요."
        }), 400

    try:
        people_number = int(people)

        if people_number < 1:
            raise ValueError

    except ValueError:
        return jsonify({
            "result": "인원 수는 1명 이상으로 입력해 주세요."
        }), 400

    api_key = os.environ.get("OPENAI_API_KEY")

    if not api_key:
        return jsonify({
            "result": "AI 서비스 설정이 완료되지 않았습니다."
        }), 500

    prompt = f"""
다음 조건에 어울리는 국내 여행지를 추천해 주세요.

- 동행 유형: {companion}
- 인원: {people_number}명
- 예산: {budget}
- 여행 스타일: {travel_style}
- 여행 기간: {days}

아래 형식으로 한국어로 답변해 주세요.

[추천 여행지]
여행지 한 곳

[추천 이유]
조건에 적합한 구체적인 이유

[추천 일정]
핵심 여행 코스를 간단하게 제안

[여행 팁]
예산과 일정에 도움이 되는 실용적인 팁
"""

    try:
        client = OpenAI(api_key=api_key, timeout=20.0)

        response = client.responses.create(
            model="gpt-4.1-mini",
            input=prompt
        )

        return jsonify({
            "result": response.output_text
        })

    except APITimeoutError:
        return jsonify({
            "result": "AI 응답이 늦어지고 있습니다. 잠시 후 다시 시도해 주세요."
        }), 504

    except APIError:
        return jsonify({
            "result": "AI 서비스 연결 중 오류가 발생했습니다."
        }), 502

    except Exception:
        return jsonify({
            "result": "예상하지 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        }), 500