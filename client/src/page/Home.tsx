import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import PlaceSlider from "../components/home/PlaceSlider";
import axios from "axios";
import FoodSlider from "../components/home/FoodSlider";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Loading } from "../styled-components/homeStyle";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 70px;
`

const Title = styled.div`
    font-size: 30px;
    margin-left: 50px;
    margin-top: 10px;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
`

const Img = styled(motion.img)`
    width: 40px;
    height: 25px;
    opacity: 0.9;
    border-radius: 5px;
    margin-left: 10px;
`

const Divider = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ababab;
  margin: auto;
  margin-top: 20px;
`;

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const session =  sessionStorage.getItem('sessionID');
    const onLocationSetClick = () => {
        navigate("/locationSet")
    }
    useEffect(() => {
        async function fetchRestaurant() {
            try {
                setLoading(true);
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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }

        fetchRestaurant();
    }, []);
    return (
        <>
        <FoodSlider />
        <LocationAuth whileHover={{scale:1.1}} onClick={onLocationSetClick}>동네 인증</LocationAuth>
        <HomeContainer>
            <Container>
                <Title>한식<Img src={process.env.PUBLIC_URL + "/home/korea.jpg"} /></Title>
                <Divider />
                {loading ? <Loading /> : <PlaceSlider placeData={koreanFood} />}
            </Container>
            <Container>
                <Title>일식<Img src={process.env.PUBLIC_URL + "/home/japan.jpg"} /></Title>
                <Divider />
                {loading ? <Loading /> : <PlaceSlider placeData={japaneseFood} />}
            </Container>
            <Container>
                <Title>중식<Img src={process.env.PUBLIC_URL + "/home/china.jpg"} /></Title>
                <Divider />
                {loading ? <Loading /> : <PlaceSlider placeData={chineseFood} />}
            </Container>
            <Container>
                <Title>추천 식당</Title>
                <Divider />
                {loading ? <Loading /> : <PlaceSlider placeData={recommendFood} />}
            </Container>
        </HomeContainer>
        </>
    )
}

export default Home;


// [{ restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" }, { restaurantId: 123, restaurantName: "korea", img: "http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" },]