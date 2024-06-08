kakao.maps.load(function() {
    // 지도를 표시할 div와 지도 옵션을 설정
    var mapContainer = document.getElementById('map');
    var mapOption = {
        center: new kakao.maps.LatLng(37.38017808703165, 126.92817830470582), // 성결대 중심 좌표
        level: 3 // 지도의 확대 레벨
    };
    
    // 지도를 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);
    
    // 장소 검색 객체를 생성
    var ps = new kakao.maps.services.Places();
    
    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
        // 마커를 생성하고 지도에 표시
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
        });

        // 마커에 클릭 이벤트를 등록
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출
            var infowindow = new kakao.maps.InfoWindow({zIndex: 1});
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    
    // 키워드 검색 완료 시 호출되는 콜백 함수
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
            var bounds = new kakao.maps.LatLngBounds();
            
            for (var i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }
            
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
        } 
    }
    
    // 검색을 실행하는 함수
    function searchPlaces() {
        var keyword = document.getElementById('keyword').value;
        if (!keyword.trim()) {
            alert('키워드를 입력해주세요!');
            return;
        }
        ps.keywordSearch(keyword, placesSearchCB);
    }

    // 검색 버튼에 이벤트 리스너 추가
    document.getElementById('searchBtn').addEventListener('click', function() {
        searchPlaces();
    });
    
    // 엔터키로 검색을 실행하도록 이벤트 리스너 추가
    document.getElementById('keyword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchPlaces();
        }
    });

    // 기본 검색을 실행
    ps.keywordSearch('성결대 맛집', placesSearchCB);
    
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성하고 지도에 추가
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성하고 지도에 추가
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
});
