const idsave_check = document.getElementById(`idSaveCheck`);

// 쿠키 생성 함수
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";
}

// 쿠키 가져오기 함수
function getCookie(name){
    var cookie = document.cookie;
    if(cookie != ""){
        var cookieArray = cookie.split("; ");
        for(var index in cookieArray){
            var cookieName = cookieArray[index].split("=");
            if(cookieName[0] == name){
                return cookieName[1];
            }
        }
    }
    return null;
}

// 페이지 로딩 시 초기화
function init(){
    const emailInput = document.getElementById(`typeEmailX`);
    const idsave_check = document.getElementById(`idSaveCheck`);
    let savedId = getCookie("id");

    if(savedId){
        emailInput.value = savedId;
        idsave_check.checked = true;
    }
}

// 로그인 시도 및 로그인 시도 횟수 증가
function login(){
    const failedLoginCount = getFailedLoginCount();
    if(failedLoginCount >= 6){
        const countdown = (timesec) => {
            if(timesec > 0){
                setTimeout(() => {
                    alert(`${timesec}초 뒤에 다시 시도해주세요.`);
                    countdown(timesec - 1);
                }, 1000);
            }
            else{
                setFailedLoginCount(0); //타이머가 끝난 후 로그인 실패 횟수 0으로 초기화
            }
        };
        countdown(5);
        return;
    }
    checkInput();
}

// 로그인 정보 검증 및 처리 함수
function checkInput(){
    const loginForm = document.getElementById('login_form');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    // 유효성 검사 로직 추가...
    const isEmailOK = emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
    if (emailValue === '' || !isEmailOK) {
        alert('이메일을 입력하세요.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    const hasSpecialChar = passwordValue.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }

    // XSS 체크
    const sanitizedEmail = checkXSS(emailValue);
    const sanitizedPassword = checkXSS(passwordValue);
    if(!sanitizedEmail || !sanitizedPassword){
        return false;
    }

    //id쿠키저장
    if(idsave_check.checked == true){
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); //1일동안
        alert(`쿠키값 : ${emailValue}`)
    }


    // 폼 제출
    loginForm.submit();

}



// XSS 체크 함수
const checkXSS = (input) => {
    const DOMPurify = window.DOMPurify;
    const sanitizedInput = DOMPurify.sanitize(input);
    if (sanitizedInput !== input) {
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    return sanitizedInput;
};

// 로그인 시도 횟수 증가 함수
function increaseFailedLoginCount(){
    var count = getFailedLoginCount() || 0;  
    count++;
    setCookie("failedLoginCount", count, 1); // 로그인 실패 횟수 증가
}

// 로그인 시도 횟수 가져오기 함수
function getFailedLoginCount(){
    return parseInt(getCookie("failedLoginCount")) || 0;
}

// 로그인 시도 횟수 설정 함수
function setFailedLoginCount(count){
    setCookie("failedLoginCount", count, 1); // 로그인 실패 횟수 설정
}



// 로그인 버튼 클릭 시 로그인 처리
document.getElementById("login_btn").addEventListener('click', login);