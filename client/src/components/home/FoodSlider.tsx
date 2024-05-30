import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
    width: 100%;
    height: 700px;
    margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 5px;
    position: absolute;
    bottom: 100px;
    left: 20px;
`

const Button = styled.button`
    border: none;
    color: white;
    background-color: orange;
    width: 30px;
    height: 30px;
    right: 100px;
    top: 100px;
    border-radius: 100%;
`

export default function FoodSlider() {
    const images = [
        "https://png.pngtree.com/background/20230519/original/pngtree-nine-different-kinds-of-food-on-black-plates-picture-image_2650424.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCBvJgaTYuuMwe3pt3COsTFmC_ePmRt7CsDg&s",
        "https://png.pngtree.com/background/20230519/original/pngtree-nine-different-kinds-of-food-on-black-plates-picture-image_2650424.jpg",
        "https://png.pngtree.com/background/20230519/original/pngtree-nine-different-kinds-of-food-on-black-plates-picture-image_2650424.jpg",
        "https://png.pngtree.com/background/20230519/original/pngtree-nine-different-kinds-of-food-on-black-plates-picture-image_2650424.jpg"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const onClick = (idx: number) => {
        setCurrentIndex(idx);
    }

    return (
        <div>
            <Img src={images[currentIndex]} />
            <ButtonContainer>
                {[1,2,3,4,5].map(i => <Button onClick={() => onClick(i)}>{i}</Button>)}
            </ButtonContainer>
        </div>
    );
}