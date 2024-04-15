import Overlay from "./Overlay";
import React, { FormEvent, useEffect, useState } from 'react';
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, name, session } from "../atom";

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
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
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
    nickName: string,
    // location: {
    //     x: Number,
    //     y: Number
    // }
}

// interface FormData {
//     id: string;
//     password: string;
// }
export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [sessionExpiration, setSessionExpiration] = useState<Date | null>(null);
    const [sessionID, setSessionID] = useRecoilState(session);
    const [userName, setUserName] = useRecoilState(name);
    const [isLocationSaved, setIsLocationSaved] = useState<boolean>(false);
    const setLogin = useSetRecoilState(loginState);
    const navigate = useNavigate();
    const saveLocation = async (sessionID: string) => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await axios.post('/location', { sessionID, x: longitude, y: latitude }); // 세션 ID로 위치 저장 요청 보내기
                setIsLocationSaved(true); // 위치 저장됨을 표시
                // alert('위치가 성공적으로 저장되었습니다.');
            });
        } catch (error) {
            console.error('위치 저장 중 오류가 발생했습니다:', error);
            // alert('위치를 저장하는 도중 오류가 발생했습니다.');
        }
    };

    const LoginSuccess = async (data: LoginForm) => {
        try {
            const response = await axios.post('/login', data);
            // console.log('로그인 응답 데이터:', response.data); // 로그인 응답 데이터 확인
            const { sessionID, userName } = response.data; // 세션 ID 및 사용자 이름 받아오기
            if (response.data.message === '로그인 성공' && sessionID) {
                setSessionID(sessionID); // 세션 ID 설정
                setUserName(userName); // 사용자 이름 설정
                sessionStorage.setItem('sessionID', sessionID); // 세션 스토리지에 세션 ID 저장
                sessionStorage.setItem('userName', userName); // 세션 스토리지에 사용자 이름 저장
                // 위치 저장 요청 보내기
                saveLocation(sessionID); // 세션 ID를 인자로 사용하여 위치 저장 요청 보내기
                alert("로그인에 성공했습니다.");
                setLogin(false);
            } else {
                console.error('로그인 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
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

        // 세션 ID가 있는 경우에만 실행합니다.
        if (sessionID) {
            // 만료 시간을 현재 시간에서 1분 후로 설정합니다.
            const expiration = new Date();
            expiration.setMilliseconds(expiration.getMilliseconds() + 60000);
            setSessionExpiration(expiration);

            // 1분 후에 자동으로 로그아웃되도록 타이머를 설정합니다.
            const timer = setTimeout(() => {
                handleLogout();
            }, 600000);

            // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리합니다.
            return () => clearTimeout(timer);
        }
    }, [sessionID]);

    return (
        <div>
            <LoginContainer className="card"
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
            >
                <form onSubmit={handleSubmit(LoginSuccess)}>
                    <div className="card-header">
                        로그인
                    </div>
                    <ul className="list-group list-group-flush">
                        <LoginList className="list-group-item"><LoginInput {...register("id")} placeholder="아이디를 입력하세요" /></LoginList>
                        <LoginList className="list-group-item"><LoginInput {...register("password")} placeholder="비밀번호를 입력하세요" /></LoginList>
                        <LoginBtn type="submit">로그인</LoginBtn>
                    </ul>
                </form>
            </LoginContainer>
            <Overlay />
        </div>
    )
}