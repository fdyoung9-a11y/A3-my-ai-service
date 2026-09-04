const menuButtons = document.querySelectorAll(".menu-btn");
const contentBlocks = document.querySelectorAll(".content-block");
const recommendBtn = document.getElementById("recommend-btn");
const resultBox = document.getElementById("result");

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.target;

    menuButtons.forEach((btn) => btn.classList.remove("active"));
    contentBlocks.forEach((block) => block.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(targetId).classList.add("active");
  });
});

recommendBtn.addEventListener("click", async () => {
  const companion = document.getElementById("companion").value;
  const people = document.getElementById("people").value;
  const budget = document.getElementById("budget").value;
  const style = document.getElementById("style").value;
  const days = document.getElementById("days").value;

  if (!companion || !people || !budget || !style || !days) {
    resultBox.textContent = "모든 항목을 입력해주세요.";
    return;
  }

  if (Number(people) < 1) {
    resultBox.textContent = "인원 수는 1명 이상이어야 합니다.";
    return;
  }

  resultBox.textContent = "추천 결과를 불러오는 중입니다...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companion,
        people,
        budget,
        style,
        days
      })
    });

    const data = await response.json();
    resultBox.textContent = data.result || "추천 결과를 불러오지 못했습니다.";
  } catch (error) {
    resultBox.textContent = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
});