const idsave_check = document.getElementById('idSaveCheck');

// 쿠키 생성 함수
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/; SameSite=None; Secure";
}

// 쿠키 가져오기 함수
function getCookie(name) {
    var cookie = document.cookie;
    if (cookie != "") {
        var cookieArray = cookie.split("; ");
        for (var index in cookieArray) {
            var cookieName = cookieArray[index].split("=");
            if (cookieName[0] == name) {
                return cookieName[1];
            }
        }
    }
    return null;
}

// 페이지 로딩 시 초기화
function init() {
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let savedId = getCookie("id");

    if (savedId) {
        emailInput.value = savedId;
        idsave_check.checked = true;
    }
    session_check(); //세션 유무 검사
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
    if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    }

    // id 쿠키 저장
    if (idsave_check.checked == true) {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 동안
        alert(`쿠키값 : ${emailValue}`);
    }

    // 세션 생성
    session_set();

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

// 세션 저장
function session_set() { //세션 저장
    let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
    if (sessionStorage){
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } 
    else{
        alert("로컬 스토리지 지원 x");
    }
}
    

// 세션 읽기
function session_get(){
    if(sessionStorage){
        return sessionStorage.getItem("Session_Storage_pass");
    }
    else{
        alert("세션 스토리지 지원 X");
    }
}

//세션 검사
function session_check(){
    if(sessionStorage.getItem("Session_Storage_id")){
        alert("이미 로그인 되었습니다.");
        location.href = `../login/index_login.html`; //로그인된 페이지로 이동
    }

}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}
    

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}
    

// 페이지 로딩 시 초기화 함수 호출
document.addEventListener("DOMContentLoaded", init);

// 로그인 버튼 클릭 시 로그인 처리
document.getElementById("login_btn").addEventListener('click', login);
