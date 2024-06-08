function addJavascript(jsname) { // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}
    
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수


// 페이지 로딩 시 초기화
function init() {
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let savedId = getCookie('id');

    if (savedId) {
        emailInput.value = savedId;
        if (idsave_check) {
            idsave_check.checked = true;
        }
    }
    session_check(); // 세션 유무 검사
}

// 로그인 시도 및 로그인 시도 횟수 증가
function login() {
    const failedLoginCount = getFailedLoginCount();

    if (failedLoginCount >= 3) {
        const lockTime = getCookie("lockTime");
        if (lockTime) {
            const currentTime = new Date().getTime();
            if (currentTime < lockTime) {
                const remainingTime = Math.ceil((lockTime - currentTime) / 1000);
                alert(`로그인을 ${failedLoginCount}번 실패했습니다. ${remainingTime}초 동안 로그인이 금지됩니다.`);
                return;
            } else {
                setFailedLoginCount(0); // 3분이 지나면 로그인 실패 횟수 초기화
            }
        }
    }

    checkInput();
}

// 로그인 정보 검증 및 처리 함수
function checkInput() {
    const loginForm = document.getElementById('login_form');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const idsave_check = document.getElementById('idSaveCheck');
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    // 유효성 검사 로직 추가
    const isEmailOK = emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
    const isRepeatedPattern = /(.)\1{2,}/.test(emailValue); // 3글자 이상 반복 입력
    const isRepeatedNumbers = /(\d)\1{1,}/.test(emailValue); // 연속되는 숫자 2개 이상 반복 입력

    if (emailValue === '' || !isEmailOK) {
        alert('이메일을 올바르게 입력하세요.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (emailValue.length > 15) {
        alert('이메일은 최대 15글자 이하로 입력해야 합니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (isRepeatedPattern) {
        alert('이메일에 3글자 이상 반복되는 문자가 포함될 수 없습니다.');
        increaseFailedLoginCount(); // 로그인 실패 횟수 증가
        return;
    }
    if (isRepeatedNumbers) {
        alert('이메일에 연속되는 숫자 2개 이상이 포함될 수 없습니다.');
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
    if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    }

    // id 쿠키 저장
    if (idsave_check && idsave_check.checked) {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 동안
        alert(`쿠키값 : ${emailValue}`);
    }

    // 세션 생성
    session_set();

    // 폼 제출
    loginForm.submit();
}

// 로그인 시도 횟수 증가 함수
function increaseFailedLoginCount() {
    var count = getFailedLoginCount() || 0;
    count++;
    setCookie("failedLoginCount", count, 1); // 로그인 실패 횟수 증가

    if (count >= 3) {
        const lockTime = new Date().getTime() + 3 * 60 * 1000; // 3분 후
        setCookie("lockTime", lockTime, 1); // 3분 잠금 쿠키 설정
    }
}

// 로그인 시도 횟수 가져오기 함수
function getFailedLoginCount() {
    return parseInt(getCookie("failedLoginCount")) || 0;
}

// 로그인 시도 횟수 설정 함수
function setFailedLoginCount(count) {
    setCookie("failedLoginCount", count, 1); // 로그인 실패 횟수 설정
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// 페이지 로딩 시 초기화 함수 호출
document.addEventListener("DOMContentLoaded", init);

// 로그인 버튼 클릭 시 로그인 처리
document.getElementById("login_btn").addEventListener('click', login);
