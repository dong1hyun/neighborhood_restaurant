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
    const [userId, setUserId] = useState<string>('');
    const [isLocationSaved, setIsLocationSaved] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId && isLocationSaved) {
            // 위치가 저장되었으면 홈 화면으로 이동
            navigate('/');
        }
    }, [userId, isLocationSaved, navigate]); 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log('로그인 응답 데이터:', response.data); // 로그인 응답 데이터 확인
            const { user } = response.data; // 사용자 정보 객체
            if (response.data.message === '로그인 성공' && user && user.id) {
                // 로그인 성공 시 사용자 id 저장
                setUserId(user.id);
                console.log("사용자 ID:", user.id); // 사용자 ID 콘솔에 출력
                // 위치 저장 요청 보내기
                saveLocation(user.id); // 사용자 ID를 saveLocation 함수에 전달
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

    const saveLocation = async (id: string) => { // 사용자 ID를 매개변수로 추가
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await axios.post('/location', { id, x: longitude, y: latitude });
                console.log('사용자 ID:', id); // 사용자 ID 콘솔에 출력
                console.log('위치 좌표:', longitude, latitude); // 위치 좌표 콘솔에 출력
                setIsLocationSaved(true); // 위치 저장됨을 표시
                alert('위치가 성공적으로 저장되었습니다.');
            });
        } catch (error) {
            console.error('위치 저장 중 오류가 발생했습니다:', error);
            alert('위치를 저장하는 도중 오류가 발생했습니다.');
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
        </LoginContainer>
    );
}