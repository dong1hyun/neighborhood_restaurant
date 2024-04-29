import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin: 0 auto;
    margin-bottom: 100px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 900px) {
        width: 90%;
    }
`

const PlaceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
`

const PlaceBox = styled.div`
    position: relative;
    text-align: center;
    height: 80%;
`

const PlaceImg = styled(motion.img)`
    background-color: black;
    text-align: center;
    border-radius: 10px;
    width: 80%;
    height: 100%;
    color: black;
    @media screen and (max-width: 700px){
        
    }
`

const PlaceTitle = styled(motion.div)`
    position: absolute;
    width: 80%;
    height: 25px;
    bottom: 0;
    left: 10%;
    color: white;
    font-size: 20px ;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.7);
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
    const [userReviews, setUserReviews] = useState<{ comment: string, rating: number, restaurantId: string }[]>([]);
    const [showTitle, setShowTitle] = useState(0);
    const [nickName, setNickName] = useState<string>(''); // 사용자 이름 상태 추가
    const navigate = useNavigate();


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
                setNickName(response.data.nickName); // 사용자 이름 설정
            } else {
                console.error('사용자 리뷰를 불러오지 못했습니다.');
            }
        } catch (error) {
            console.error('사용자 리뷰를 가져오는 중 오류가 발생했습니다:', error);
        }
    }
    const handleReviewClick = (restaurantId: string) => {
        navigate(`/place/${restaurantId}`);
    };

    return (
        <BoxContainer>
            <Title>즐겨 찾는 식당</Title>
            <PlaceContainer>
                {restaurantData.map((restaurant, index) => (
                    <PlaceBox>
                        <PlaceImg key={index} src={restaurant.img} alt={restaurant.restaurantName} onClick={() => navigate(`/place/${restaurant.restaurantId}`)} // 이미지 클릭 시 페이지 이동
                        />
                        {showTitle == index + 1 ? <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>식당이름</PlaceTitle> : null}
                    </PlaceBox>
                ))}
            </PlaceContainer>
            <Title>나의 리뷰</Title>
            {userReviews.map((review, index) => (
                <ReviewContainer key={index} onClick={() => handleReviewClick(review.restaurantId)}>
                    <div>작성자: {nickName}</div>
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


// {["http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037"].map((item, idx) => {
//     return (
//         <PlaceBox>
//             <PlaceImg key={idx} src={item} onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)} />
//             {showTitle == idx + 1 ? <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>식당이름</PlaceTitle> : null}
//         </PlaceBox>
//     )
// })}


// {restaurantData.map((restaurant, index) => (
//     <PlaceImg key={index} src={restaurant.img} alt={restaurant.restaurantName} />
// ))}

// {userReviews.map((review, index) => (
//     <ReviewContainer key={index}>
//         <Rating>&#9733; {review.rating}</Rating>
//         <Comment>{review.comment}</Comment>
//     </ReviewContainer>
// ))}