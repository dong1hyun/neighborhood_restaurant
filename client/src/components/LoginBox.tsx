import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
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
    //formData는 현재의 입력 폼 데이터를 저장하는 변수이고, setFormData는 이 데이터를 업데이트하는 함수, useState초기값 + 타입
    const [formData, setFormData] = useState<FormData>({ id: '', password: '' });

    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // 폼이 제출 될 때마다, 새로고침되는 기본적인 이벤트를 취소하는 코드
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log(response.data);
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
        }
    };

    // (e: ChangeEvent<HTMLInputElement>) 여기서 input에 발생한 이벤트 값을 'e'객체에 넣어줌.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // ...formData는 기존의 객체 복사 및 업데이트하여 새로운 객체 생성. e.target.name -> input 'name' 속성. 그리고 해당 name의 입력 된 값 -> e.target.value
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // JSX를 반환합니다.
    // onSubmit은 폼이 제출될 때, 호출되는 함수를 지정
    // onChange는 입력값이 변경 될 때마다, 호출되는 함수 지정
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
