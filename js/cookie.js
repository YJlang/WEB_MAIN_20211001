// 쿠키 생성 함수
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/; SameSite=None; Secure";
} //쿠키 보안 및 코스 정책 >> SameSite 속성 추가하여 보안 강화

// 쿠키 가져오기 함수
function getCookie(name) {
    // 현재 웹 페이지의 모든 쿠키를 하나의 문자열로 가져옵니다.
    var cookie = document.cookie;

    // 쿠키 문자열이 비어 있지 않은 경우
    if (cookie != "") {
        // 쿠키 문자열을 '; '을 기준으로 분리하여 각 쿠키를 배열로 만듭니다.
        var cookieArray = cookie.split("; ");
        console.log(cookieArray);
        // 배열의 각 요소에 대해 반복합니다.
        for (var index in cookieArray) {
            // 현재 요소(쿠키)를 '='을 기준으로 분리하여 이름과 값을 분리합니다.
            var cookieName = cookieArray[index].split("=");
            console.log(cookieName);
            // 분리된 쿠키 이름이 찾고자 하는 이름과 일치하는 경우
            if (cookieName[0] == name) {
                // 해당 쿠키의 값을 반환합니다.
                return cookieName[1];
            }
        }
    }

    // 찾고자 하는 이름의 쿠키가 없으면 null을 반환합니다.
    return null;
}
