function session_del(){
  if(sessionStorage){
    sessionStorage.removeItem("Session_Storage_object");
    sessionStorage.removeItem("Session_Storage_encrypted")
    alert("로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.");
  }
  else{
    alert("세션 스토리지 지원X");
  }
}

function logout(){
  session_del(); //세션삭제
  location.href = `../index.html`
}

document.addEventListener(`DOMContentLoaded`, function(){
  setTimeout(function(){
    alert("1분 후 자동 로그아웃 됩니다.");
  }, 240000); //페이지 로드 4분 후 알림 표시

  setTimeout(logout, 300000); //5분 후 자동 로그아웃
})

document.getElementById('logout_btn').addEventListener('click', function(){
  session_del();
  window.location.href = `../index.html`;
})