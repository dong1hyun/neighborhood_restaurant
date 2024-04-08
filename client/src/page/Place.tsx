import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceImg from "../components/Placeimg";
import { motion } from "framer-motion";


const Container = styled.div`
    display: flex;
    justify-content: center;
    @media screen and (max-width: 700px) {
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
    @media screen and (max-width: 700px) {
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
const BookmarkBtn = styled.button`
    border: none;
    border-radius: 3px;
    background-color: whitesmoke;
    width: 100px;
    margin-top: 20px;
`
const ReviewForm = styled.form`c
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 300%;
`
const ReviewInput = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
`
const ReviewSubmitBtn = styled.button`
    width: 100px;
    align-self: flex-end;
`

function Place() {
    const { id } = useParams();
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
    const [sessionID, setSessionID] = useState('');
    const [reviewcomment, setReviewcomment] = useState('');



    const getPlaceData = async () => {
        try {
            const response = await axios.get(`/placeDetail/${id}`);
            setName(response.data.restaurantName);
            setAddress(response.data.address);
            setCategory(response.data.Category);
            setPhone(response.data.restaurantNumber);
            setX(response.data.x);
            setY(response.data.y);
            setTimeList(JSON.parse(response.data.timeList));
            setTimeStatus(response.data.timeList);
        } catch (error) {
            console.error('장소 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    }
    
    const setTimeStatus = (timeListString: string) => {
        const parsedTimeList = JSON.parse(timeListString);
        parsedTimeList.forEach((time: any) => {
            if (time["timeName"] === "휴게시간") {
                setBreakTime(true);
            } else if(time["timeName"] === "라스트오더") {
                setLastOrder(true);
            }
        });
    };
    
    useEffect(() => {
        getPlaceData();
    }, []);

    useEffect(() => {
        setMarker(x, y);
    }, [x, y]);

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID');
        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
    }, []);

    // 리뷰작성    
    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (sessionID) {
            try {
                const reviewInfo = {
                    sessionID: sessionID,
                    restaurantID: id,
                    comment: reviewcomment
                };
                const response = await axios.post('/review', reviewInfo);
                console.log('서버 응답:', response.data);
                console.log('리뷰가 성공적으로 작성되었습니다.');
                // 리뷰 작성 후 추가적인 작업을 수행할 수 있음
            } catch (error) {
                console.error('리뷰 작성 중 오류가 발생했습니다:', error);
            }
        } else {
            console.log('로그인이 필요합니다.');
        }
    };



    // 즐겨찾기 api /상태에 따른 메시지 출력 추가 예정
    const handleBookmark = async () => {
        if (sessionID) {
            try {
                // 즐겨찾기 추가할 장소의 정보
                const favoritePlaceInfo = {
                    sessionID: sessionID,
                    restaurantID: id
                };
    
                // 서버로 POST 요청을 보냅니다.
                const response = await axios.post('/favorite', favoritePlaceInfo);
    
                // 서버 응답 확인
                console.log('서버 응답:', response.data);
    
                // 즐겨찾기가 성공적으로 추가되었을 경우 메시지 출력
                console.log('장소를 즐겨찾기에 추가했습니다.');
            } catch (error) {
                // 요청이 실패하거나 서버 응답에 오류가 있을 경우 에러 처리
                console.error('즐겨찾기 추가 중 오류가 발생했습니다:', error);
            }
        } else {
            console.log('로그인이 필요합니다.');
        }
    };
    
    

    return (
        <Container>
            <BoxContainer>
            <PlaceContainer>
                <PlaceImg />
                <DetailContainer>
                    <PlaceName>{name}</PlaceName>
                    <Category>{category}</Category>
                    <Rating>평점: 4.6</Rating>
                    <Detail>{phone}</Detail>
                    <Detail>{address}</Detail>
                    <BookmarkBtn onClick={handleBookmark}>즐겨찾기에 추가</BookmarkBtn>
                    <ReviewForm onSubmit={handleReviewSubmit}>
                        <ReviewInput
                            value={reviewcomment}
                            onChange={(e) => setReviewcomment(e.target.value)}
                            placeholder="리뷰를 작성해주세요."
                        />
                        <ReviewSubmitBtn type="submit">리뷰 작성</ReviewSubmitBtn>
                    </ReviewForm>
                    <div>
                        영업시간 <TimeBtn onClick={() => showMoreInf(!moreInf)}>더보기</TimeBtn>
                        {moreInf && (
                            <TimeContainer
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                {timeList.map((time: any) => (
                                    <Time key={time.timeName}>{time.dayOfWeek}: {time.timeSE}</Time>
                                ))}
                                {breakTime && <Time>휴게시간</Time>}
                                {lastOrder && <Time>라스트오더</Time>}
                            </TimeContainer>
                        )}
                    </div>
                </DetailContainer>
            </PlaceContainer>
            </BoxContainer>
            <SideBar>
                <Map id="placeMap" />
            </SideBar>
        </Container>
    )
}

export default Place;
