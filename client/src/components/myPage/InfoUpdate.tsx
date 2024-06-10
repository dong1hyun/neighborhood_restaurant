import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { session } from "../../atom";
import axios from "axios";
import { FaPhoneAlt, FaUserFriends } from "react-icons/fa";
import { FaLock, FaUser } from "react-icons/fa6";

const Container = styled.div`
    top: 300px;
    margin-bottom: 50px;
    text-align: center;
    width: 50%;
    padding: 20px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 700px) {
        width: 90%;
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

interface updateForm {
    nickName: string;
    phone: string;
}

export default function InfoUpdate() {
    const { register, handleSubmit } = useForm<updateForm>();
    const sessionID = useRecoilValue(session);
    const onValid = async ({ nickName, phone }: updateForm) => {
        await axios.put(`/infoUpdate/${sessionID}`, {
            nickName,
            phone
        })
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
    }
    return (
        <>
            {/* <Title>정보 수정</Title>
            <Form onSubmit={handleSubmit(onValid)} >
                <Container>
                    <InputBox>
                        <Label htmlFor="nickName">닉네임</Label>
                        <Input
                            {...register("nickName")}
                        />
                    </InputBox>
                    <InputBox>
                        <Label htmlFor="id">아이디</Label>
                        <Input
                            {...register("id")}
                        />
                    </InputBox>
                    <InputBox>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            {...register("password")}
                        />
                    </InputBox>
                </Container>
                <Button type="submit">수정</Button>
            </Form> */}
            <Container>
                <Form onSubmit={handleSubmit(onValid)}>
                    <InputWrapper>
                        <Icon>
                            <FaUserFriends />
                        </Icon>
                        <Input {...register("nickName")} placeholder="닉네임" />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon>
                            <FaPhoneAlt />
                        </Icon>
                        <Input {...register("phone")} placeholder="전화번호" />
                    </InputWrapper>
                    <Button type="submit">수정 완료</Button>
                </Form>
            </Container>
        </>
    )
}