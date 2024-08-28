import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { keyword, loginState, signinState, session, name } from "../atom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { MdOutlineFoodBank } from "react-icons/md";
import { SlMagnifier } from "react-icons/sl";
import { PiLineVertical } from "react-icons/pi";

const Logo = styled(motion.div)`
    text-decoration: none;
    min-width: 180px;
    color: rgba(245, 59, 87, 1.0);
    margin-left: 30px;
    padding-top: 28px;
    padding-bottom: 10px;
    cursor: pointer;
    font-size: 40px;
    font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
`;

const StyledFoodBankIcon = styled(MdOutlineFoodBank)`
    margin-bottom: 5px;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 70px;
    @media screen and (max-width: 700px) {
        flex-direction: column;
        gap: 0px;
    }
`;

const Info = styled.div`
    text-align: center;
    color: white;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
    padding-top: 20px;
    padding-bottom: 20px;
    cursor: pointer;
`;

const Search = styled.form`
    position: relative;
    background-color: transparent;
    height: 50px;
    margin-top: 25px;
    margin-left: 30px;
    border-radius: 10px;
    @media screen and (max-width: 700px) {
        width: 300px;
        margin-left: 0;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    min-width: 220px;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
    border-width: 0;
    background-color: #eeeeee;
    outline: none;
    padding-left: 40px; /* 아이콘과 겹치지 않도록 패딩 추가 */
    padding-right: 40px; /* 아이콘과 겹치지 않도록 패딩 추가 */
    @media screen and (max-width: 700px) {
        font-size: 12px;
        padding-left: 40px; /* 작은 화면에서 패딩 조정 */
    }
`;

const SearchBtn = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: transparent;
    border: none;
`;

const DeleteBtn = styled(motion.button)`
    position: absolute;
    left: 10px;
    top: 10px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d8d8d8;
    border-radius: 5px;
    &:hover {
        scale: 1.2;
    }
`;

const LoginContainer = styled.div`
    margin: 20px;
    align-items: center;
`;

const LoginBox = styled(motion.button)`
    color: white;
    background-color: transparent;
    border: none;
    min-width: 100px;
`;

interface searchForm {
    search: string;
}

export default function Header() {
    const { register, handleSubmit, watch } = useForm<searchForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const [sessionID, setSessionID] = useRecoilState(session);
    const [nickName, setNickName] = useRecoilState(name);
    const [sessionExpiration, setSessionExpiration] = useState<Date | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const onValid = ({ search }: searchForm) => {
        setSearchWord(search);
        navigate(`/search?keyword=${search}`);
    };

    const handleLogout = async () => {
        try {
            await axios.get('/logout');
            sessionStorage.removeItem('sessionID');
            setSessionID('');
            setNickName('');
            navigate('/');
        } catch (error) {
            console.error('로그아웃 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        const loggedInSessionID = sessionStorage.getItem('sessionID');
        const loggedInNickName = sessionStorage.getItem('nickName');

        if (loggedInSessionID) {
            setSessionID(loggedInSessionID);
        }
        if (loggedInNickName) {
            setNickName(loggedInNickName);
        }

        if (loggedInSessionID) {
            const expiration = new Date();
            expiration.setMinutes(expiration.getMinutes() + 10);
            setSessionExpiration(expiration);

            const timer = setTimeout(() => {
                handleLogout();
            }, 600000);

            return () => clearTimeout(timer);
        }
    }, [sessionID]);

    useEffect(() => {
        if (sessionExpiration) {
            const timer = setTimeout(() => {
                handleLogout();
            }, sessionExpiration.getTime() - Date.now());

            return () => clearTimeout(timer);
        }
    }, [sessionExpiration]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar expand="xl" className="bg-dark shadow-lg fixed-top mb-50">
                <Container fluid>
                    <Navbar.Toggle className="bg-white" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex w-100 justify-content-between align-items-center">
                            <Logo
                                transition={{ type: "spring", damping: 10 }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => navigate("/")}
                            >
                                <StyledFoodBankIcon />동네맛집
                            </Logo>
                            <Search onSubmit={handleSubmit(onValid)}>
                                {watch('search') ? <DeleteBtn className="btn-close" aria-label="Close" type="reset" /> : null}
                                <SearchInput placeholder="식당, 지역 입력" {...register("search", { required: true })} />
                                <SearchBtn type="submit">
                                    <SlMagnifier />
                                </SearchBtn>
                            </Search>
                            <InfoContainer>
                                <Info onClick={() => window.location.href = "https://kind-form-f61.notion.site/e61496672ccd4eb496119e05b0c0ddf7?pvs=74"}>동네맛집 소개</Info>
                                <Info onClick={() => navigate("/noticeList")}>공지사항</Info>
                                <Info onClick={() => navigate("/phone")}>연락처</Info>
                                <Info onClick={() => navigate("/QnA_List")}>자주 묻는 질문</Info>
                            </InfoContainer>
                            <LoginContainer>
                                {sessionID ? (
                                    <>
                                        <LoginBox onClick={() => navigate(`/myPage/${sessionID}`)}>{nickName}님</LoginBox>
                                        <LoginBox onClick={handleLogout}>로그아웃</LoginBox>
                                    </>
                                ) : (
                                    <>
                                        <LoginBox onClick={() => navigate("/logIn")}>로그인</LoginBox>
                                        <LoginBox onClick={() => navigate("/signIn")}>회원가입</LoginBox>
                                    </>
                                )}
                            </LoginContainer>
                            {/* {sessionExpiration && (
                                <div className="text-white">
                                    남은 시간: {Math.max(0, Math.floor((sessionExpiration.getTime() - currentTime.getTime()) / 1000))}초
                                </div>
                            )} 세션 만료 시간*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}