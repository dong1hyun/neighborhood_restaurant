import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    color: white;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin: 0 auto;
    margin-bottom: 100px;
    @media screen and (max-width: 900px) {
        width: 90%;
    }
`

const PlaceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
`

const PlaceBox = styled(motion.img)`
    margin: 30px;
    background-color: white;
    width: 300px;
    height: 300px;
    background-size: cover;
    background-position: center center;
    color: black;
    @media screen and (max-width: 700px){
    }
`

const ReviewContainer = styled.div`
    border: solid 1px white;
    border-radius: 5px;
    margin: 20px;
    font-size: 30px;
    height: 100%;
`

const Title = styled.div`
    font-size: 30px;
    margin: 20px;
`

const Rating = styled.div`
    margin: 10px;
`

const Comment = styled.div`
    margin: 10px;
`

function MyPage() {
    const [sessionID, setSessionID] = useState<string>('');
    const [restaurantData, setRestaurantData] = useState<any[]>([]);
    const [userReviews, setUserReviews] = useState<{ comment: string, rating: number }[]>([]);

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID') + '';
        setSessionID(loggedInSessionID);
        getFavoriteData(loggedInSessionID);
        getReviewData(loggedInSessionID);
    }, [])

    const getFavoriteData = async (sessionID: string) => {
        try {
            const response = await axios.get(`/restaurant/${sessionID}`);
            if (response.data.restaurantData) {
                setRestaurantData(response.data.restaurantData);
            } else {
                console.error('즐겨찾는 식당 데이터를 불러오지 못했습니다.');
            }
        } catch (error) {
            console.error('즐겨찾는 식당 데이터를 가져오는 중 오류가 발생했습니다:', error);
        }
    }

    const getReviewData = async (sessionID: string) => {
        try {
            const response = await axios.get(`/review/userReviews/${sessionID}`);
            if (response.data.success) {
                setUserReviews(response.data.reviews);
            } else {
                console.error('사용자 리뷰를 불러오지 못했습니다.');
            }
        } catch (error) {
            console.error('사용자 리뷰를 가져오는 중 오류가 발생했습니다:', error);
        }
    }

    return (
        <BoxContainer>            
            <Title>즐겨 찾는 식당</Title>
            <PlaceContainer>
                {restaurantData.map((restaurant, index) => (
                    <PlaceBox key={index} src={restaurant.img} alt={restaurant.restaurantName} />
                ))}
            </PlaceContainer>
            <Title>나의 리뷰</Title>
            {userReviews.map((review, index) => (
                <ReviewContainer key={index}>
                    <Rating>&#9733; {review.rating}</Rating>
                    <Comment>{review.comment}</Comment>
                </ReviewContainer>
            ))}
        </BoxContainer>
    )
}

export default MyPage;


// 마이페이지 즐겨찾기 음식점 클릭시 해당 RestaurantId로 이동
// 마이페이지 리뷰들에 사용자 이름 표시 및 클릭시 RestaurantId로 이동 or 해당 RestaurantId점명만 표시