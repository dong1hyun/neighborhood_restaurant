import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

const Place_Img = styled.img`
    border: solid 3px white;
    width: 400px;
    height: 400px;
    margin-top: 30px;
    /* border-radius: 10px; */
    @media screen and (max-width: 1100px) {
        margin: 0 auto;
        width: 300px;
        height: 300px;
    }
    @media screen and (max-width: 700px) {
        margin: 0 auto;
        width: 200px;
        height: 200px;
    }
`

export default function PlaceImg() {
    const { id } = useParams();
    const [imgURL, setImgURL] = useState("");
    const getPlaceImg = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setImgURL(res.data.img)
            })
    }
    useEffect(() => {
        // getPlaceImg();
    }, [])
    return (
        <Place_Img src="http://t1.daumcdn.net/place/4969C82B70A74BD891BC815EBBA835C2" alt="음식 사진" />
    )
}

//"https://t1.kakaocdn.net/mystore/D9EC1E16FC734163811D77FF1FDDA9FA"