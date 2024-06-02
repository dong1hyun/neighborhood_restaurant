import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { FaUser, FaLock, FaUserFriends  } from "react-icons/fa";

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
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const HelpText = styled.p`
    margin-top: 10px;
    font-size: 12px;
    color: #666;
`;

const Link = styled.a`
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

interface loginForm {
    id: string,
    password: string,
    nickName: string,
    // location: {
    //     x: Number,
    //     y: Number
    // }
}

export default function SignIn() {
    const { register, handleSubmit, getValues, watch } = useForm<loginForm>()
    const onValid = (data: loginForm) => {
        axios.post("/register", data)
            .then((data) => {
                alert("회원가입에 성공했습니다!!!")
            })
            .catch((err) => {
                console.log(err);
                if (err.request.status == 400) alert("이미 존재하는 아이디입니다.");
            })
    }
    return (
        <>
            <Container>
                <Title>회원가입</Title>
                <Form onSubmit={handleSubmit(onValid)}>    
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
                        <Input {...register("password")} placeholder="비밀번호" />
                    </InputWrapper>
                    <InputWrapper>
                        <Icon>
                            <FaUserFriends />
                        </Icon>
                        <Input {...register("nickName")} placeholder="닉네임" />
                    </InputWrapper>
                    <Button type="submit">회원가입</Button>
                </Form>
            </Container>
        </>
    )
}