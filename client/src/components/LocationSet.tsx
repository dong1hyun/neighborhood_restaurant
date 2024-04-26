import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const LocationContainer = styled.div`
    height: 200px;
    background: linear-gradient(45deg, rgba(27, 156, 252,1.0), rgba(37, 204, 247,1.0));
    margin-top: 30px;
    margin-bottom: 50px;
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
    background-color: white;
    color: black;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    margin-top: 40px;
    cursor: pointer;
`;

const LocationForm = styled.form`
`;

const LocationInput = styled.input`
    width: 300px;
    height: 30px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    padding-left: 10px;
`;



export default function LocaionSet() {
    const [searchResult, setSearchResult] = useState<string>('');
    const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);
    const [userAddress, setUserAddress] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sessionID, setSessionID] = useState<string>('');
    const { register, handleSubmit } = useForm();
    const isAddressMatch = (address1: string, address2: string): boolean => {
        const regex = /(.+?(읍|면|동))/;
        const match1 = address1.match(regex);
        const match2 = address2.match(regex);
        return !!match1 && !!match2 && match1[1] === match2[1];
    };

    const sendLocationToServer = async (sessionID: string, address: string) => {
        try {
            const response = await axios.post('/location', { sessionID, address });
            console.log('서버 응답:', response.data);
        } catch (error) {
            console.error('서버로 위치 전송 중 오류가 발생했습니다:', error);
        }
    };

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
                    console.log('검색된 위치가 사용자의 위치와 일치합니다.');
                    sendLocationToServer(sessionID, address_name);
                } else {
                    console.log('검색된 위치가 사용자의 위치와 일치하지 않습니다.');
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
            setUserLocation({ x: longitude, y: latitude });
            const address = await getAddressFromCoordinates(latitude, longitude);
            if (address) {
                setUserAddress(address);
                console.log('사용자의 위치:', address);
            }
        });
    };

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID') + '';
        setSessionID(loggedInSessionID);
    }, [])
    return (
        <LocationContainer>
            <GetLocationButton onClick={handleGetUserLocation}>내 위치 가져오기</GetLocationButton>
            <LocationForm onSubmit={handleSubmit(handleSearch)}>
                <LocationInput
                    placeholder="자신이 속한 읍/면/동을 입력해주세요!"
                    {...register("location", {required: true})}
                />
                <SetLocationButton type="submit">인증하기</SetLocationButton>
            </LocationForm>
        </LocationContainer>)
}