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

interface updateForm {
    nickName: string;
    id: string
    password: string;
}

export default function InfoUpdate() {
    const { register, handleSubmit } = useForm<updateForm>();
    const sessionID = useRecoilValue(session);
    const onValid = async ({nickName, id, password}: updateForm) => {
        console.log(nickName,id, password);
        await axios.put(`/infoUpdate/${sessionID}`, {
            nickName,
            id,
            password
        })
    }
 

    // const handleSubmitnickName = async (event: any) => {
    //     event.preventDefault();
    //     try {
    //         // Make a request to update the nickname
    //         const response = await axios.put(`/updateNickname/${sessionID}`, { nickname: newnickName });
    //         if (response.data.success) {
    //             // Update the nickname in the state
    //             setNickName(newnickName);
    //             // Clear the input field
    //             setnewnickName('');
    //             console.log('Nickname updated successfully!');
    //         } else {
    //             console.error('Failed to update nickname.');
    //         }
    //     } catch (error) {
    //         console.error('Error updating nickname:', error);
    //     }
    // };
    return (
        <>
            <Title>나의 정보 변경</Title>
            <form onSubmit={handleSubmit(onValid)} >
                <div>
                    <label htmlFor="nickName">닉네임 변경:</label>
                    <input
                        {...register("nickName")}
                        placeholder="새로운 닉네임 입력"
                    />
                </div>
                <div>
                    <label htmlFor="id">아이디 변경:</label>
                    <input
                        {...register("id")}
                        placeholder="새로운 아이디 입력"
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호 변경:</label>
                    <input
                        {...register("password")}
                        placeholder="새로운 비밀번호 입력"
                    />
                </div>
                <button type="submit">수정 완료</button>
            </form >
        </>
    )
}