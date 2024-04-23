import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

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



const LocationForm = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const LocationInput = styled.input`
    width: 300px;
    height: 30px;
    margin-right: 10px;
`;

const GetLocationButton = styled.button`
    background-color: white;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
`;




function MyPage() {
    const [searchResult, setSearchResult] = useState<string>('');
    const [sessionID, setSessionID] = useState<string>('');
    const [userAddress, setUserAddress] = useState<string>('');
    const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [restaurantData, setRestaurantData] = useState();
    const [userReviews, setUserReviews] = useState<{ comment: string, rating: number }[]>([]);


    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchTerm}`, {
                headers: {
                    Authorization: "KakaoAK f1a6ff5fce786c3d0407226bb3e8ec57"
                }
            });
            if (response.data.documents && response.data.documents.length > 0) {
                const { address_name } = response.data.documents[0];
                setSearchResult(address_name);
                if (isAddressMatch(address_name, userAddress)) {
                    console.log('검색된 위치와 사용자 위치가 동일합니다.');
                    // 여기서 서버로 값을 보내는 작업 수행
                    sendLocationToServer(sessionID, address_name);
                } else {
                    console.log('검색된 위치와 사용자 위치가 동일하지 않습니다.');
                }
            } else {
                console.error('검색 결과를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
        }
    };


    const handleGetUserLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ x: longitude, y: latitude });
            const address = await getAddressFromCoordinates(latitude, longitude);
            if (address) {
                setUserAddress(address);
                console.log('사용자 위치:', address);
            }
        });
    };


    const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
                headers: {
                    Authorization: "KakaoAK f1a6ff5fce786c3d0407226bb3e8ec57"
                }
            });
            if (response.data.documents && response.data.documents.length > 0) {
                const address = response.data.documents[0].address.address_name;
                return address;
            } else {
                console.error('주소를 찾을 수 없습니다.');
                return null;
            }
        } catch (error) {
            console.error('주소를 가져오는 중 오류가 발생했습니다:', error);
            return null;
        }
    };

    const isAddressMatch = (address1: string, address2: string): boolean => {
        const regex = /(.+?(읍|면|동))/;
        const match1 = address1.match(regex);
        const match2 = address2.match(regex);
        return !!match1 && !!match2 && match1[1] === match2[1];
    };

    const sendLocationToServer = async (sessionID: string, address: string) => {
        try {
            // console.log('서버로 전송하는 세션 아이디:', sessionID); // 세션 아이디 확인용 콘솔
            const response = await axios.post('/location', { sessionID, address });
            console.log('서버로부터의 응답:', response.data);
        } catch (error) {
            console.error('서버로 위치 전송 중 오류가 발생했습니다:', error);
        }
    };

    const getReviewData = async (sessionID:string) => {
        try {
            const response = await axios.get(`/review/userReviews/${sessionID}`);
            if (response.data.success) {
                setUserReviews(response.data.reviews);
            } else {
                console.error('사용자 리뷰를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('사용자 리뷰를 가져오는 중 오류가 발생했습니다:', error);
        }
    }


    
    // 수정중) 마이페이지 즐겨찾기
    // 세션아이디로 해당 사용자의 리뷰나 즐겨찾기 가져 올 예정
    const getFavoriteData = async (sessionID:string) => {
        await axios.get(`/favorite/read/${sessionID}`) 
        .then((res) => {
            console.log(res.data);
        })
    }



    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID') + ''; // 세션 스토리지에서 세션 아이디 가져오기
        setSessionID(loggedInSessionID);
        getFavoriteData(loggedInSessionID);
        getReviewData(loggedInSessionID);
    }, [])


    
    //위치, 리뷰, 즐겨찾기
 
    return (
        <BoxContainer>
            <LocationForm>
                <LocationInput 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="위치 검색"
                />
                <GetLocationButton onClick={handleSearch}>인증하기</GetLocationButton>
            </LocationForm>

            <GetLocationButton onClick={handleGetUserLocation}>내 위치 가져오기</GetLocationButton>
            
            <Title>즐겨 찾는 식당</Title>
            <PlaceContainer>
                {/* 즐겨찾는 식당 목록 표시 */}
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

