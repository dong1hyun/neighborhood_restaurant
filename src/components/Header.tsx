import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { keyword } from "../atom";
import { loginWithKakao } from "../KakaoLogin";
import SocialKakao from "./Test";

const Logo = styled(Link)`
    text-decoration: none;
    color: black;
`

const Nav = styled.header`
    display: flex;
    justify-content: space-between;
`

interface DataForm {
    search: string
}

function Header() {
    const { register, handleSubmit } = useForm<DataForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const onValid = ({ search }: DataForm) => {
        setSearchWord(search);
        // console.log("header:", search)
        navigate(`/search?keyword=${search}`);
    }
    return (
        <div>
            <Nav>
                <Logo to={'/'}>Logo</Logo>
                <form onSubmit={handleSubmit(onValid)}>
                    <button type="reset">지우기</button>
                    <input {...register("search", { required: true })} />
                    <button type="submit">검색</button>
                </form>
                {/* <span>
                    <a id="kakao-login-btn" onClick={loginWithKakao}>
                        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
                            alt="카카오 로그인 버튼" />
                    </a>
                    <p id="token-result"></p>
                </span> */}
                <SocialKakao />   
            </Nav>
            <hr />
        </div>
    )
}

export default Header;