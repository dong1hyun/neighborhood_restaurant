import { motion } from "framer-motion";
import { Img } from "../../styled-components/homeStyle";
import styled, { keyframes } from "styled-components";
import { HiArrowDownRight } from "react-icons/hi2";

const Container = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(${process.env.PUBLIC_URL}/home/macarong.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 40px;
    /* @media screen and (max-width: 600px) {
        flex-direction: column;
    } */
`;

const ImgContainer = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    @media screen and (max-width: 800px) {
        flex-direction: column;
    }
`

const Map = styled.img`
    position: relative;
    width: 600px;
    border-radius: 20px;
    @media screen and (max-width: 800px) {
        width: 90%;
    }
`;

const Auth = styled.img`
    position: relative;
    width: 300px;
    border-radius: 20px;
    @media screen and (max-width: 800px) {
        width: 60%;
    }
`;

const Card = styled.div`
    text-align: center;
    color: black;
    font-size: 40px;
    font-weight: 800;
    line-height: 150%;
    width: 80%;
`
const blink = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const Arrow = styled(HiArrowDownRight)`
    position: absolute;
    animation: ${blink} 2s infinite;
    right: 150px;
    bottom: 80px;
    height: 100px;
    width: 100px;
    @media screen and (max-width: 700px){
        height: 60px;
        width: 60px;
        right: 80px;
        bottom: 50px;
    }
`

export default function Third() {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ImgContainer>
                <Map src={`${process.env.PUBLIC_URL}/home/map.png`} />
                <Auth src={`${process.env.PUBLIC_URL}/home/auth.png`} />
            </ImgContainer>
            <Card>
                간편하게 동네인증을 해주세요!
            </Card>
            <Arrow />
        </Container>
    );
}
