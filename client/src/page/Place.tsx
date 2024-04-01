import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceImg from "../components/PlaceImg";
import { motion } from "framer-motion";

const Container = styled.div`
    display: flex;
    justify-content: center;
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
    background-color: black;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin-top: 50px;
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
    
    /* let test = JSON.parse('[{ "timeName": "영업시간", "timeSE": "11:00 ~ 21:30", "dayOfWeek": "매일" }, { "timeName": "라스트오더", "timeSE": "~ 21:00", "dayOfWeek": "매일" }, { "timeName": "휴게시간", "timeSE": "14:30 ~ 17:00", "dayOfWeek": "월~금" }, { "timeName": "휴게시간", "timeSE": "15:00 ~ 17:00", "dayOfWeek": "토,일" }]') */
    const getPlaceData = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setName(res.data.name);
                setAddress(res.data.address);
                setCategory(res.data.category);
                setPhone(res.data.phone);
                setX(res.data.x);
                setY(res.data.y);
                setTimeList(JSON.parse(res.data.timeList))
                timeList.forEach((i) => {
                    if (i["timeName"] == "휴게시간") {
                        setBreakTime(true)
                    } else if(i["timeName"] == "라스트오더") {
                        setLastOrder(true);
                    }
                }); 
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
    }
    useEffect(() => {
        getPlaceData();
        setMarker(x, y);
    }, [x, y, breakTime])
    return (
        <Container>
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
            <SideBar>
                <Map id="placeMap" />
                
            </SideBar>
        </ Container>
    )
}

export default Place;