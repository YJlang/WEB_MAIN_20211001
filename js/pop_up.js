var close_time; //시간정보
var close_time2 = 10; //10초 설정


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
//addJavascript('/js/destroy.js');



function pop_up(){
    var cookieCheck = getCookie("popupYN");
    if(cookieCheck != "N"){
        window.open("../popup/popup.html", "팝업테스트", width=300, height=300, top=10, left=10)
    }
} //가로400, 세로300, 위 10, 왼쪽 10 여백
//window.open()함수는 창을 열거나 닫는(.close) 전용 함수

function show_time() {
    let divClock = document.getElementById('Time');
    if (divClock) {
        divClock.innerText = close_time2;
        close_time2--;
        setTimeout(show_time, 1000);
    } else {
        console.error("Element with ID 'Time' not found.");
    }
}

function over(obj) {
    obj.src="image/LOCO2.png";
}
function out(obj) {
    obj.src="image/LOCO.png";
}

function closePopup(){
    if(document.getElementById(`check_popup`).value){
        setCookie("popupYN", "N", 1);
        alert("쿠키를 설정합니다.");
        self.close();
    }
}


clearTimeout(close_time); //재호출정지
close_time = setTimeout("close_window()", 10000); //1/1000 초 지정, 바로시작
show_time();//
//================================================================================================//
function show_clock(){
    let currentDate = new Date(); // 현재 시스템 날짜 객체 생성
    let divClock = document.getElementById('divClock');
    let msg = "현재 시간 : ";
    if(currentDate.getHours()>12){ // 12시 보다 크면 오후 아니면 오전
    msg += "오후";
    msg += currentDate.getHours()-12+"시";
    }
    else {
    msg += "오전";
    msg += currentDate.getHours()+"시";
    }
    msg += currentDate.getMinutes()+"분";
    msg += currentDate.getSeconds()+"초";
    divClock.innerText = msg;
    if (currentDate.getMinutes()>58) { //정각 1분전 빨강색 출력
    divClock.style.color="red";
    }
    setTimeout(show_clock, 1000); //1초마다 갱신
    }
//================================================================================//








    