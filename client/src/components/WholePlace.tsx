import axios from "axios";
import { AnimatePresence, delay, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 30px;
    background-color: black;
    border-radius: 10px;
    height: 300px;
    width: 90%;
    overflow: hidden;
    @media screen and (max-width: 700px){
        height: 350px;
    }
`

const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  @media screen and (max-width: 700px){
    grid-template-columns: repeat(2, 1fr);
  }
`

const PlaceImg = styled(motion.img)`
    background-color: white;
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
    color: black;
    cursor: pointer;
    @media screen and (max-width: 700px){
        height: 170px;
    }
`

const PlaceTitle = styled(motion.div)`
    position: absolute;
    background-color: black;
    width: 100%;
    height: 25px;
    bottom: 0;
    color: white;
    font-size: 20px;
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

const PlaceBox = styled.div`
    position: relative;
`

const SliderVar = {
    hidden: (isBack: boolean) => ({
        x: isBack ? -window.outerWidth + (window.outerWidth / 10) : window.outerWidth - (window.outerWidth / 10),
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? window.outerWidth - (window.outerWidth / 10) : -window.outerWidth + (window.outerWidth / 10),
    }),
};

interface restaurantForm {
    img: string,
    restaurantId: Number,
    restaurantName: string
}

export default function WholePlace() {
    const [Index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const [showTitle, setShowTitle] = useState(0);
    const navigate = useNavigate();
    const nextPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack(false);
        setIndex((prev) => (prev === 16 ? 0 : prev + 4));
    }
    const prevPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack(true);
        setIndex((prev) => (prev === 0 ? 16 : prev - 4));
    }
    const toggleLeaving = () => setLeaving((cur) => !cur);

    const handleImageClick = async (restaurantId: Number) => {
        try {
            // 클릭된 음식점 ID를 받아옵니다.
            navigate(`/place/${restaurantId}`); // 해당하는 place의 ID로 이동
        } catch (error) {
            console.error('Error fetching restaurantId:', error);
        }
    };

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                const response = await axios.get('/restaurantData');
                const shuffledImages = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setRestaurantData(shuffledImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }

        fetchRestaurant();
    }, []);
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
                    {restaurantData.slice(Index, Index + 4).map(
                        (item: restaurantForm, idx) => (
                            <PlaceBox onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)}>
                                <PlaceImg
                                    // whileHover={{ scale: 1.1 }}
                                    src={item.img}
                                    key={idx}
                                    alt="Loading..."
                                    onClick={() => handleImageClick(item.restaurantId)} // 클릭 시 handleImageClick 함수 호출
                                />
                                {idx + 1 == showTitle ? <PlaceTitle initial={{scale: 0}} animate={{scale:1}} transition={{delay: 0.1}}>{item.restaurantName}</PlaceTitle> : null}
                            </PlaceBox>
                        )
                    )}
                </Slider>
                <PrevBtn onClick={prevPlease}>prev</PrevBtn>
                <NextBtn onClick={nextPlease}>next</NextBtn>
            </AnimatePresence>
        </Container>
    )
}


// {restaurantData.slice(Index, Index + 4).map(
//     (item: restaurantForm, idx) => (
//         <PlaceBox onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)}>
//             <PlaceImg
//                 // whileHover={{ scale: 1.1 }}
//                 src={item.img}
//                 key={idx}
//                 alt="Loading..."
//                 onClick={() => handleImageClick(item.restaurantId)} // 클릭 시 handleImageClick 함수 호출
//             />
//             {idx + 1 == showTitle ? <PlaceTitle initial={{scale: 0}} animate={{scale:1}} transition={{delay: 0.1}}>{item.restaurantName}</PlaceTitle> : null}
//         </PlaceBox>
//     )
// )}


// {["http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67"].slice(Index, Index + 4).map(
//     (i, idx) => (
//         <PlaceBox onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)}>
//             <PlaceImg src={i} key={idx} alt="Loding" />
//             {idx + 1 == showTitle ? <PlaceTitle initial={{scale: 0}} animate={{scale:1}} transition={{delay: 0.1}}>test</PlaceTitle> : null}
//         </PlaceBox>)
// )}