import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // react-router-dom의 useNavigate 사용

const Container = styled.div`
    position: relative;
    margin: 0 auto;
    margin-bottom: 100px;
    background-color: black;
    height: 300px;
    width: 1200px;
    overflow: hidden;
`;

const Slider = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    position: absolute;
    width: 100%;
    top: 50px;
`;

const PlaceBox = styled(motion.img)`
    background-color: white;
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center center;
    color: black;
    cursor: pointer; // 이미지를 클릭 가능하게 설정
`;

const NextBtn = styled.button`
    position: absolute;
    right: 0;
    top: 50%;
`;

const PrevBtn = styled.button`
    position: absolute;
    top: 50%;
`;

const SliderVar = {
    hidden: (isBack:any) => ({
        x: isBack ? -1200 - 10 : 1200 + 10,
    }),
    visible: {
        x: 0,
    },
    exit: (isBack:any) => ({
        x: isBack ? 1200 + 10 : -1200 - 10,
    }),
};

export default function WholePlace() {
    const [Index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const Navigate = useNavigate (); // useNavigate 사용하여 Navigate 객체를 가져옴

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('/img');
                const shuffledImages = response.data.images.sort(() => Math.random() - 0.5);
                setImageUrls(shuffledImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }

        fetchImages();
    }, []);

    const nextPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack(false);
        setIndex((prev) => (prev === 16 ? 0 : prev + 4));
    };

    const prevPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack((true));
        setIndex((prev) => (prev === 0 ? 16 : prev - 4));
    };

    const toggleLeaving = () => setLeaving((cur) => !cur);

 // 이미지 클릭 시 해당 place의 ID로 이동하는 함수
const handleImageClick = async (imageUrl:any) => {
    try {
        // 클릭된 이미지의 URL을 서버로 전송하여 음식점 ID를 받아옵니다.
        console.log('Sending request for imageUrl:', imageUrl); // URL 요청 콘솔 로깅
        const response = await axios.post('/restaurantId', { imageUrl });
        const restaurantId = response.data.restaurantId;
        Navigate(`/place/${restaurantId}`); // 해당하는 place의 ID로 이동
    } catch (error) {
        console.error('Error fetching restaurantId:', error);
    }
};


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
                    {imageUrls.slice(Index, Index + 4).map(
                        (imageUrl, idx) => (
                            <PlaceBox
                                src={imageUrl}
                                key={idx}
                                onClick={() => handleImageClick(imageUrl)} // 클릭 시 handleImageClick 함수 호출
                            />
                        )
                    )}
                </Slider>
                <PrevBtn onClick={prevPlease}>prev</PrevBtn>
                <NextBtn onClick={nextPlease}>next</NextBtn>
            </AnimatePresence>
        </Container>
    );
}
