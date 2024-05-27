import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceImg from "../components/place/PlaceImg";
import { motion } from "framer-motion";
import Review from "../components/place/Review";
import { session } from "../atom";
import { useRecoilState } from "recoil";
import Button from 'react-bootstrap/Button';
import PlaceRecommend from "../components/place/PlaceRecommend";

const WholeContainer = styled.div`
    display: flex;
    justify-content: center;
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin-top: 50px;
    margin-bottom: 100px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 900px) {
        width: 90%;
        margin: 0 auto;
    }
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 220px;
    padding: 10px;
    background-color: whitesmoke;
    margin-left: 20px;
    margin-top: 50px;
    border-radius: 15px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 900px) {
        width: 90%;
        margin: auto;
        margin-top: 50px;
    }
`

const PlaceContainer = styled.div`
    display: flex;
    margin: 40px;
    @media screen and (max-width: 1100px) {
        flex-direction: column;
        text-align: center;
    }
`
const PlaceName = styled.div`
    font-size: 50px;
    color: black;
    margin-bottom: 40px;
`

const DetailContainer = styled.div`
    margin: 40px;
    color: black;
`

const Rating = styled.div`
    font-size: 30px;
    margin-bottom: 40px;
`

const Detail = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    margin-bottom: 40px;
`

const Category = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: gray;
    margin-bottom: 40px;
`

const Map = styled.div`
    width: 80%;
    height: 300px;
    border-radius: 10px;
    margin: 20px
`

const Time = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    margin: 10px;
`

const TimeBtn = styled.button`
    border: none;
    border-radius: 3px;
    background-color: whitesmoke;
    width: 60px;
`

const TimeContainer = styled(motion.div)`
`

const BookMarker = styled.button`
    color: white;
    width: 200px;
    height: 25px;
    margin-left: 40px;
    margin-top: 40px;
    background-color: rgba(37, 204, 247,1.0);
    border-radius: 5px;
    border: none;
`

const ShareButton = styled.button`
    color: white;
    width: 200px;
    height: 25px;
    margin-left: 40px;
    margin-top: 10px;
    background-color: #00BFFF;
    border-radius: 5px;
    border: none;
`

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
`

function Place() {
    const { id } = useParams()
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [category, setCategory] = useState();
    const [phone, setPhone] = useState();
    const [timeList, setTimeList] = useState<any[]>([]);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [moreInf, showMoreInf] = useState(false);
    const [breakTime, setBreakTime] = useState(false);
    const [lastOrder, setLastOrder] = useState(false);
    const [sessionID, setSessionID] = useRecoilState(session)

    const getPlaceData = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setName(res.data.restaurantName);
                setAddress(res.data.restaurantAddress);
                setCategory(res.data.restaurantCategory);
                setPhone(res.data.restaurantNumber);
                setX(res.data.x);
                setY(res.data.y);
                setTimeList(JSON.parse(res.data.timeList))
                timeList.forEach((i) => {
                    if (i["timeName"] == "휴게시간") {
                        setBreakTime(true)
                    } else if (i["timeName"] == "라스트오더") {
                        setLastOrder(true);
                    }
                });
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
    }
    const handleBookmark = async () => {
        if (sessionID) {
            try {
                const favoritePlaceInfo = {
                    sessionID: sessionID,
                    restaurantId: id
                };

                const response = await axios.post('/favorite', favoritePlaceInfo);
            } catch (error) {
                console.error('즐겨찾기 추가 중 오류가 발생했습니다:', error);
            }
        } else {
            alert("로그인을 먼저해주세요.");
        }
    };

    // 음식점 링크 공유 기능 추가
    const sharePage = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            }).then(() => {
                console.log('Page shared successfully.');
            }).catch((error) => {
                console.error('Error sharing page:', error);
            });
        } else {
            console.log('Web share not supported on this browser.');
        }
    };

    useEffect(() => {
        getPlaceData();
        setMarker(x, y);
    }, [x, y, breakTime]);
    return (
        <WholeContainer>
            <BoxContainer>
                <PlaceContainer>
                    <PlaceImg />
                    <DetailContainer>
                        <PlaceName>끝돈</PlaceName>
                        <Category>한식 육류</Category>
                        <Rating>평점: <>4.6</></Rating>
                        <Detail>02-498-0929</Detail>
                        <Detail>서울 광진구 아차산로 238-1</Detail>
                        영업시간 <TimeBtn onClick={() => showMoreInf(cur => !cur)}>더보기</TimeBtn>
                        {
                            moreInf ?
                                <TimeContainer
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    {timeList.map((time: any) => {
                                        if (time["timeName"] == "영업시간") return <Time>{time["dayOfWeek"]}: {time["timeSE"]}</Time>
                                    })}
                                    {breakTime ? "휴게시간" : null}
                                    {timeList.map((time: any) => {
                                        if (time["timeName"] == "휴게시간") return <Time> {time["dayOfWeek"]}: {time["timeSE"]}</Time>
                                    })}
                                    {lastOrder ? "라스트오더" : null}
                                    {timeList.map((time: any) => {
                                        if (time["timeName"] == "라스트오더") return <Time> {time["dayOfWeek"]}: {time["timeSE"]}</Time>
                                    })}
                                </ TimeContainer>
                                : null
                        }
                    </DetailContainer>
                </PlaceContainer>
                <BookMarker onClick={handleBookmark}>즐겨 찾기 추가</BookMarker>
                <ShareButton onClick={sharePage}>페이지 공유하기</ShareButton>
                <Review />
            </BoxContainer>
            <SideContainer>
                <SideBar>
                    <Map id="placeMap" />
                </SideBar>
                <SideBar>
                    <PlaceRecommend />
                </SideBar>
            </SideContainer>
        </ WholeContainer>
    )
}

export default Place;