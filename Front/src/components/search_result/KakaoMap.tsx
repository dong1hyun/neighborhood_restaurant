//검색한 식당 또는 위치의 지도와 식당 목록을 리턴하는 컴포넌트
import styled from "styled-components";

const MapContainer = styled.div`
margin-top: 150px;
    position: relative;
    padding:0;
    font-family:'Malgun Gothic',dotum,'돋움',sans-serif;
    font-size:12px;
    @media screen and (max-width: 700px) {
        position: none;
        display: flex;
        flex-direction: column;
    }
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;height:500px;}
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
.bg_white {background:#fff;}
#menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
#menu_wrap .option{text-align: center;}
#menu_wrap .option p {margin:10px 0;}  
#menu_wrap .option button {margin-left:5px;}
`

const Map = styled.div`
    position: relative;
    width: 80%;
    height: 500px;
    border-radius: 10px;
    border: 2px solid white;
    margin: 0 auto;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 700px) {
        height: 300px;
        position: none;
        margin-bottom: 10px;
    }
`


const List = styled.div`
position: absolute;
z-index: 3;
background-color: rgb(255,255,255, 0.7);
height: 480px;
width: 300px;
right: 11%;
top: 10px;
overflow-y: scroll;
    #placesList .item .markerbg {
        float:left;
        position:absolute;
        width:36px;
        height:37px;
        margin:10px 0 0 10px;
        background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}
overflow-x: hidden;
@media screen and (max-width: 700px) {
    position: static;
    width: 80%;
    height: 300px;
    margin: 0 auto;
    margin-bottom: 30px;
}
#placesList li {list-style: none;}
#placesList .item {position:relative;border-bottom:1px solid #888;cursor: pointer; overflow: hidden; min-height: 65px;}
#placesList .item:hover {
    scale: 1.05;
}
#placesList .item span {display: block;margin-top:4px;}
#placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
#placesList .item .info{padding:10px 0 10px 55px;}
#placesList .info .gray {color:#8a8a8a;}
#placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
#placesList .info .tel {color:#009900;}
#placesList .item .marker_1 {background-position: 0 -10px;}
#placesList .item .marker_2 {background-position: 0 -56px;}
#placesList .item .marker_3 {background-position: 0 -102px}
#placesList .item .marker_4 {background-position: 0 -148px;}
#placesList .item .marker_5 {background-position: 0 -194px;}
#placesList .item .marker_6 {background-position: 0 -240px;}
#placesList .item .marker_7 {background-position: 0 -286px;}
#placesList .item .marker_8 {background-position: 0 -332px;}
#placesList .item .marker_9 {background-position: 0 -378px;}
#placesList .item .marker_10 {background-position: 0 -423px;}
#placesList .item .marker_11 {background-position: 0 -470px;}
#placesList .item .marker_12 {background-position: 0 -516px;}
#placesList .item .marker_13 {background-position: 0 -562px;}
#placesList .item .marker_14 {background-position: 0 -608px;}
#placesList .item .marker_15 {background-position: 0 -654px;}
#pagination {margin:10px auto;text-align: center;}
#pagination a {display:inline-block;margin-right:10px;}
#pagination .on {font-weight: bold; cursor: default;color:#777;}
border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    margin: 2px;
`

export function KakaoMap() {
    return (
        <MapContainer>
            <Map id="keywordMap" />
            <List>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </List>
        </MapContainer>
    )
}