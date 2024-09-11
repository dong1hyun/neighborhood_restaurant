import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import setMarker from "../function/locationMarker";
import { IoLocationSharp } from "react-icons/io5";
import { SiAuth0 } from "react-icons/si";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
    gap: 20px;
    @media screen and (max-width: 700px) {
        flex-direction: column;
        margin-top: 80px;
    }
`

const Map = styled.div`
    width: 60%;
    height: 400px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    @media screen and (max-width: 700px) {
        height: 250px;
        width: 80%;
    }
`

const LocationContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    border-radius: 10px;
    width: 30%;
    height: 400px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("/home/neighbor.jpg");
        background-size: cover;
        background-position: center;
        opacity: 0.5; /* 배경 이미지의 투명도 설정 */
        z-index: -1; /* 내용물 뒤에 배경을 배치 */
    }
    @media screen and (max-width: 700px) {
        width: 80%;
        height: 300px;
        gap: 40px;
}
`;

const Info = styled.div`
    color: black;
    margin-top: 40px;
    width: 90%;
    padding: 10px;
    border-radius: 10px;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
`

const GetLocationButton = styled.button`
    background-color: #323232;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
`;

const SetLocationButton = styled.button`
    background-color: #4e4ed7;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
`;

const LocationForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LocationInput = styled.input`
    width: 250px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    background-color: #4f4f4f;
    color: white;
    @media screen and (max-width: 700px){
        width: 80%;
    }
`;

interface searchForm {
    location: string
}

export default function LocaionSet() {
    const [searchResult, setSearchResult] = useState<string>('');
    const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);
    const [userAddress, setUserAddress] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sessionID, setSessionID] = useState<string>('');
    const { register, handleSubmit } = useForm<searchForm>();
    const navigate = useNavigate();


    // 카카오API에서 주소 검색 
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

    // 위도와 경도를 이용해 카카오 로컬 API를 통해 해당 좌표의 주소를 가져옵니다
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

    //사용자의 현재 위치를 가져오는 기능 + 자신의 위도/경도 getAddressFromCoordinates로 보내서 주소로 변경
    const handleGetUserLocation = () => {
        console.log("실행됨");
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setMarker(latitude, longitude);
                console.log(latitude, longitude);
                setUserLocation({ x: longitude, y: latitude });
                const address = await getAddressFromCoordinates(latitude, longitude);
                if (address) {
                    setUserAddress(address);
                    console.log('사용자의 위치:', address);
                }
            },
            (error) => {
                console.error("Error occurred while fetching location: ", error);
                alert(`위치 정보를 가져오지 못했습니다: ${error.message}`);
            },
            {
                enableHighAccuracy: true, // 고정밀도 위치 정보 사용
                timeout: 5000, // 타임아웃 설정
                maximumAge: 0 // 캐시된 위치 정보를 사용하지 않음
            }
        );
    };


    const isAddressMatch = (address1: string, address2: string): boolean => {
        const regex = /(.+?(읍|면|동))/;
        const match1 = address1.match(regex);
        const match2 = address2.match(regex);
        return !!match1 && !!match2 && match1[1] === match2[1];
    };

    //특정 세선 ID와 주소를 서버로 전송
    const sendLocationToServer = async (sessionID: string, address: string) => {
        try {
            // 주소에서 숫자를 제거합니다.
            const cleanedAddress = address.replace(/\d+/g, '').trim().replace(/-$/, '');
            const response = await axios.post('/location', { sessionID, address: cleanedAddress });
            console.log('서버 응답:', response.data);
        } catch (error) {
            console.error('서버로 위치 전송 중 오류가 발생했습니다:', error);
        }
    };


    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID') + '';
        if(!loggedInSessionID) {
            alert("로그인이 필요한 서비스 입니다.");
            navigate("/logIn")
        }
        setSessionID(loggedInSessionID);
        setMarker(37.56683320853823, 126.97862961813682);
    }, []);
    return (
        <Container>
            <Map id="locationMap" />
            <LocationContainer>
                <Info>위치를 가져오고 동네를 입력하면 동네인증이 완료됩니다!</Info>
                <GetLocationButton onClick={handleGetUserLocation}><IoLocationSharp size={20} color="rgba(15, 188, 249,1.0)" /> 내 위치 가져오기</GetLocationButton>
                <LocationForm onSubmit={handleSubmit(handleSearch)}>
                    <LocationInput
                        placeholder="동네 입력"
                        value={searchTerm} // searchTerm 값으로 입력란의 값 설정
                        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 시 searchTerm 업데이트
                    />
                    <SetLocationButton type="submit"><SiAuth0 /> 인증하기</SetLocationButton>
                </LocationForm>
            </LocationContainer>
        </Container>
    );
}