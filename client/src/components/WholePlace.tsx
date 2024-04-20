import axios from "axios";
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
    position: relative;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 30px;
    background-color: black;
    height: 300px;
    width: 90%;
    overflow: hidden;
    @media screen and (max-width: 700px){
        height: 330px;
    }
`

const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  @media screen and (max-width: 700px){
    grid-template-columns: repeat(2, 1fr);
  }
`

const PlaceBox = styled(motion.img)`
    background-color: white;
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
    color: black;
    @media screen and (max-width: 700px){
        height: 170px;
    }
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
        x: isBack ? -window.outerWidth + (window.outerWidth / 10) : window.outerWidth - (window.outerWidth / 10),
    }),
    visible: {
        x: 0,
    },
    exit: (isBack: boolean) => ({
        x: isBack ? window.outerWidth - (window.outerWidth / 10) : -window.outerWidth + (window.outerWidth / 10),
    }),
};


export default function MyPlace() {
    const [Index, setIndex] = useState(0);
    const [back, setBack] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
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

    const handleImageClick = async (imageUrl: any) => {
        try {
            // 클릭된 이미지의 URL을 서버로 전송하여 음식점 ID를 받아옵니다.
            console.log('Sending request for imageUrl:', imageUrl); // URL 요청 콘솔 로깅
            const response = await axios.post('/restaurantId', { imageUrl });
            const restaurantId = response.data.restaurantId;
            navigate(`/place/${restaurantId}`); // 해당하는 place의 ID로 이동
        } catch (error) {
            console.error('Error fetching restaurantId:', error);
        }
    };

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

        // fetchImages();
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
                    {["http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67"].slice(Index, Index + 4).map(
                        (i, idx) => (<PlaceBox whileHover={{ scale: 1.1 }} src={i} key={idx} alt="Loding" />)
                    )}
                </Slider>
                <PrevBtn onClick={prevPlease}>prev</PrevBtn>
                <NextBtn onClick={nextPlease}>next</NextBtn>
            </AnimatePresence>
        </Container>
    )
}


// {imageUrls.slice(Index, Index + 4).map(
//     (imageUrl, idx) => (
//         <PlaceBox
//             src={imageUrl}
//             key={idx}
//             onClick={() => handleImageClick(imageUrl)} // 클릭 시 handleImageClick 함수 호출
//         />
//     )
// )}

// {["http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67", "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2", "http://t1.kakaocdn.net/fiy_reboot/place/CD74C63DB35E45FFA11AA7C4DD1E26D2", "http://t1.kakaocdn.net/fiy_reboot/place/246DFFE302E54D8FBC8CB3DD78029037", "http://t1.daumcdn.net/place/8945492B67AF436DBFD1156AF8685A67"].slice(Index, Index + 4).map(
//                         (i, idx) => (<PlaceBox src={i} key={idx} alt="Loding" />)
//                     )}