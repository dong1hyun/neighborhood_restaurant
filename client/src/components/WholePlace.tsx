import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    background-color: black;
    height: 300px;
    width: 1200px;
    overflow: hidden;
`

const Slider = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  position: absolute;
  width: 100%;
  top: 50px;
`

const PlaceBox = styled(motion.img)`
    background-color: white;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center center;
    color: black;
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

const SliderVar = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -1200 - 10 : 1200 + 10,
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? 1200 + 10 : -1200 - 10,
    }),
};


export default function WholePlace() {
    const [Index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const nextPlease = async () => {
        if(leaving) return;
        toggleLeaving();
        await setBack(false);
        setIndex((prev) => (prev === 16 ? 0 : prev + 4));
    }
    const prevPlease = async () => {
        if(leaving) return;
        toggleLeaving();
        await setBack((true));
        setIndex((prev) => (prev === 0 ? 16 : prev - 4));
    }
    const toggleLeaving = () => setLeaving((cur) => !cur);
    return (
        <Container>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Slider
                    custom={back}
                    variants={SliderVar}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={Index}
                >
                    {["http://t1.daumcdn.net/place/3C60A3497D20434BB7627E659547D51E", "http://t1.daumcdn.net/place/709CBD1C151B479AA077A29C2B312D0D", "http://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA", "http://t1.kakaocdn.net/fiy_reboot/place/241E75A6782F424387561CE1FA924E49", "http://t1.daumcdn.net/place/3C60A3497D20434BB7627E659547D51E", "http://t1.daumcdn.net/place/709CBD1C151B479AA077A29C2B312D0D", "http://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA", "http://t1.kakaocdn.net/fiy_reboot/place/241E75A6782F424387561CE1FA924E49", "http://t1.daumcdn.net/place/3C60A3497D20434BB7627E659547D51E", "http://t1.daumcdn.net/place/709CBD1C151B479AA077A29C2B312D0D", "http://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA", "http://t1.kakaocdn.net/fiy_reboot/place/241E75A6782F424387561CE1FA924E49", "http://t1.daumcdn.net/place/3C60A3497D20434BB7627E659547D51E", "http://t1.daumcdn.net/place/709CBD1C151B479AA077A29C2B312D0D", "http://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA", "http://t1.kakaocdn.net/fiy_reboot/place/241E75A6782F424387561CE1FA924E49", "http://t1.daumcdn.net/place/3C60A3497D20434BB7627E659547D51E", "http://t1.daumcdn.net/place/709CBD1C151B479AA077A29C2B312D0D", "http://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA", "http://t1.kakaocdn.net/fiy_reboot/place/241E75A6782F424387561CE1FA924E49"].slice(Index, Index + 4).map(
                        (i, idx) => (<PlaceBox src={i} key={idx} />)
                    )}
                </Slider>
                <PrevBtn onClick={prevPlease}>prev</PrevBtn>
                <NextBtn onClick={nextPlease}>next</NextBtn>
            </AnimatePresence>
        </Container>
    )
}