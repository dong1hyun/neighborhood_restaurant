import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Img } from "../../styled-components/homeStyle";

const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
`

const PlaceReview = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const PlaceImg = styled(motion.img)`
    width: 180px;
    height: 180px;
    border-radius: 20px;
    @media screen and (max-width: 700px) {
        width: 120px;
        height: 100%;
        border-radius: 10px;
    }
`;

const ReviewImg = styled(motion.img)`
    width: 400px;
    height: 180px;
    border-radius: 20px;
    @media screen and (max-width: 700px) {
        width: 300px;
        height: 100%;
        border-radius: 10px;
    }
`;

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
    gap: 60px;
    @media screen and (max-width: 850px) {
        gap: 20px;
    }
    @media screen and (max-width: 700px) {
        gap: 0px;
    }
`

const FoodContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
    @media screen and (max-width: 850px) {
        gap: 20px;
        flex-direction: column;
    }
`

const Info = styled(motion.div)`
    color: black;
    font-size: 40px;
    font-weight: bolder;
    line-height: 150%;
    margin-top: 30px;
    @media screen and (max-width: 700px) {
        font-size: 20px;
    }
`

const Title = styled(motion.div)`
    width: 80%;
    border-radius: 50px;
    color: black;
    font-size: 80px;
    font-weight: bolder;
    line-height: 150%;
    @media screen and (max-width: 850px) {
        font-size: 50px;
    }
    @media screen and (max-width: 700px) {
        font-size: 40px;
    }
`;



export default function First() {
    const { ref: imgRef1, inView: inView1 } = useInView({ triggerOnce: false });
    const { ref: imgRef2, inView: inView2 } = useInView({ triggerOnce: false });
    const { ref: imgRef3, inView: inView3 } = useInView({ triggerOnce: false });
    const { ref: imgRef4, inView: inView4 } = useInView({ triggerOnce: false });
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Img src={`${process.env.PUBLIC_URL}home/table.jpg`} />
            <InfoContainer>
                <Title ref={imgRef1}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}>
                    동네맛집
                </Title>
                <FoodContainer>
                    <PlaceReview>
                        <PlaceImg
                            ref={imgRef1}
                            src={`${process.env.PUBLIC_URL}home/진미평양냉면.png`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        />
                        <ReviewImg
                            ref={imgRef2}
                            src={`${process.env.PUBLIC_URL}home/review1.png`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        />
                    </PlaceReview>
                    <PlaceReview>
                        <PlaceImg
                            ref={imgRef3}
                            src={`${process.env.PUBLIC_URL}home/어머니대성집.png`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        />
                        <ReviewImg
                            ref={imgRef4}
                            src={`${process.env.PUBLIC_URL}home/review2.png`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        />
                    </PlaceReview>
                </FoodContainer>
                <Info>
                    현지인이 평가한 식당들을 만나보세요!
                </Info>
            </InfoContainer>
        </Container>
    );
}
