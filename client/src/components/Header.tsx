//각 페이지의 헤더를 리턴하는 컴포넌트
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { keyword, neighborhood_search, loginState, signinState, session, name } from "../atom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Logo = styled(motion.div)`
    text-decoration: none;
    color: rgba(75, 207, 250,1.0);
    margin-left: 30px;
    margin-top:33px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 40px;
    font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
`

const Search = styled.form`
    position: relative;
    background-color: transparent;
    width: 400px;
    height: 50px;
    margin-top: 25px;
    border-radius: 10px;
    @media screen and (max-width: 700px) {
        width: 300px;
        margin-left: 0;
    }
`

const SearchInput = styled.input`
    position: absolute;
    left: 35px;
    top: 5px;
    width: 350px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
    border-width: 0;
    background-color: #eeeeee;
    border-width: 0px;
    outline: none;
    align-items: center;
    @media screen and (max-width: 700px) {
        width: 200px;
        font-size: 12px;
    }
`

const SearchBtn = styled.button`
    position: absolute;
    background-color: transparent;
    border-width: 0px;
    top: 15px;
    right: 10px;
    width: 50px;
    @media screen and (max-width: 700px) {
        right: 60px;
    }
`

const DeleteBtn = styled(motion.button)`
    position: absolute;
    top: 13px;
    left: 5px;
    margin-right: 100px;
    background-color: transparent;
    border-radius: 5px;
    background-color: #d8d8d8;
    border-width: 0px;
    hover: {scale: 1.2}
`

const LoginContainer = styled.div`
    margin: 20px;
    align-items: center;
`

const LoginBox = styled(motion.button)`
    color: black;
    margin: 10px;
    margin-top: 20px;
    background-color: transparent;
    border: none;
`

interface searchForm {
    search: string
}

export default function Header() {
    const { register, handleSubmit, getValues, watch } = useForm<searchForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const [signin, setSignin] = useRecoilState(signinState)
    const [login, setLogin] = useRecoilState(loginState);
    const [sessionID, setSessionID] = useRecoilState(session)
    const [userName, setUserName] = useRecoilState(name);
    const [sessionExpiration, setSessionExpiration] = useState<Date | null>(null);
    const onValid = ({ search }: searchForm) => {
        setSearchWord(search);
        navigate(`/search?keyword=${search}`);
    }

    const handleLogout = async () => {
        try {
            await axios.get('/logout'); // 서버로 로그아웃 요청 보냄
            sessionStorage.removeItem('sessionID'); // 세션 스토리지에서 세션 ID 제거
            setSessionID(''); // 세션 ID 초기화
            setUserName('');
            navigate('/'); // 홈 페이지로 이동
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID'); // 세션 스토리지에서 세션 아이디 가져오기

        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
    }, [])
    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID'); // 세션 스토리지에서 세션 아이디 가져오기
        const loggedInUserName = sessionStorage.getItem('userName'); // 세션 스토리지에서 이름 가져오기
        
        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
        if (loggedInUserName) {
            setUserName(loggedInUserName); // 세션 스토리지에서 가져온 사용자 이름 설정
        }

        // 세션 ID가 있는 경우에만 실행합니다.
        if (sessionID) {
            // 만료 시간을 현재 시간에서 1분 후로 설정합니다.
            const expiration = new Date();
            expiration.setMilliseconds(expiration.getMilliseconds() + 60000);
            setSessionExpiration(expiration);

            // 1분 후에 자동으로 로그아웃되도록 타이머를 설정합니다.
            const timer = setTimeout(() => {
                handleLogout();
            }, 600000);

            // 컴포넌트가 언마운트되거나 업데이트되기 전에 타이머를 정리합니다.
            return () => clearTimeout(timer);
        }
        // setSessionID("test");
    }, [sessionID]);
    return (
        <>
            {signin ? <Register /> : null}
            {login ? <Login /> : null}
            <Navbar expand="md" className="bg-light shadow mb-5">
                <Navbar.Toggle className="bg-white" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="" id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Logo
                            className=""
                            transition={{ type: "spring", damping: 10 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => navigate("/")}>
                            동네맛집
                        </Logo>
                    </Nav>
                    <Nav className="ml-auto">
                        <Search onSubmit={handleSubmit(onValid)}>
                            {watch('search') ? <DeleteBtn className="btn-close" aria-label="Close" type="reset" /> : null}
                            <SearchInput placeholder="식당이나 지역을 입력해보세요!" {...register("search", { required: true })} />
                            <SearchBtn type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg></SearchBtn>
                        </Search>
                        <LoginContainer>
                            {sessionID ? 
                            <><LoginBox onClick={() => navigate(`/myPage/${sessionID}`)}>{userName}님</LoginBox><LoginBox onClick={handleLogout}>로그아웃</LoginBox></>
                            : <><LoginBox onClick={() => { setLogin(cur => !cur) }}>로그인</LoginBox><LoginBox onClick={() => { setSignin(cur => !cur) }}>회원가입</LoginBox></>}
                        </LoginContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}