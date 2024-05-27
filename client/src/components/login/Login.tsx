import Overlay from "../Overlay";
import React, { FormEvent, useEffect, useState } from 'react';
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, name, session } from "../../atom";

const LoginContainer = styled(motion.div)`
    position: absolute;
    z-index: 5;
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
    @media screen and (max-width: 700px) {
        width: 250px;
    }
`

const LoginList = styled.li`
    margin: 5px;
`

const LoginInput = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border-width: 1px;
`

const LoginBtn = styled.button`
    margin: 0 auto;
    margin-top: 15px;
    width: 100px;
    height: 30px;
    border-width: 0px;
    text-align: center;
    border-radius: 5px;
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

interface LoginForm {
    id: string,
    password: string,
    // nickName: string,
    // location: {
    //     x: Number,
    //     y: Number
    // }
}

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [sessionID, setSessionID] = useRecoilState(session);
    const [nickName, setNickName] = useRecoilState(name);
    const [isLocationSaved, setIsLocationSaved] = useState<boolean>(false);
    const setLogin = useSetRecoilState(loginState);

    const LoginSuccess = async (data: LoginForm) => {
        try {
            const response = await axios.post('/login', data);
            // console.log('로그인 응답 데이터:', response.data); // 로그인 응답 데이터 확인
            const { sessionID, nickName } = response.data; // 세션 ID 및 사용자 이름 받아오기
            if (response.data.message === '로그인 성공' && sessionID) {
                setSessionID(sessionID); // 세션 ID 설정
                setNickName(nickName); // 사용자 아이디 설정
                sessionStorage.setItem('sessionID', sessionID); // 세션 스토리지에 세션 ID 저장
                sessionStorage.setItem('nickName', nickName); // 세션 스토리지에 사용자 아이디 저장
                // 위치 저장 요청 보내기
                // saveLocation(sessionID); // 세션 ID를 인자로 사용하여 위치 저장 요청 보내기
                alert("로그인에 성공했습니다.");
                setLogin(false);
            } else {
                console.error('로그인 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
            <LoginContainer
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
            >
                <form onSubmit={handleSubmit(LoginSuccess)}>
                    <div>
                        로그인
                    </div>
                    <ul>
                        <LoginList><LoginInput {...register("id")} placeholder="아이디를 입력하세요" /></LoginList>
                        <LoginList><LoginInput {...register("password")} placeholder="비밀번호를 입력하세요" /></LoginList>
                        <LoginBtn type="submit">로그인</LoginBtn>
                    </ul>
                </form>
            </LoginContainer>
            <Overlay />
        </div>
    )
}