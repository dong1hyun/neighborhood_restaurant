import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceImg from "../components/PlaceImg";
import { motion } from "framer-motion";
import Review from "../components/Review";
import { session } from "../atom";
import { useRecoilState } from "recoil";
import Button from 'react-bootstrap/Button';

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
    background-color: black;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin-top: 50px;
    margin-bottom: 100px;
    @media screen and (max-width: 900px) {
        width: 90%;
        margin: 0 auto;
    }
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 220px;
    background-color: black;
    margin-left: 20px;
    margin-top: 50px;
    border-radius: 15px;
`
const PlaceContainer = styled.div`
    display: flex;
    margin: 40px;
    @media screen and (max-width: 900px) {
        flex-direction: column;
        text-align: center;
    }
`
const PlaceName = styled.div`
    font-size: 50px;
    color: white;
    margin-bottom: 40px;
`

const DetailContainer = styled.div`
    margin: 40px;
    color: white;
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
    width: 170px;
    height: 300px;
    border-radius: 10px;
    border: 2px solid black;
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
    background-color: #1e00ff;
    border-radius: 5px;
    border: none;
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
 
    useEffect(() => {
        /* getPlaceData();
        setMarker(x, y); */
    }, [x, y, breakTime]);
    return (
        <WholeContainer>
            <BoxContainer>
                <PlaceContainer>
                    <PlaceImg />
                    <DetailContainer>
                        <PlaceName>{name}</PlaceName>
                        <Category>{category}</Category>
                        <Rating>평점: <>4.6</></Rating>
                        <Detail>{phone}</Detail>
                        <Detail>{address}</Detail>
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
                <Review />
            </BoxContainer>
            <SideBar>
                <Map id="placeMap" />
            </SideBar>
        </ WholeContainer>
    )
}

export default Place;