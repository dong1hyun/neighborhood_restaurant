import Overlay from "../Overlay";
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil";
import styled from "styled-components"
import { signinState } from "../../atom";

const RegisterContainer = styled(motion.div)`
    position: absolute;
    z-index: 5;
    top: 300px;
    text-align: center;
    background-color: whitesmoke;
    width: 400px;
    height: 250px;
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

const RegisterList = styled.li`
    margin: 5px;
`

const RegisterInput = styled.input`
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border-width: 1px;
`

const RegisterBtn = styled.button`
    margin: 0 auto;
    margin-top: 15px;
    width: 100px;
    height: 30px;
    border-width: 0px;
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
    // location: {
    //     x: Number,
    //     y: Number
    // }
}

export default function Register() {
    const { register, handleSubmit, getValues, watch } = useForm<loginForm>()
    const setSignin = useSetRecoilState(signinState);
    const onValid = (data: loginForm) => {
        axios.post("/register", data)
        .then((data) => {
            setSignin(false);
            alert("회원가입에 성공했습니다!!!")
        })
        .catch((err) => {
            console.log(err);
            if(err.request.status == 400) alert("이미 존재하는 아이디입니다.");
        })
    }
    return (
        <>
            <RegisterContainer className="card"
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
            >
                <form onSubmit={handleSubmit(onValid)}>
                    <ul className="list-group list-group-flush">
                        <div className="card-header">회원가입</div>
                        <RegisterList className="list-group-item"><RegisterInput {...register("id")} placeholder="아이디를 입력해주세요" /></RegisterList>
                        <RegisterList className="list-group-item"><RegisterInput {...register("password")} placeholder="비밀번호를 입력해주세요" /></RegisterList>
                        <RegisterList className="list-group-item"><RegisterInput {...register("nickName")} placeholder="닉네임을 입력해주세요" /></RegisterList>
                        <RegisterBtn type="submit">확인</RegisterBtn>
                    </ul>
                </form>
            </RegisterContainer>
            <Overlay />
        </>
    )
}