import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { session } from "../../atom";
import axios from "axios";

const Title = styled.div`
    font-size: 30px;
    margin: 20px;
`

const Form = styled.form`
    width: 70%;
    border-radius: 10px;
`

const Container = styled.div`
    text-align: right;
    margin-right: 20%;
`

const InputBox = styled.div`
    margin: 20px;
    @media screen and (max-width: 1400px){
        display: flex;
        flex-direction: column;
    }
`

const Label = styled.label`
    margin-left: 10px;
    text-align: left;
`

const Input = styled.input`
    margin: 10px;
    border-radius: 5px;
    background-color: #c7c7c7;
    outline: none;
    border: none;
    padding: 5px;
    width: 300px;
    @media screen and (max-width:1200px) {
        width: 100%;
    }
`

const Button = styled.button`
    margin: 10px;
    margin-left: 30px;
`

interface updateForm {
    nickName: string;
    id: string
    password: string;
}

export default function InfoUpdate() {
    const { register, handleSubmit } = useForm<updateForm>();
    const sessionID = useRecoilValue(session);
    const onValid = async ({ nickName, id, password }: updateForm) => {
        console.log(nickName, id, password);
        await axios.put(`/infoUpdate/${sessionID}`, {
            nickName,
            id,
            password
        })
    }
    return (
        <>
            <Title>정보 수정</Title>
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
            </Form>
        </>
    )
}