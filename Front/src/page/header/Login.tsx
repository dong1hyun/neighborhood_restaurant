import React, { useEffect } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    z-index: 5;
    top: 300px;
    text-align: center;
    width: 400px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    margin: auto;
    margin-top: 200px;
    @media screen and (max-width: 700px) {
        width: 80%;
    }
`;

const Title = styled.h2`
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 15px;
`;

const Icon = styled.div`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
`;

const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px 0 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 10px;
    background-color: #3e3e3e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #6a6a6a;
    }
`;

const HelpText = styled.p`
    margin-top: 10px;
    font-size: 12px;
    color: #666;
    line-height: 130%;
    color: #007bff;
    a {
        color: #007bff;
    }
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: underline;
    }
`;

interface LoginForm {
    id: string,
    password: string,
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const navigate = useNavigate()
    const LoginSuccess = async (data: LoginForm) => {
        try {
            const response = await axios.post('/login', data);
            const { sessionID, nickName } = response.data;
            if (response.data.message === '로그인 성공' && sessionID) {
                sessionStorage.setItem('sessionID', sessionID);
                sessionStorage.setItem('nickName', nickName);
                alert("로그인에 성공했습니다.");
                navigate("/");
            } else {
                console.error('로그인 실패:', response.data.message);
            }
        } catch (error) {
            console.error('로그인 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        const session = sessionStorage.getItem('sessionID');
        if(session) navigate("/");
    }, [])

    return (
        <Container>
            <Title>로그인</Title>
            <Form onSubmit={handleSubmit(LoginSuccess)}>
                <InputWrapper>
                    <Icon>
                        <FaUser />
                    </Icon>
                    <Input {...register("id")} placeholder="아이디" />
                </InputWrapper>
                <InputWrapper>
                    <Icon>
                        <FaLock />
                    </Icon>
                    <Input type="password" {...register("password")} placeholder="비밀번호" />
                </InputWrapper>
                <Button type="submit">로그인</Button>
            </Form>
            <HelpText>
                <StyledLink to="/FindId">아이디</StyledLink> /  <StyledLink to='/FindPassword'>비밀번호</StyledLink> 찾기
                <br />
                <StyledLink to="/SignIn">회원 가입</StyledLink>
            </HelpText>
        </Container>
    );
}
