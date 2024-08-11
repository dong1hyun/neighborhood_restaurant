import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, ForwardArrow, PlaceBox, PlaceImg, PlaceTitle, BackArrow, Rating, Slider, EllipsisText } from "../../styled-components/homeStyle";
import { SliderVar, restaurantForm } from "../../lib/homeLib"
import { AnimatePresence } from "framer-motion";

interface Place {
    restaurantId: number;
    restaurantName: string;
    img: string;
    averageRating: number;
}

interface PlaceSliderProps {
    placeData: Place[];
}


export default function PlaceSlider({ placeData }: PlaceSliderProps) {
    const [Index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [restaurantData, setRestaurantData] = useState([]);
    const navigate = useNavigate();
    
    const nextPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack(false);
        setIndex((prev) => (prev === 16 ? 0 : prev + 8));
    }
    const prevPlease = async () => {
        if (leaving) return;
        toggleLeaving();
        await setBack(true);
        setIndex((prev) => (prev === 0 ? 16 : prev - 8));
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
    return (
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
                {placeData.slice(Index, Index + 8).map(
                    (i, idx) => {
                        return(
                        <PlaceBox key={idx} whileHover={{ scale: 1.1 }}>
                            <PlaceImg src={i.img} key={idx} alt="준비중" onClick={() => handleImageClick(i.restaurantId)} />
                            <Rating><span style={{ color: "#ff5b32" }}>&#9733;</span>{i.averageRating}</Rating>
                            <PlaceTitle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}><EllipsisText>{i.restaurantName}</EllipsisText></PlaceTitle>
                        </PlaceBox>
                        )}
                )}
            </Slider>
            <BackArrow onClick={prevPlease} />
            <ForwardArrow onClick={nextPlease} />
        </AnimatePresence>
    )
}