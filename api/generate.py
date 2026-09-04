from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.get_json(silent=True) or {}

    companion = data.get("companion", "").strip()
    budget = data.get("budget", "").strip()
    style = data.get("style", "").strip()
    days = data.get("days", "").strip()

    try:
        people = int(data.get("people", 0))
    except (ValueError, TypeError):
        people = 0

    if not companion or not budget or not style or not days or people < 1:
        return jsonify({
            "result": "입력값이 올바르지 않습니다. 모든 항목을 정확히 입력해주세요."
        })

    recommendation = "서울"
    reason = "다양한 관광, 맛집, 체험 코스를 자유롭게 즐길 수 있습니다."

    if companion == "혼자":
        if style == "힐링":
            recommendation = "강릉"
            reason = "조용한 바다와 카페 거리에서 여유롭게 쉬기 좋습니다."
        elif style == "맛집":
            recommendation = "전주"
            reason = "혼자서도 부담 없이 즐길 수 있는 맛집과 한옥마을이 잘 어울립니다."
        elif style == "관광":
            recommendation = "경주"
            reason = "역사 유적지와 산책 코스를 천천히 둘러보기 좋습니다."
        elif style == "액티비티":
            recommendation = "속초"
            reason = "바다와 산을 함께 즐기며 활동적인 여행을 하기 좋습니다."

    elif companion == "친구":
        if style == "힐링":
            recommendation = "강릉"
            reason = "카페, 바다, 드라이브 코스를 친구들과 편하게 즐기기 좋습니다."
        elif style == "맛집":
            recommendation = "대구"
            reason = "먹거리와 도심 여행을 함께 즐기기에 좋습니다."
        elif style == "관광":
            recommendation = "부산"
            reason = "명소, 시장, 바다 코스를 친구들과 활기차게 즐길 수 있습니다."
        elif style == "액티비티":
            recommendation = "제주도"
            reason = "드라이브, 레저, 자연 체험 등 다양한 활동을 하기에 좋습니다."

    elif companion == "연인":
        if style == "힐링":
            recommendation = "여수"
            reason = "야경과 바다 풍경이 아름다워 감성적인 연인 여행에 잘 어울립니다."
        elif style == "맛집":
            recommendation = "부산"
            reason = "바다와 함께 다양한 맛집 데이트 코스를 즐길 수 있습니다."
        elif style == "관광":
            recommendation = "제주도"
            reason = "드라이브와 관광 명소가 많아 함께 추억을 만들기 좋습니다."
        elif style == "액티비티":
            recommendation = "가평"
            reason = "레저와 체험형 여행을 즐기기에 적합합니다."

    elif companion == "가족":
        if style == "힐링":
            recommendation = "제주도"
            reason = "자연 풍경과 편안한 숙소 선택지가 많아 가족 여행에 좋습니다."
        elif style == "맛집":
            recommendation = "전주"
            reason = "남녀노소 함께 즐기기 좋은 음식과 전통 분위기가 있습니다."
        elif style == "관광":
            recommendation = "경주"
            reason = "문화유산과 관광 명소를 가족이 함께 둘러보기 좋습니다."
        elif style == "액티비티":
            recommendation = "용인"
            reason = "테마파크와 체험 활동이 있어 가족 단위 여행에 적합합니다."

    if budget == "낮음":
        if recommendation == "제주도":
            recommendation = "강릉"
            reason = "비교적 예산 부담이 적으면서도 바다와 힐링 코스를 즐기기 좋습니다."
        elif recommendation == "여수":
            recommendation = "군산"
            reason = "감성적인 분위기와 맛집, 근대문화 거리까지 부담 없이 즐길 수 있습니다."

    if days == "당일":
        if recommendation == "제주도":
            recommendation = "서울"
            reason = "당일 일정으로 이동 부담이 적고 짧은 코스를 알차게 즐길 수 있습니다."
        elif recommendation == "여수":
            recommendation = "가평"
            reason = "당일치기로도 자연과 감성 코스를 즐기기 좋습니다."

    if people >= 4 and companion == "가족" and budget != "낮음":
        recommendation = "제주도"
        reason = "가족 단위 관광 코스와 숙소 선택 폭이 넓어 단체 가족 여행에 적합합니다."

    result_text = (
        f"[추천 여행지] {recommendation}\n"
        f"[추천 이유] {companion} {people}명, {budget} 예산, {style} 스타일, {days} 일정에 잘 어울립니다. "
        f"{reason}\n"
        f"[추천 한마디] 즐거운 여행 계획 세워보세요!"
    )

    return jsonify({"result": result_text})