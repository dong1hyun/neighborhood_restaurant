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
`

const Logo = styled(motion.div)`
    text-decoration: none;
    color: black;
    margin-left: 30px;
    margin-top:20px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 40px;
    font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
`

const Search = styled.form`
font-size: 16px;
width: 325px;
padding: 10px;
border: 0px;
outline: none;
float: left;
`

const SearchBtn = styled.button`
    width: 50px;
height: 100%;
border: 0px;
background-color: #1b5ac2;
outline: none;
float: right;
color: #ffffff
`

interface DataForm {
    search: string
}

function Header() {
    const { register, handleSubmit } = useForm<DataForm>();
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
                <Logo whileHover={{ scale: 1.2 }} onClick={() => navigate("/")}>동네맛집</Logo>
                <Search onSubmit={handleSubmit(onValid)}>
                    <button type="reset">x</button>
                    <input {...register("search", { required: true })} />
                    <button type="submit">검색</button>
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
            <hr />
        </div>
    )
}

export default Header;