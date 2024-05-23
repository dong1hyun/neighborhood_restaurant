import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, NextBtn, PlaceBox, PlaceImg, PlaceTitle, PrevBtn, Rating, Slider } from "../../styled-components/homeStyle";
import { SliderVar, restaurantForm } from "../../lib/homeLib"
import { AnimatePresence } from "framer-motion";

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
            // 클릭된 이미지의 URL을 서버로 전송하여 음식점 ID를 받아옵니다.
            navigate(`/place/${restaurantId}`); // 해당하는 place의 ID로 이동
        } catch (error) {
            console.error('Error fetching restaurantId:', error);
        }
    };

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                const response = await axios.get('/restaurantData');
                const restData = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setRestaurantData(restData);
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
                            <PlaceBox whileHover={{ scale: 1.1 }} onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)}>
                                <PlaceImg
                                    src={item.img}
                                    key={idx}
                                    alt="Loading..."
                                    onClick={() => handleImageClick(item.restaurantId)} // 클릭 시 handleImageClick 함수 호출
                                />
                                <Rating><span style={{ color: "rgba(30, 144, 255,1.0)" }}>&#9733;</span> 3.5</Rating>
                                <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>{ item.restaurantName }</PlaceTitle>
                            </PlaceBox>
                        )
                    )}
                </Slider>   
                <PrevBtn src={process.env.PUBLIC_URL + "/back.png"} onClick={prevPlease} />
                <NextBtn src={process.env.PUBLIC_URL + "/next.png"} onClick={nextPlease} />
            </AnimatePresence>
        </Container>
    )
}



// {restaurantData.slice(Index, Index + 4).map(
//     (item: restaurantForm, idx) => (
//         <PlaceBox whileHover={{ scale: 1.1 }} onMouseEnter={() => setShowTitle(idx + 1)} onMouseLeave={() => setShowTitle(0)}>
//             <PlaceImg
//                 src={item.img}
//                 key={idx}
//                 alt="Loading..."
//                 onClick={() => handleImageClick(item.restaurantId)} // 클릭 시 handleImageClick 함수 호출
//             />
//             <Rating><span style={{ color: "rgba(30, 144, 255,1.0)" }}>&#9733;</span> 3.5</Rating>
//             <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}>{ item.restaurantName }</PlaceTitle>
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