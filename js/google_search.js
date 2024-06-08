document.getElementById("search_btn").addEventListener('click', search_message);

function search_message(){
  alert("검색을 수행합니다!");
  googleSearch();
}

function googleSearch() {
  const searchTerm = document.getElementById("search_input").value.trim(); // 검색어로 설정 및 양쪽 공백 제거
  const badWords = ["씨발", "병신", "좆", "존나", "꺼져"]; // 비속어 배열

  // 공백 검사
  if (searchTerm === "") {
    alert("검색어를 입력해주세요!");
    return false;
  }

  // 비속어 검사
  for (let i = 0; i < badWords.length; i++) {
    if (searchTerm.includes(badWords[i])) {
      alert("비속어가 포함된 검색어는 사용할 수 없습니다.");
      return false;
    }
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`; // GET 방식으로 검색
  // 새 창에서 구글 검색을 수행
  window.open(googleSearchUrl, "_blank"); // 새 창에서 열기
  return false;
}
