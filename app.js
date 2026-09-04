function recommendTrip() {
  const destination = document.getElementById("destination").value;
  const result = document.getElementById("result");

  if (destination.trim() === "") {
    result.textContent = "여행지를 입력해주세요.";
    return;
  }

  result.textContent = destination + " 여행을 추천합니다!";
}