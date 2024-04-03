import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import styled from "styled-components"

const Conatiner = styled.div`
    position: relative;
    background-color: black;
    border-radius: 10px;
    height: 300px;
    width: 80%;
    margin: 0 auto;
`
const box = {
    entry: (isBack: boolean) => ({
        x: isBack ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 }
    },
    exit: (isBack: boolean) => ({
        x: isBack ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: { duration: 0.3 }
    }),
};

const ImgBox = styled(motion.div)`
    position: absolute;
    background-color: white;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    top: 100px;
`

const NextBtn = styled.button`
    position: absolute;
    right: 0;
    top: 50%;
`

const PrevBtn = styled.button`
    position: absolute;
    top: 50%;
`
export default function WholePlace() {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlease = () => {
        setBack(false);
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    }
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    }
    return (
    <AnimatePresence>
        <Conatiner>
            <ImgBox
                custom={back}
                variants={box}
                initial="entry"
                animate="center"
                exit="exit"
                key={visible}
            />
            <PrevBtn onClick={prevPlease}>prev</PrevBtn>
            <NextBtn onClick={nextPlease}>next</NextBtn>
        </Conatiner>
    </AnimatePresence>
    )
}