import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

const Place_Img = styled.img`
    margin: 0 auto;
    margin-top: 40px;
    width: 80%;
    height: 300px;
    border-radius: 10px;
`

export default function PlaceImg() {
    const { id } = useParams();
    const [imgURL, setImgURL] = useState("");
    const getPlaceImg = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setImgURL(res.data.img)
                // console.log(res.data.img)
            })
    }
    // getPlaceImg();
    useEffect(() => {
        getPlaceImg();
    }, [])
    return (
        <Place_Img src={imgURL} alt="http://t1.daumcdn.net/place/6053CB87EB044D43BAB97C0D437CE59D" />
    )
}