class SignUp {
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdayDate = birthdayDate;
        this.gender = gender;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.classNumber = classNumber;
        this.random = random;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get contactInfo() {
        return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
    }

    set contactInfo(contactInfo) {
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
