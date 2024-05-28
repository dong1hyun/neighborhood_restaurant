import { useEffect, useRef, useState } from "react";
import LocationSet from "../components/home/LocationSet";
import styled from "styled-components";
import { motion } from "framer-motion";
import PlaceSlider from "../components/home/PlaceSlider";
import axios from "axios";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
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


function Home() {
    const [koreanFood, setKoeanFood] = useState([]);
    const [japaneseFood, setJapaneseFood] = useState([]);
    const [chineseFood, setChineseFood] = useState([]);
    const [recommendFood, setRecommendFood] = useState([]);
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
    return (
        <HomeContainer>
            <LocationSet />
            <Title>#한식<Img src={process.env.PUBLIC_URL + "/korea.jpg"} /></Title>
            <PlaceSlider placeData={koreanFood} />
            <Title>#일식<Img src={process.env.PUBLIC_URL + "/japan.jpg"} /></Title>
            <PlaceSlider placeData={japaneseFood} />
            <Title>#중식<Img src={process.env.PUBLIC_URL + "/china.jpg"} /></Title>
            <PlaceSlider placeData={chineseFood} />
            <Title>#추천 식당</Title>
            <PlaceSlider placeData={recommendFood} />
        </HomeContainer>
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