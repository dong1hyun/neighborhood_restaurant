import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfoUpdate from "../components/myPage/InfoUpdate";
import { Comment, Divider, InteractionContainer, InteractionItem, ProfileContainer, ProfileInfo, Rating } from "../styled-components/reviewStyle";
import { RxAvatar } from "react-icons/rx";
import { FaThumbsUp } from "react-icons/fa6";
import { EllipsisText } from "../styled-components/homeStyle";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    background-color: whitesmoke;
    color: black;
    border-radius: 15px;
    height: 100%;
    width: 55%;
    margin: 0 auto;
    margin-bottom: 100px;
    margin-top: 150px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
    @media screen and (max-width: 700px) {
        width: 90%;
    }
`

const PlaceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30px;
    place-items: center;
    align-items: center;
    margin: auto;
    margin-bottom: 50px;
`

const PlaceBox = styled(motion.div)`
    position: relative;
    text-align: center;
    height: 80%;
    width: 80%;
    cursor: pointer;
`


const PlaceImg = styled(motion.img)`
    background-color: black;
    text-align: center;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    color: black;
    @media screen and (max-width: 700px){
        
    }
`

const PlaceTitle = styled(motion.div)`
    position: absolute;
    width: 100%;
    height: 40px;
    color: black;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
`

const Title = styled.div`
    font-size: 30px;
    margin-bottom: 30px;
`

const ReviewContainer = styled(motion.div)`
  position: relative;
  border: solid 1px #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  height: auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 50px;
  cursor: pointer;
`;

export const MyRating = styled.div`
  font-size: 20px;
  margin-left: auto;
`;


const BasicDivider = styled.div`
  width: 200px;
  height: 1px;
  background-color: #ccc;
  margin-top: 80px;
  margin-bottom: 30px;
  @media screen and (max-width: 1200px) {
        margin: auto;
        margin-bottom: 30px;
    }
`;

interface reviewForm {
    comment: string;
    rating: number;
    restaurantId: string;
}

function MyPage() {
    const [sessionID, setSessionID] = useState<string>('');
    const [restaurantData, setRestaurantData] = useState<any[]>([]);
    const [userReviews, setUserReviews] = useState<reviewForm[]>([]);
    const [nickName, setNickName] = useState<string>(''); // 사용자 이름 상태 추가
    const [like, setLike] = useState();
    const [newNickName, setNewNickName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentAddress, setCurrentAddress] = useState('');
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
                setLike(response.data.like)
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

     // 사용자 인증 주소 표시
     const handleSubmitGetAddress = async (event: any) => {
        event.preventDefault();
        try {
            // Make a request to retrieve the address
            const response = await axios.get(`/userAddress/${sessionID}`);
            if (response.data.success) {
                // Update the state with the retrieved address
                setCurrentAddress(response.data.address);
                console.log('Address retrieved successfully!');
            } else {
                console.error('Failed to retrieve address.');
            }
        } catch (error) {
            console.error('Error retrieving address:', error);
        }
    };

    return (
        <Container>
            <Title>즐겨 찾는 식당</Title>
            <PlaceContainer>
                {["http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037"].map((item, idx) => {
                    return (
                        <PlaceBox whileHover={{scale:1.1}}>
                            <Rating><span style={{ color: "#ff5b32" }}>&#9733;</span> 3.6</Rating>
                            <PlaceImg key={idx} src={item} />
                            <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}><EllipsisText>식당이름</EllipsisText></PlaceTitle>
                        </PlaceBox>
                    )
                })}
            </PlaceContainer>
            <BasicDivider />
            <Title>나의 리뷰</Title>
            {[{restaurantId: "123", rating: 3, comment: "굳"}].map((review, index) => (
                <ReviewContainer whileHover={{scale:1.03}} key={index} onClick={() => handleReviewClick(review.restaurantId)}>
                    <ProfileContainer>
                        <RxAvatar size={30} />
                        <ProfileInfo>ㅎㅇ</ProfileInfo>
                        <MyRating>&#9733; {review.rating}</MyRating>
                    </ProfileContainer>
                    <Divider />
                    <Comment>{review.comment}</Comment>
                    <InteractionContainer>
                        <InteractionItem type="submit">
                            <FaThumbsUp />
                            {like}
                        </InteractionItem>
                    </InteractionContainer>
                </ReviewContainer>
            ))}
            <BasicDivider />
            <Title>정보 수정</Title>
            <InfoUpdate />
            <BasicDivider />
            <form onSubmit={handleSubmitGetAddress}>
                <label htmlFor="address">현재 주소:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={currentAddress}
                    readOnly // Make the input readOnly to prevent user input
                    placeholder="현재 주소"
                />
                <button type="submit">주소 조회</button>
            </form>
        </Container>
    );

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
