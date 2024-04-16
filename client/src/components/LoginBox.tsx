import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import styled from "styled-components";

interface FormData {
    id: string;
    password: string;
}

const LoginContainer = styled(motion.div)`
    position: absolute;
    z-index: 1;
    top: 200px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 400px;
    height: 300px; /* Increased height to accommodate the search section */
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    text-align: center;
`;

const SearchContainer = styled.div`
    margin-top: 20px; /* Increased margin for better spacing */
`;

const SessionExpirationInfo = styled.div`
    margin-top: 10px;
    font-size: 14px;
`;

const boxVariants = {
    initial: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1
    },
    leaving: {
        opacity: 0,
        scale: 0
    }
};

export default function LoginBox() {
    const [formData, setFormData] = useState<FormData>({ id: '', password: '' });
    const [sessionID, setSessionID] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResult, setSearchResult] = useState<string>('');
    const [userLocation, setUserLocation] = useState<{ x: number, y: number } | null>(null);
    const [userAddress, setUserAddress] = useState<string>('');
    const navigate = useNavigate();
    const [sessionExpiration, setSessionExpiration] = useState<Date | null>(null);

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID');
        const loggedInUserName = sessionStorage.getItem('userName');
        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
        if (loggedInUserName) {
            setUserName(loggedInUserName);
        }
    }, []);

    useEffect(() => {
        if (sessionID) {
            const expiration = new Date();
            expiration.setMinutes(expiration.getMinutes() + 10); // 10분으로 변경
            setSessionExpiration(expiration);
    
            const timer = setTimeout(() => {
                handleLogout();
            }, 10 * 60 * 1000); // 밀리초 단위로 변경
    
            return () => clearTimeout(timer);
        }
    }, [sessionID]);
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            const { sessionID, userName } = response.data;
            if (response.data.message === '로그인 성공' && sessionID) {
                setSessionID(sessionID);
                setUserName(userName);
                sessionStorage.setItem('sessionID', sessionID);
                sessionStorage.setItem('userName', userName);
            } else {
                console.error('로그인 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
        }
    };
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const handleLogout = async () => {
        try {
            await axios.get('/logout');
            sessionStorage.removeItem('sessionID');
            setSessionID('');
            setUserName('');
            navigate('/');
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
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

    return (
        <LoginContainer
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
        >
            <form onSubmit={handleSubmit}>
                <label>
                    아이디:
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">로그인</button>
            </form>

            {sessionID && (
                <>
                    <p>안녕하세요, {userName}님</p> 
                    <button onClick={handleLogout}>로그아웃</button>
                </>
            )}
            {sessionExpiration && (
                <SessionExpirationInfo>
                    세션 만료 시간: {sessionExpiration.toLocaleTimeString()}까지
                </SessionExpirationInfo>
            )}

            <SearchContainer>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>지역 검색</button>
                <button onClick={handleGetUserLocation}>내 위치 가져오기</button>
                {searchResult && (
                    <p>검색된 주소: {searchResult}</p>
                )}
                {userLocation && (
                    <p>사용자 위치: {userAddress}</p>
                )}
            </SearchContainer>
        </LoginContainer>
    );
}
