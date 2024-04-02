import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";

const Place_Img = styled.img`
    border: solid 3px white;
    margin: 30px;
    width: 400px;
    height: 400px;
    border-radius: 10px;
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
        getPlaceImg();
    }, [])
    return (
        <Place_Img src={imgURL} alt="음식 사진" />
    )
}