function openTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-btn");

  tabs.forEach((tab) => tab.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");

  buttons.forEach((btn) => {
    if (btn.textContent.includes("서비스 소개") && tabId === "intro") {
      btn.classList.add("active");
    }
    if (btn.textContent.includes("여행 추천") && tabId === "recommend") {
      btn.classList.add("active");
    }
    if (btn.textContent.includes("이용 안내") && tabId === "guide") {
      btn.classList.add("active");
    }
  });
}

function recommendTrip() {
  const destination = document.getElementById("destination").value;
  const result = document.getElementById("result");

  if (destination.trim() === "") {
    result.textContent = "여행지를 입력해주세요.";
    return;
  }

  result.textContent = destination + " 여행을 추천합니다!";
}