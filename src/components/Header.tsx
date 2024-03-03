import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { keyword, neighborhood_search } from "../atom";
import { kakaoLogout, loginWithKakao } from "../KakaoLogin2";
import SocialKakao from "./KakaoLogin";



const Nav = styled.header`
    display: flex;
    justify-content: space-between;
`

const Logo = styled(Link)`
    text-decoration: none;
    color: black;
    margin: 15px;
`

const Search = styled.form`
    margin: 15px;
    margin-bottom: 5px;
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
   
    const searchTypeClick = () => {
        setIsNeighborhood((cur) => !cur)
        // User.create({
        //     id:"test id",
        //     nickName:"test nickName",
        //     review: "test review"
        // })
    }
    return (
        <div>
            <Nav>
                <Logo to={'/'}>동네맛집</Logo>
                <Search onSubmit={handleSubmit(onValid)}>
                    <button type="reset">지우기</button>
                    <input {...register("search", { required: true })} />
                    <button type="submit">검색</button>
                </Search>
                <button onClick={searchTypeClick}>{isNeighborhood ? "동네맛집" : "전국맛집"}</button>
                {/* <span>
                    <a id="kakao-login-btn" onClick={loginWithKakao}>
                        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
                            alt="카카오 로그인 버튼" />
                    </a>
                    <p id="token-result"></p>
                    <button id="api-btn" onClick={kakaoLogout}>로그아웃</button>
                </span> */}
                <SocialKakao />   
            </Nav>
            <hr />
        </div>
    )
}

export default Header;