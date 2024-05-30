import { useEffect, useRef, useState } from "react";
import LocationSet from "../components/home/LocationSet";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import PlaceSlider from "../components/home/PlaceSlider";
import axios from "axios";
import FoodSlider from "../components/home/FoodSlider";

const GlobalStyle = createGlobalStyle`
  body {
    padding-top: 0px;
  }
`;

const OverLayBox = styled(motion.div)`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
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

const LocationAuth = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 221, 89,1.0);
    border-radius: 40px;
    height: 60px;
    width: 150px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    color: black;
    font-family: "Black Han Sans", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 28px;
    z-index: 15;
    cursor: pointer;
    @media screen and (max-width: 700px) {
        width: 20%;
        height: 40px;
        font-size: 15px;
    }
`

function Home() {
    const [koreanFood, setKoeanFood] = useState([]);
    const [japaneseFood, setJapaneseFood] = useState([]);
    const [chineseFood, setChineseFood] = useState([]);
    const [recommendFood, setRecommendFood] = useState([]);
    const [showAuth, setShowAuth] = useState(false);
    useEffect(() => {
        async function fetchRestaurant() {
            try {
                let response = await axios.get('/restaurantData/korean');
                let restData = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setKoeanFood(restData);
                response = await axios.get('/restaurantData/japanese');
                restData = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setJapaneseFood(restData);
                response = await axios.get('/restaurantData/chinese');
                restData = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setChineseFood(restData);
                response = await axios.get('/restaurantData');
                restData = response.data.restaurantData.sort(() => Math.random() - 0.5);
                setRecommendFood(restData);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }

        fetchRestaurant();
    }, []);

    useEffect(() => {
        document.body.style.paddingTop = '0px';
      }, []);
    return (
        <>
        <GlobalStyle />
        <FoodSlider />
        <LocationAuth layoutId="location" whileHover={{scale:1.1}} onClick={() => setShowAuth(true)}>동네 인증</LocationAuth>
        {showAuth ? <><LocationSet /> <OverLayBox onClick={() => setShowAuth(false)} /></> : null}
        <HomeContainer>    
            <div>
                <Title>한식<Img src={process.env.PUBLIC_URL + "/korea.jpg"} /></Title>
                <PlaceSlider placeData={[{ restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" },]} />
            </div>
            <div>
                <Title>일식<Img src={process.env.PUBLIC_URL + "/japan.jpg"} /></Title>
                <PlaceSlider placeData={japaneseFood} />
            </div>
            <div>
                <Title>중식<Img src={process.env.PUBLIC_URL + "/china.jpg"} /></Title>
                <PlaceSlider placeData={chineseFood} />
            </div>
            <div>
                <Title>추천 식당</Title>
                <PlaceSlider placeData={recommendFood} />
            </div>
        </HomeContainer>
        </>
    )
}

export default Home;


{/* <HomeContainer>
    <LocationSet />
    <Title>#한식<Img src={process.env.PUBLIC_URL + "/korea.jpg"} /></Title>
    <PlaceSlider placeData={[{ restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }]} />
    <Title>#일식<Img src={process.env.PUBLIC_URL + "/japan.jpg"} /></Title>
    <PlaceSlider placeData={[{ restaurantId: 123, restaurantName: "japan", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }]} />
    <Title>#중식<Img src={process.env.PUBLIC_URL + "/china.jpg"} /></Title>
    <PlaceSlider placeData={[{ restaurantId: 123, restaurantName: "china", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }]} />
    <Title>#추천 식당</Title>
    <PlaceSlider placeData={[{ restaurantId: 123, restaurantName: "recommend", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }]} />
</HomeContainer> */}