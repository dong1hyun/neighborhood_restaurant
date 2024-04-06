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
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    text-align: center;
`;

// 이 코드는 세션 만료 시간을 표시합니다.
const SessionExpirationInfo = styled.div`
    margin-top: 10px;
    font-size: 14px;
`;

// 모션 변형
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
    const [isLocationSaved, setIsLocationSaved] = useState<boolean>(false);
    const navigate = useNavigate();
    const [sessionExpiration, setSessionExpiration] = useState<Date | null>(null);


    useEffect(() => {
        // 페이지 로드 시 저장된 로그인 정보 확인
        const loggedInSessionID = sessionStorage.getItem('sessionID'); // 세션 스토리지에서 세션 아이디 가져오기
        const loggedInUserName = sessionStorage.getItem('userName'); // 세션 스토리지에서 이름 가져오기
        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
        if (loggedInUserName) {
            setUserName(loggedInUserName); // 세션 스토리지에서 가져온 사용자 이름 설정
    }
    }, []);

// 세션 만료 시간 정하기. 테스트로 1분만 설정함.
    useEffect(() => {
        // 세션 ID가 있는 경우에만 실행합니다.
        if (sessionID) {
            // 만료 시간을 현재 시간에서 1분 후로 설정합니다.
            const expiration = new Date();
            expiration.setMilliseconds(expiration.getMilliseconds() + 60000);
            setSessionExpiration(expiration);

            // 1분 후에 자동으로 로그아웃되도록 타이머를 설정합니다.
            const timer = setTimeout(() => {
                handleLogout();
            }, 60000);

            // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리합니다.
            return () => clearTimeout(timer);
        }
    }, [sessionID]);

    


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log('로그인 응답 데이터:', response.data); // 로그인 응답 데이터 확인
            const { sessionID, userName } = response.data; // 세션 ID 및 사용자 이름 받아오기
            if (response.data.message === '로그인 성공' && sessionID) {
                setSessionID(sessionID); // 세션 ID 설정
                setUserName(userName); // 사용자 이름 설정
                sessionStorage.setItem('sessionID', sessionID); // 세션 스토리지에 세션 ID 저장
                sessionStorage.setItem('userName', userName); // 세션 스토리지에 사용자 이름 저장
                // 위치 저장 요청 보내기
                saveLocation(sessionID); // 세션 ID를 인자로 사용하여 위치 저장 요청 보내기
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

    const saveLocation = async (sessionID: string) => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await axios.post('/location', { sessionID, x: longitude, y: latitude }); // 세션 ID로 위치 저장 요청 보내기
                setIsLocationSaved(true); // 위치 저장됨을 표시
                alert('위치가 성공적으로 저장되었습니다.');
            });
        } catch (error) {
            console.error('위치 저장 중 오류가 발생했습니다:', error);
            alert('위치를 저장하는 도중 오류가 발생했습니다.');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.get('/logout'); // 서버로 로그아웃 요청 보냄
            sessionStorage.removeItem('sessionID'); // 세션 스토리지에서 세션 ID 제거
            setSessionID(''); // 세션 ID 초기화
            setUserName('');
            navigate('/'); // 홈 페이지로 이동
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
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
        </LoginContainer>
    );
    
}
