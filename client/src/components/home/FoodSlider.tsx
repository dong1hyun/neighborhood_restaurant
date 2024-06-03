import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import First from "./First"
import Second from "./Second";
import Third from "./Third"

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
    const Infos = [
        <First />,
        <Second />,
        <Third />
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevInterval, setPrevInterval] = useState<NodeJS.Timer>();

    const setSliderTime = () => setInterval(() => setCurrentIndex(cur => cur === 2 ? 0 : cur + 1), 4000);
    
    const onClick = (idx: number) => {
        setCurrentIndex(idx);
        clearInterval(prevInterval);
        setPrevInterval(setSliderTime());
    };

    useEffect(() => {
        setPrevInterval(setSliderTime());
        return () => clearInterval(prevInterval); 
    }, []);

    return (
        <Container>
            {Infos[currentIndex]}
            <ButtonContainer>
                {[0, 1, 2].map(i => (
                    <Button
                        key={i}
                        isSelected={i === currentIndex}
                        onClick={() => onClick(i)}
                    />
                ))}
            </ButtonContainer>
        </Container>
    );
}
