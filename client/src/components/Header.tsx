import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { keyword, neighborhood_search, register_showing } from "../atom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion"
import MyLocationBox from "./MylocationBox";
import { useState } from "react"; // useState 추가



const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: black;
    height: 100px;
    width: 100%;
    @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
        height: 250px;
}
`

const Logo = styled(motion.div)`
    text-decoration: none;
    color: white;
    margin-left: 30px;
    margin-top:33px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 40px;
    font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
`

// const SearchContainer = styled.div`
//     position: relative;
//     background-color: whitesmoke;
//     width: 400px;
//     height: 50px;
//     margin: 25px;
//     border-radius: 10px;
// `

const Search = styled.form`
    position: relative;
    background-color: whitesmoke;
    width: 400px;
    height: 50px;
    margin: 25px;
    border-radius: 10px;
`

const SearchInput = styled.input`
    position: absolute;
    left: 35px;
    top: 10px;
    width: 300px;
    height: 30px;
    font-size: 20px;
    border-radius: 10px;
    border-width: 0;
    background-color: whitesmoke;
    border-width: 0px;
    outline: none;
`

const SearchBtn = styled.button`
    position: absolute;
    background-color: transparent;
    border-width: 0px;
    top: 15px;
    right: 10px;
    width: 50px;
`

const DeleteBtn = styled(motion.button)`
    position: absolute;
    top: 13px;
    left: 5px;
    margin-right: 100yypx;
    background-color: transparent;
    border-radius: 5px;
    background-color: #d8d8d8;
    border-width: 0px;
    hover: {scale: 1.2}
`

const LoginContainer = styled.div`
    margin: 20px;
`

const Login = styled(motion.div)`
    color: white;
    margin: 10px;
    cursor: pointer;
`

interface DataForm {
    search: string
}
interface MyLocationBoxProps {
    userId: string; // id 변수의 타입을 명시적으로 지정
}

export default function Header() {
    const { register, handleSubmit, getValues, watch } = useForm<DataForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const [isNeighborhood, setIsNeighborhood] = useRecoilState(neighborhood_search);
    const [userId, setUserId] = useState<string>(''); // userId 상태 추가
    const onValid = ({ search }: DataForm) => {
        setSearchWord(search);
        // console.log("header:", search)
        navigate(`/search?keyword=${search}`);
    }
    const searchTypeClick = async () => {
        setIsNeighborhood((cur) => !cur)
    }
    const setRegisterShowing = useSetRecoilState(register_showing);
    const onRegisterClick = () => {
        setRegisterShowing((cur) => !cur);
    }
    return (
        <>
            <Nav>
            <Logo
                transition={{ type: "spring", damping: 10 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => navigate("/")}>
                    동네맛집
                </Logo>
                <Search onSubmit={handleSubmit(onValid)}>
                    {watch('search') ? <DeleteBtn className="btn-close" aria-label="Close" type="reset" /> : null}
                    <SearchInput {...register("search", { required: true })} />
                    <SearchBtn type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg></SearchBtn>
                </Search>
                <LoginContainer>
                    <Login onClick={() => { navigate('/register') }}>회원가입</Login>
                    <Login onClick={() => { navigate('/login') }}>로그인</Login>
                </LoginContainer>
                <MyLocationBox userId={userId} /> {/* MyLocationBox 컴포넌트 추가 */}
            </Nav>
        </>
    )
}