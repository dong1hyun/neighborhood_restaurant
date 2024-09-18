import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { handleImgError } from "../../lib/util";

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
    cursor: pointer;
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
                setSimilarPlace(res.data);
            })
    };
    useEffect(() => {
        getSimilarPlace();
    }, []);
    return (
        <><TopTitle>주변 추천 식당</TopTitle>
            <SimilarContainer>
                {similarPlace.map(item => <a href={`/place/${item.restaurantId}`}><PlaceBox><Img src={item.img} alt={item.restaurantName} onError={handleImgError} /><Title>{item.restaurantName}</Title></PlaceBox></a>)}
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