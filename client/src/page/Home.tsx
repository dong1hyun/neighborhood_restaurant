import MyPlace from "../components/MyPlace";
import WholePlace from "../components/WholePlace";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Overlay from "../components/Overlay";
import React from 'react';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 50px;
    margin-left: 50px;
`

function Home() {
    return (
        <HomeContainer>
            <Title>#중식</Title>
            <MyPlace />
            <Title>#일식</Title>
            <WholePlace />
        </HomeContainer>
    )
}

export default Home;