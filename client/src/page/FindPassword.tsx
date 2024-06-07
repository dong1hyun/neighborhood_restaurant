import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { name, session } from "../atom";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";

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
`;

const StyledLink = styled(Link)`
    &:hover {
        text-decoration: underline;
    }
    color: #007bff;
`;

interface FindForm {
    id: string,
    phone: string,
    newPassword: string
}

export default function FindPassword() {
    const { register, handleSubmit } = useForm<FindForm>();
    const onSubmit = async (data: FindForm) => {
        await axios.post("/login/FPassword", data)
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
    }
    return (
        <Container>
            <Title>비밀번호 찾기</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Icon>
                        <FaUser />
                    </Icon>
                    <Input {...register("id")} placeholder="아이디" />
                </InputWrapper>
                <InputWrapper>
                    <Icon>
                        <FaPhoneAlt />
                    </Icon>
                    <Input {...register("phone")} placeholder="전화번호" />
                </InputWrapper>
                <InputWrapper>
                    <Icon>
                        <FaLock />
                    </Icon>
                    <Input type="password" {...register("newPassword")} placeholder="새비밀번호" />
                </InputWrapper>
                <Button type="submit">확인</Button>
            </Form>
            <HelpText>
                <StyledLink to="/FindId">아이디 찾기</StyledLink>
            </HelpText>
        </Container>
    );
}
