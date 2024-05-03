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
    const [showTitle, setShowTitle] = useState(0);
    const [userReviews, setUserReviews] = useState<{ restaurantId: string, comment: string, rating: number }[]>([]);
    const [nickName, setNickName] = useState<string>(''); // 사용자 이름 상태 추가
    const [newnickName, setnewnickName] = useState('');
    const [newPassword, setNewPassword] = useState('');
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

    // 로그인 된 사용자의 닉네임 변경
    const handlenickNameChange = (event:any) => {
        setnewnickName(event.target.value);
    };
    const handleSubmitnickName = async (event:any) => {
        event.preventDefault();
        try {
            // Make a request to update the nickname
            const response = await axios.put(`/updateNickname/${sessionID}`, { nickname: newnickName });
            if (response.data.success) {
                // Update the nickname in the state
                setNickName(newnickName);
                // Clear the input field
                setnewnickName('');
                console.log('Nickname updated successfully!');
            } else {
                console.error('Failed to update nickname.');
            }
        } catch (error) {
            console.error('Error updating nickname:', error);
        }
    };

    // 로그인 된 사용자의 비밀번호 변경
    const handlePasswordChange = (event:any) => {
        setNewPassword(event.target.value);
    };
    const handleSubmitPassword = async (event:any) => {
        event.preventDefault();
        try {
            // Make a request to update the password
            const response = await axios.put(`/updatePassword/${sessionID}`, { password: newPassword });
            if (response.data.success) {
                // Clear the input field
                setNewPassword('');
                console.log('Password updated successfully!');
            } else {
                console.error('Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <BoxContainer>
            <Title>즐겨 찾는 식당</Title>
            <PlaceContainer>
                {restaurantData.map((restaurant, index) => (
                    <PlaceBox>
                        <PlaceImg
                            key={index}
                            src={restaurant.img}
                            alt={restaurant.restaurantName}
                            onClick={() => navigate(`/place/${restaurant.restaurantId}`)}
                        />
                        {showTitle == index + 1 ? (
                            <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>
                                식당이름
                            </PlaceTitle>
                        ) : null}
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
    
            {/* 닉네임 변경 폼 */}
            <form onSubmit={handleSubmitnickName}>
                <label htmlFor="nickName">닉네임 변경:</label>
                <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    value={newnickName}
                    onChange={handlenickNameChange}
                    placeholder="새로운 별명 입력"
                />
                <button type="submit">별명 변경</button>
            </form>

            {/* 비밀번호 변경 폼 */}
            <form onSubmit={handleSubmitPassword}>
                <label htmlFor="password">비밀번호 변경:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder="새로운 비밀번호 입력"
                />
                <button type="submit">비밀번호 변경</button>
            </form>
        </BoxContainer>
    );
    
}
export default MyPage;
