import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"
import styled from "styled-components"

const RegisterContainer = styled(motion.div)`
    position: absolute;
    z-index: 1;
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
`

const RegisterList = styled.li`
    margin: 5px;
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
    location: {
        x: Number,
        y: Number
    }
}
export default function RegisterBox() {
    const { register, handleSubmit, getValues, watch } = useForm<loginForm>()
    const onValid = (data: loginForm) => {
        axios.post("http://localhost:8080/register", data);
    }
    return (
        <RegisterContainer className="card"
        variants={boxVariants}
        initial="initial"
        animate="visible"
        exit="leaving" 
        >
        <form onSubmit={handleSubmit(onValid)}>
            <ul className="list-group list-group-flush">
                <div className="card-header">회원가입</div>
                <RegisterList className="list-group-item">아이디<input {...register("id")}/></RegisterList>
                <RegisterList className="list-group-item">비밀번호<input {...register("password")}/></RegisterList>
                <RegisterList className="list-group-item">닉네임<input {...register("nickName")}/></RegisterList>
                <RegisterBtn type="submit">확인</RegisterBtn>
            </ul>
        </form>
        </RegisterContainer>
    )
}