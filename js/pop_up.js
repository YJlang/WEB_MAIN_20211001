var close_time; //시간정보
var close_time2 = 10; //10초 설정

function pop_up(){
    window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10"); //  ../ 는 현폴더에서 상위폴더로 이동한다.
} //가로400, 세로300, 위 10, 왼쪽 10 여백
//window.open()함수는 창을 열거나 닫는(.close) 전용 함수

function show_time(){
    let divClock = document.getElementById("Time");
    divClock.innerText = close_time2; //10초 삽입 시작
    close_time2--; //1초씩 감소
    setTimeout(show_time, 1000); //1초마다 갱신
}

/*function close_window(){
    window.close();
}*/

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









    