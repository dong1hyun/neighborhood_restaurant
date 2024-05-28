import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import setMarker from "../../function/locationMarker";
import { IoLocationSharp } from "react-icons/io5";
import { SiAuth0 } from "react-icons/si";

const Map = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    margin-top: 80px;
    margin-bottom: 80px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
`

const LocationContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    border-radius: 10px;
    width: 60%;
    height: 200px;
    box-shadow: 5px 2px 10px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: #3589ff96;
    margin-top: 30px;
    text-align: center;
`

const GetLocationButton = styled.button`
    background-color: white;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    margin-top: 40px;
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
    margin-top: 40px;
`;

const LocationInput = styled.input`
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    @media screen and (max-width: 700px){
        width: 80%;
    }
`;

const Test = styled.span`
    margin-bottom: 10px;
`

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
    const handleSearch = async ({ location }: searchForm) => {
        try {
            const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${location}`, {
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

    const handleGetUserLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setMarker(latitude, longitude);
            console.log(latitude, longitude)
            setUserLocation({ x: longitude, y: latitude });
            const address = await getAddressFromCoordinates(latitude, longitude);
            if (address) {
                setUserAddress(address);
                console.log('사용자의 위치:', address);
            }
        });
    };

    const isAddressMatch = (address1: string, address2: string): boolean => {
        const regex = /(.+?(읍|면|동))/;
        const match1 = address1.match(regex);
        const match2 = address2.match(regex);
        return !!match1 && !!match2 && match1[1] === match2[1];
    };

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
        setSessionID(loggedInSessionID);
        setMarker(37.56683320853823, 126.97862961813682);
    }, [])
    return (
            <Map id="locationMap">
            <LocationContainer>
                <GetLocationButton onClick={handleGetUserLocation}><IoLocationSharp size={20} color="rgba(15, 188, 249,1.0)"  /> 내 위치 가져오기</GetLocationButton>
                <LocationForm onSubmit={handleSubmit(handleSearch)}>
                    <LocationInput
                        placeholder="자신의 동네 입력"
                        value={searchTerm} // searchTerm 값으로 입력란의 값 설정
                        onChange={(e) => setSearchTerm(e.target.value)} // 입력값 변경 시 searchTerm 업데이트
                    />
                    <SetLocationButton type="submit"><SiAuth0 /> 인증하기</SetLocationButton>
                </LocationForm>
            </LocationContainer>
            </Map>
    );

}