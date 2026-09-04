// 메뉴 버튼과 패널 선택
const menuButtons = document.querySelectorAll(".menu-btn");
const contentPanels = document.querySelectorAll(".content-panel");

// 버튼 클릭 시 블록 전환
menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;

    // 버튼 active 초기화
    menuButtons.forEach((btn) => btn.classList.remove("active"));

    // 패널 active 초기화
    contentPanels.forEach((panel) => panel.classList.remove("active"));

    // 선택 버튼/패널 활성화
    button.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

// 추천 기능
const recommendBtn = document.getElementById("recommendBtn");
const destinationInput = document.getElementById("destination");
const resultBox = document.getElementById("result");

recommendBtn.addEventListener("click", () => {
  const destination = destinationInput.value.trim();

  // 빈 입력 검사
  if (!destination) {
    resultBox.textContent = "여행지를 입력해주세요.";
    return;
  }

  // 간단한 추천 메시지
  resultBox.textContent = `${destination} 여행을 추천합니다. 맛집, 관광지, 휴식 코스를 함께 찾아보세요.`;
});