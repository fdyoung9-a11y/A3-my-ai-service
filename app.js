async function recommendTrip() {
  const destinationInput = document.getElementById("destination");
  const result = document.getElementById("result");
  const button = document.querySelector("button");

  const destination = destinationInput.value.trim();

  // 1. 빈 입력 확인
  if (destination === "") {
    result.textContent = "여행지를 입력해주세요.";
    destinationInput.focus();
    return;
  }

  // 2. 로딩 상태 표시
  result.textContent = "AI가 여행 추천을 만드는 중입니다...";
  button.disabled = true;
  button.textContent = "추천 생성 중...";

  try {
    // 3. 백엔드 API 호출
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ destination: destination })
    });

    // 4. HTTP 에러 처리
    if (!response.ok) {
      throw new Error("서버 응답 오류");
    }

    const data = await response.json();

    // 5. 결과 표시
    result.textContent = data.result || "추천 결과를 불러오지 못했습니다.";
  } catch (error) {
    // 6. 네트워크/서버 오류 처리
    result.textContent = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    console.error("에러:", error);
  } finally {
    // 7. 버튼 상태 복구
    button.disabled = false;
    button.textContent = "추천 받기";
  }
}

// Enter 키로도 실행되게 설정
document.addEventListener("DOMContentLoaded", function () {
  const destinationInput = document.getElementById("destination");

  destinationInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      recommendTrip();
    }
  });
});