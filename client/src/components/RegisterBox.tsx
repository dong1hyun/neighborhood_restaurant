import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"
import axios from 'axios'; // axios import 추가

const RegisterContainer = styled(motion.div)`
    position: absolute;
    z-index: 1;
    top: 300px;
    text-align: center;
    background-color: whitesmoke;
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 200px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`

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
}

export default function RegisterBox() {
    //formData는 현재의 입력 폼 데이터를 저장하는 변수이고, setFormData는 이 데이터를 업데이트하는 함수, useState초기값 + 타입
    const [formData, setFormData] = useState({ name: '', id: '', password: '' });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 기본 제출 동작 방지, 폼이 제출 될 때마다, 새로고침되는 기본적인 이벤트를 취소하는 코드

        try {
            const response = await axios.post('/register', {
                name: formData.name,
                id: formData.id,
                password: formData.password
            });
            console.log('Response:', response.data);
            // 회원가입 성공 처리 코드 추가
        } catch (error) {
            console.error('회원가입 중 오류가 발생했습니다:', error);
            // 회원가입 실패 처리 코드 추가
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
        <RegisterContainer
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
        >
            <form onSubmit={handleSubmit}>
                <label>
                    이름:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <br />
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
                <button type="submit">회원가입</button>
            </form>
        </RegisterContainer>
    );
}