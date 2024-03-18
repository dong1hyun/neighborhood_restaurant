import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { keyword, neighborhood_search } from "../atom";
import { kakaoLogout, loginWithKakao } from "../function/KakaoLogin2";
import SocialKakao from "./KakaoLogin";
import axios from "axios";
import { motion } from "framer-motion"


const Nav = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: black;
    height: 100px;
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
    left: 30px;
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
    top: 15px;
    right: 10px;
    width: 50px;
`

const DeleteBtn = styled(motion.button)`
    position: absolute;
    top: 18px;
    left: 5px;
    background-color: transparent;
    border-radius: 5px;
    background-color: #d8d8d8;
    border-width: 0px;
    hover: {scale: 1.2}
`

interface DataForm {
    search: string
}

export default function Header() {
    const { register, handleSubmit, getValues, watch } = useForm<DataForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const [isNeighborhood, setIsNeighborhood] = useRecoilState(neighborhood_search);
    const onValid = ({ search }: DataForm) => {
        setSearchWord(search);
        // console.log("header:", search)
        navigate(`/search?keyword=${search}`);
    }
    const searchTypeClick = async () => {
        setIsNeighborhood((cur) => !cur)
    }

    return (
        <div>
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
                    {watch('search') ? <DeleteBtn whileHover={{ scale: 1.2 }} type="reset">x</DeleteBtn> : null}
                    <SearchInput {...register("search", { required: true })} />
                    <SearchBtn type="submit">검색</SearchBtn>
                </Search>
                {/* <button onClick={searchTypeClick}>{isNeighborhood ? "동네맛집" : "전국맛집"}</button> */}
                {/* <span>
                    <a id="kakao-login-btn" onClick={loginWithKakao}>
                        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
                            alt="카카오 로그인 버튼" />
                    </a>
                    <p id="token-result"></p>
                    <button id="api-btn" onClick={kakaoLogout}>로그아웃</button>
                </span> */}
                {/* <SocialKakao /> */}
                <div>로그인</div>
            </Nav>
        </div>
    )
}