class SignUp {
    // 생성자 함수: 객체가 생성될 때 호출되며, 초기 속성값을 설정합니다.
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
        // 객체의 속성들을 설정합니다.
        this.firstName = firstName;       // 이름
        this.lastName = lastName;         // 성
        this.birthdayDate = birthdayDate; // 생일 날짜
        this.gender = gender;             // 성별
        this.emailAddress = emailAddress; // 이메일 주소
        this.phoneNumber = phoneNumber;   // 전화번호
        this.classNumber = classNumber;   // 반 번호
        this.random = random;             // 랜덤 값 (예: 타임스탬프)
    }

    // fullName 속성에 대한 getter: 객체의 fullName 속성을 호출할 때 실행됩니다.
    get fullName() {
        // 이름과 성을 결합하여 반환합니다.
        return `${this.firstName} ${this.lastName}`;
    }

    // fullName 속성에 대한 setter: 객체의 fullName 속성을 설정할 때 실행됩니다.
    set fullName(fullName) {
        // 공백을 기준으로 이름과 성을 분리하여 각각의 속성에 저장합니다.
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // contactInfo 속성에 대한 getter: 객체의 contactInfo 속성을 호출할 때 실행됩니다.
    get contactInfo() {
        // 이메일 주소, 전화번호, 랜덤 값을 결합하여 반환합니다.
        return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
    }

    // contactInfo 속성에 대한 setter: 객체의 contactInfo 속성을 설정할 때 실행됩니다.
    set contactInfo(contactInfo) {
        // 공백을 기준으로 이메일 주소, 전화번호, 랜덤 값을 분리하여 각각의 속성에 저장합니다.
        const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.random = random;
    }
}


function addJavascript(jsname) {
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}

addJavascript('/js/security.js');
addJavascript('/js/session.js');
addJavascript('/js/cookie.js');

function join() {
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName").value.trim();
    let l_name = document.querySelector("#lastName").value.trim();
    let b_day_year = document.querySelector("#birthYear").value;
    let b_day_month = document.querySelector("#birthMonth").value;
    let b_day_day = document.querySelector("#birthDay").value;
    let gender = document.querySelector("input[name='inlineRadioOptions']:checked").value;
    let email = document.querySelector("#emailAddress").value.trim();
    let p_number = document.querySelector("#phoneNumber").value.trim();
    let class_check = document.querySelector(".select.form-control-lg").value;
    
    // Validate inputs
    const namePattern = /^[가-힣]+$/;
    if (!namePattern.test(f_name) || !namePattern.test(l_name)) {
        alert("성과 이름은 한글만 가능합니다.");
        return;
    }

    if (f_name === '' || l_name === '' || b_day_year === '' || b_day_month === '' || b_day_day === '' || email === '' || p_number === '') {
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("유효한 이메일을 입력해주세요.");
        return;
    }

    const phonePattern = /^\d{10,11}$/;
    if (!phonePattern.test(p_number)) {
        alert("유효한 휴대번호를 입력해주세요.");
        return;
    }

    form.action = "./index_join.html";
    form.method = "get";
    
    session_join_set();
    form.submit();
}
