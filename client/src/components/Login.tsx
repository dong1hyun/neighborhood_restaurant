import Overlay from "./Overlay";
import React from 'react';
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import styled from "styled-components"

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

interface loginForm {
    id: string,
    password: string,
    nickName: string,
    location: {
        x: Number,
        y: Number
    }
}

export default function Login() {
    const { register, handleSubmit, getValues, watch } = useForm<loginForm>()
    const onValid = (data: loginForm) => {
        axios.post("http://localhost:8080/register", data);
    }
    return (
        <div>
            <LoginContainer className="card"
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
            >
                <form onSubmit={handleSubmit(onValid)}>
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