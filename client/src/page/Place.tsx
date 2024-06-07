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
import PlaceRecommend from "../components/place/PlaceRecommend";
import { GiRotaryPhone } from "react-icons/gi";
import { FaAddressBook } from "react-icons/fa";
import { MdStarBorder } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

const WholeContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 150px;
    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
`

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    background-color: whitesmoke;
    color: white;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin-bottom: 100px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
    @media screen and (max-width: 1200px) {
        align-items: center;
    }
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
    margin-bottom: 50px;
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
    @media screen and (max-width: 1200px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
    }
`
const PlaceName = styled.div`
    font-size: 43px;
    font-weight: 500;
    min-width: 300px;
    color: black;
    margin-bottom: 40px;
    @media screen and (max-width: 900px) {
        font-size: 30px;
    }
`

const Divider = styled.div`
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 30px;
  @media screen and (max-width: 1200px) {
        margin: auto;
        margin-bottom: 30px;
    }
`;

const Divider2 = styled.div`
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 30px;
  margin-left: 40px;
  @media screen and (max-width: 1200px) {
        margin: auto;
        margin-bottom: 30px;
    }
`;

const DetailContainer = styled.div`
    margin: 40px;
    color: black;
`

const RatingContainer = styled.div`
    position: relative;
    font-size: 30px;
    margin-bottom: 40px;
    color: #c01c34;
    @media screen and (max-width: 1200px) {
        display: flex;
        justify-content: center;
    }
`

const Rating = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
    z-index: 1;
`

const Paint = styled.img`
    position: absolute;
    width: 150px;
    top: -30%;
    left: -5%;
    @media screen and (max-width: 1200px) {
        left: 25%;
    }
`

const Detail = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    margin-bottom: 40px;
    min-width: 250px;
`

const Category = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 15px;
    color: black;
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
    background-color: #3e3e3e;;
    padding: 5px;
    color: white;
    width: 60px;
`

const TimeContainer = styled(motion.div)`
`

const ButtonContainer = styled.div`
    
`

const BookMarker = styled.button`
    color: white;
    width: 200px;
    height: 25px;
    /* margin-left: 40px; */
    margin-top: 40px;
    background-color: #3e3e3e;
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const ShareButton = styled.button`
    color: white;
    width: 200px;
    height: 25px;
    margin-top: 10px;
    margin-bottom: 30px;
    background-color: rgba(245, 59, 87, 1.0);
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    font-family: "Jua", sans-serif;
    font-weight: 400;
    font-style: normal;
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
                console.log(res.data);
                setName(res.data.restaurant.restaurantName);
                setAddress(res.data.restaurant.restaurantAddress);
                setCategory(res.data.restaurant.restaurantCategory);
                setPhone(res.data.restaurant.restaurantNumber);
                setX(res.data.restaurant.x);
                setY(res.data.restaurant.y);
                setTimeList(JSON.parse(res.data.restaurant.timeList))
                timeList.forEach((i) => {
                    if (i["timeName"] == "휴게시간") {
                        setBreakTime(true)
                    } else if (i["timeName"] == "라스트오더") {
                        setLastOrder(true);
                    }
                });
                console.log("끝이야")
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
        /* getPlaceData();
        setMarker(x, y); */
    }, [x, y, breakTime]);
    return (
        <WholeContainer>
            <BoxContainer>
                <PlaceContainer>
                    <PlaceImg />
                    <DetailContainer>
                        <PlaceName>로우앤슬로우</PlaceName>
                        <Divider />
                        <Category>한식 육류</Category>
                        <RatingContainer>평점: 4.6</RatingContainer>
                        <Detail><GiRotaryPhone /> 02-498-0929</Detail>
                        <Detail><FaAddressBook /> 서울 광진구 아차산로 238-1</Detail>
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
                <BookMarker onClick={handleBookmark}>즐겨 찾기 추가<MdStarBorder /></BookMarker>
                <ShareButton onClick={sharePage}>페이지 공유하기<IoShareSocialOutline /></ShareButton>
                <Divider2 />
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





/* 
<WholeContainer>
    <BoxContainer>
        <PlaceContainer>
            <PlaceImg />
            <DetailContainer>
                <PlaceName>{name}</PlaceName>
                <Divider />
                <Category>{category}</Category>
                <Rating>평점 <>4.6</></Rating>
                <Detail><GiRotaryPhone /> {phone}</Detail>
                <Detail><FaAddressBook /> {address}</Detail>
                영업시간 <TimeBtn onClick={() => showMoreInf(cur => !cur)}>보기</TimeBtn>
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
        <BookMarker onClick={handleBookmark}>즐겨 찾기 추가<MdStarBorder /></BookMarker>
        <ShareButton onClick={sharePage}>페이지 공유하기<IoShareSocialOutline /></ShareButton>
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
</ WholeContainer> */




/* 
<WholeContainer>
            <BoxContainer>
                <PlaceContainer>
                    <PlaceImg />
                    <DetailContainer>
                        <PlaceName>끝돈</PlaceName>
                        <Divider />
                        <Category>한식 육류</Category>
                        <Rating>평점 <>4.6</></Rating>
                        <Detail><GiRotaryPhone /> 02-498-0929</Detail>
                        <Detail><FaAddressBook /> 서울 광진구 아차산로 238-1</Detail>
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
                <BookMarker onClick={handleBookmark}>즐겨 찾기 추가<MdStarBorder /></BookMarker>
                <ShareButton onClick={sharePage}>페이지 공유하기<IoShareSocialOutline /></ShareButton>
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
        </ WholeContainer> */