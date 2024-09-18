import styled from "styled-components";
import { Img } from "../../styled-components/homeStyle";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
`

const InfoContainer = styled.div`
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100vh;
`

const Info = styled.div`
    width: 80%;
    height: 150px;
    border-radius: 50px;
    color: white;
    font-size: 60px;
    font-weight: 700;
    line-height: 150%;
    @media screen and (max-width: 1100px) {
        font-size: 40px;
    }
    @media screen and (max-width: 700px) {
        font-size: 30px;
    }
`;

const Button = styled.button`
    background-color: #3e3e3e;
    color: white;
    width: 150px;
    height: 50px;
    border: none;
    border-radius: 10px;
    font-family: "Jua", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export default function Fourth() {
    const navigate = useNavigate();
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Img
                src={`${process.env.PUBLIC_URL}home/AI.jpg`}
            />
            <InfoContainer>
                <Info>
                    AI에게 우리동네 맛집을 추천받아보세요!
                </Info>
                <Button onClick={() => navigate("/logIn")}>맛집 추천받기</Button>
            </InfoContainer>
        </Container>
    )
}