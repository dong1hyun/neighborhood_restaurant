import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import First from "./First"
import Second from "./Second";
import Third from "./Third"
import Fourth from "./Fourth";

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    gap: 10px;
    left: 10%;
    bottom: 10%;
`;

const Button = styled.button<{ isSelected: boolean }>`
    border: none;
    color: white;
    background-color: ${props => props.isSelected ? 'rgba(192, 57, 43,1.0)' : 'rgba(247, 159, 31,1.0)'};
    width: 30px;
    height: 30px;
    border-radius: 100%;
`;

export default function FoodSlider() {
    const isLogin = sessionStorage.getItem('sessionID');
    const Infos = [
        <First />,
        <Second />,
        <Third />,
        <Fourth />
    ];

    const pageIdx = isLogin ? [1, 2, 3] : [0, 1, 2, 3];
    const [currentIndex, setCurrentIndex] = useState(isLogin ? 1 : 0);
    const [prevInterval, setPrevInterval] = useState<NodeJS.Timer>();

    const setSliderTime = () => setInterval(() => setCurrentIndex(cur => cur === 2 ? 0 : cur + 1), 4000);
    const setLoginSliderTime = () => setInterval(() => {
        setCurrentIndex(cur => {
            if(cur == 0 || cur == 2) return 1;
            return cur + 1;
        })
    }, 4000);

    const onClick = (idx: number) => {
        setCurrentIndex(idx);
        // clearInterval(prevInterval);
        // if(isLogin) setPrevInterval(setLoginSliderTime()); //로그인시 첫 번째 페이지는 생략
        // else setPrevInterval(setSliderTime());
    };

    useEffect(() => {
        // setPrevInterval(setSliderTime());
        // return () => clearInterval(prevInterval); 
    }, []);

    return (
        <Container>
            {Infos[currentIndex]}
            <ButtonContainer>
                {pageIdx.map(i => {
                    return (
                    <Button
                        key={i}
                        isSelected={i === currentIndex}
                        onClick={() => onClick(i)}
                    />
                )})}
            </ButtonContainer>
        </Container>
    );
}
