import MyPlace from "../components/MyPlace";
import WholePlace from "../components/WholePlace";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Overlay from "../components/Overlay";
import React from 'react';

const HomeContainer = styled.div`

`

function Home() {
    return (
        <div>
            <MyPlace />
            <WholePlace />
        </div>
    )
}

export default Home;