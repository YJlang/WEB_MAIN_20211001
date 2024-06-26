
// 세션 저장
/*function session_set() { //세션 저장(키/값 방식)
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
}*/
function session_set(){ // 세션 저장(객체방식)
    // 이메일 입력 필드의 값을 가져옵니다.
    let id = document.querySelector("#typeEmailX");

    // 패스워드 입력 필드의 값을 가져옵니다.
    let password = document.querySelector("#typePasswordX");

    // 현재 날짜와 시간을 나타내는 랜덤 타임스탬프를 생성합니다.
    let random = new Date();

    // 객체를 선언하고, 입력된 이메일과 랜덤 타임스탬프를 속성으로 설정합니다.
    const obj = { 
        id: id.value, // 이메일 값을 객체의 id 속성에 저장
        otp: random   // 랜덤 타임스탬프 값을 객체의 otp 속성에 저장
    }

    // sessionStorage가 지원되는지 확인합니다.
    if (sessionStorage) {
        // 객체를 JSON 문자열로 변환합니다.
        const objString = JSON.stringify(obj);

        // 패스워드를 JSON 문자열로 변환합니다.
        const passwordString = JSON.stringify(password.value);

        // 변환된 패스워드 문자열을 암호화합니다.
        let en_text = encrypt_text(passwordString); 

        // 변환된 객체 문자열을 세션 스토리지에 저장합니다.
        sessionStorage.setItem("Session_Storage_object", objString);

        // 암호화된 패스워드 문자열을 세션 스토리지에 저장합니다.
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        // 세션 스토리지를 지원하지 않는 경우 경고 메시지를 출력합니다.
        alert("세션 스토리지 지원 x");
    }
}

    
    

// 세션 읽기
function session_get(){
    if(sessionStorage){
        return sessionStorage.getItem("Session_Storage_encrypted");
    }
    else{
        alert("세션 스토리지 지원 X");
    }
}

//세션 검사
function session_check(){
    if(sessionStorage.getItem("Session_Storage_object")){
        alert("이미 로그인 되었습니다.");
        location.href = `../login/index_login.html`; //로그인된 페이지로 이동
    }

}

//프로필 검사
function profile_access(){
    const admin = "wnsgk111400@naver.com";
    if(!sessionStorage.getItem("Session_Storage_object")){
        let aString = sessionStorage.getItem("Session_Storage_object");
        let aObject = JSON.parse(aString); //JSON 문자열을 객체로 변환 >> id값의 벨류를 추출하기 위한 단계
        let idValue = aObject.id;
        if(admin === idValue){
            alert("엑세스 완료.");
            location.href = `../login/profile.html`;
        }
        else{
            alert("허용되지 않은 아이디입니다.");
            location.href = `../login/index_login.html`;
        }
    }
}

function session_join_set() {
    let f_name = document.querySelector("#firstName").value.trim();
    let l_name = document.querySelector("#lastName").value.trim();
    let b_day_year = document.querySelector("#birthYear").value;
    let b_day_month = document.querySelector("#birthMonth").value;
    let b_day_day = document.querySelector("#birthDay").value;
    let gender = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    let email = document.querySelector("#emailAddress").value.trim();
    let p_number = document.querySelector("#phoneNumber").value.trim();
    let class_check = document.querySelector(".select.form-control-lg").value;
    let random = new Date(); // 랜덤 타임스탬프

    const newSignUp = new SignUp(f_name, l_name, b_day_year, b_day_month, b_day_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName);
    console.log(newSignUp.contactInfo);

    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_join_get() {
    if (sessionStorage) {
        let objString = sessionStorage.getItem("Session_Storage_object");
        if (objString) {
            let obj = JSON.parse(objString); // JSON 문자열 -> 객체 변환
            let newSignUp = new SignUp(
                obj.firstName,
                obj.lastName,
                obj.birthdayYear,
                obj.birthdayMonth,
                obj.birthdayDay,
                obj.gender,
                obj.emailAddress,
                obj.phoneNumber,
                obj.classNumber,
                obj.random
            );
            console.log(`Full Name: ${newSignUp.fullName}`);
            console.log(`Contact Info: ${newSignUp.contactInfo}`);
            console.log(`Gender: ${newSignUp.gender}`);
            console.log(`Class: ${newSignUp.classNumber}`);
            console.log(`Birthday: ${newSignUp.birthdayYear}-${newSignUp.birthdayMonth}-${newSignUp.birthdayDay}`);
        } else {
            console.log("세션에 저장된 데이터가 없습니다.");
        }
    } else {
        alert("세션 스토리지 지원 X");
    }
}