import axios from "axios";
import { useState } from "react";
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
    const [searchResult, setSearchResult] = useState<string>('');
    const [sessionID, setSessionID] = useState<string>('');
    const [userAddress, setUserAddress] = useState<string>('');
    const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

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
            const response = await axios.post('/location', { sessionID, address });
            console.log('서버로부터의 응답:', response.data);
        } catch (error) {
            console.error('서버로 위치 전송 중 오류가 발생했습니다:', error);
        }
    };

    // const getReviewData = async () => {
    //     await axios.get(`/myPage/reviews/${id}`)
    // }
    

    //위치, 리뷰, 즐겨찾기
    return (
        <BoxContainer>
            <Title>나의 리뷰</Title>
            {["리뷰 1", "리뷰 2", "리뷰 3", "리뷰 4"].map((comment) => {
                return (
                    <ReviewContainer>
                        <Rating>&#9733; 4.3</Rating>
                        <Comment>{comment}</Comment>
                    </ReviewContainer>
                )
            })}
        </BoxContainer>
    )
}

export default MyPage;