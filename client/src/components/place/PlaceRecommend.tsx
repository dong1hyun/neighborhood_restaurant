import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const TopTitle = styled.div`
    font-size: 20px;
    padding: 10px;
`

const SimilarContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    @media screen and (max-width: 900px){
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const PlaceBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    width: 80%;
    height: 80px;
    border-radius: 10px;   
`

const Title = styled.div`
    margin-top: 5px;
`

interface similarPlace {
    restaurantId: number,
    restaurantName: string,
    img: string
}

export default function PlaceRecommend() {
    const [similarPlace, setSimilarPlace] = useState<similarPlace[]>([]);
    const { id } = useParams();
    const getSimilarPlace = async () => {
        await axios.get(`/placeDetail/${id}/similar`)
            .then((res) => {
                console.log(res);
                setSimilarPlace(res.data);
            })
    };
    useEffect(() => {
        getSimilarPlace();
    }, []);
    return (
        <><TopTitle>주변 추천 식당</TopTitle>
            <SimilarContainer>
                {similarPlace.map(item => <PlaceBox><Img src={item.img} alt={item.restaurantName} /><Title>{item.restaurantName}</Title></PlaceBox>)}
            </SimilarContainer></>)
}




// [{
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// },
// {
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// },
// {
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// },
// {
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// },
// {
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// },
// {
//     restaurantId: 123,
//     restaurantName: "국밥집",
//     img: "http://t1.daumcdn.net/cfile/26408A365228345622"
// }
// ]