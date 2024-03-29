import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import styled from "styled-components";
import MylocationBox from './MylocationBox'; // 수정된 파일 이름으로 import

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
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log(response.data);
            const { user } = response.data; // 사용자 정보 객체
            if (response.data.message === '로그인 성공' && user && user.id) {
                // 로그인 성공 시 홈 화면으로 이동
                navigate('/');
                setUserId(user.id); // 사용자의 id 저장
                console.log("사용자 ID:", user.id); // 사용자 ID 콘솔에 출력
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
            {userId && <MylocationBox userId={userId} />} {/* 로그인 성공 후 MyLocationBox 렌더링 */}
        </LoginContainer>
    );
}

