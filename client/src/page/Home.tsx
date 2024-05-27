import { useEffect, useRef, useState } from "react";
import Chinaese from "../components/home/Chinese";
import Japanese from "../components/home/Japanese";
import Korean from "../components/home/Korean";
import LocationSet from "../components/home/LocationSet";
import WholePlace from "../components/home/WholePlace";
import styled from "styled-components";
import { motion } from "framer-motion";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* scroll-behavior: smooth;
    height: 100vh;
    scroll-snap-type: y mandatory;
    scroll-padding-top: 10px;
    overflow-y: scroll;
    -webkit-scrollbar: none */
`

const Scroll = styled.div`
    /* scroll-snap-align: center; */
`

const Title = styled.div`
    font-size: 50px;
    margin-left: 50px;
    margin-right: 10px ;
`

const Img = styled(motion.img)`
    width: 70px;
    height: 45px;
    opacity: 0.9;
    border-radius: 5px;
    margin-left: 10px;
`
const boxVariants = {
    initial: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1
    },
    leaving: {
        opacity: 0,
        scale: 0
    },
}


function Home() {
    const [isInViewport, setIsInViewport] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 요소가 뷰포트에 나타났을 경우
                    setIsInViewport(true);
                } else {
                    // 요소가 뷰포트를 벗어난 경우
                    setIsInViewport(false);
                }
            });
        };

        const options = { root: null, rootMargin: "-150px 0px -150px 0px", threshold: 1.0 };

        const observer = new IntersectionObserver(callback, options);
        observer.observe(ref.current); // 요소 관찰 시작

        return () => {
            observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
        };
    }, []);
    return (
        <HomeContainer>
            <LocationSet />
            {/* {isInViewport ? "true" : "false"} */}
            <Title ref={ref}>#한식<Img src={process.env.PUBLIC_URL + "/korea.jpg"} /></Title>
            <Korean />
            <Title>#일식<Img src={process.env.PUBLIC_URL + "/japan.jpg"} /></Title>
            <Japanese />
            <Title>#중식<Img src={process.env.PUBLIC_URL + "/china.jpg"} /></Title>
            <Chinaese />
            <Title>#추천 식당</Title>
            <WholePlace />
        </HomeContainer>
    )
}

export default Home;