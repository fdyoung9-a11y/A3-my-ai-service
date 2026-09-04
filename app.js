document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  function openTab(tabId) {
    tabButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.tab === tabId);
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabId);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openTab(button.dataset.tab);
    });
  });

  if (tabButtons.length > 0) {
    openTab(tabButtons[0].dataset.tab);
  }

  const destinationInput = document.getElementById("destination");
  const recommendBtn = document.getElementById("recommendBtn");
  const resultBox = document.getElementById("result");

  async function getRecommendation() {
    if (!destinationInput || !recommendBtn || !resultBox) return;

    const destination = destinationInput.value.trim();

    if (!destination) {
      resultBox.textContent = "여행지를 입력해주세요.";
      openTab("recommend");
      destinationInput.focus();
      return;
    }

    resultBox.textContent = "추천을 생성하는 중입니다...";
    recommendBtn.disabled = true;
    recommendBtn.textContent = "추천 생성 중...";

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ destination })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "추천 생성에 실패했습니다.");
      }

      const recommendation =
        data.result ||
        data.recommendation ||
        data.answer ||
        data.message ||
        "추천 결과를 불러왔지만 내용이 비어 있습니다.";

      resultBox.textContent = recommendation;
    } catch (error) {
      resultBox.textContent = `오류: ${error.message}`;
    } finally {
      recommendBtn.disabled = false;
      recommendBtn.textContent = "여행 추천 받기";
    }
  }

  if (recommendBtn) {
    recommendBtn.addEventListener("click", getRecommendation);
  }

  if (destinationInput) {
    destinationInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        getRecommendation();
      }
    });
  }
});