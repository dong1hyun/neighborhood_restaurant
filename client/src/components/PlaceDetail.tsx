import axios from "axios";
import { useParams } from "react-router-dom";
import setMarker from "../function/placeMarker";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DetailContainer = styled.div`
    margin: 30px;
`

const Detail = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 50px;
    margin-bottom: 40px;
`

export default function PlaceDetail() {
    const { id } = useParams()
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [category, setCategory] = useState();
    const [phone, setPhone] = useState();
    const [x, setX] = useState();
    const [y, setY] = useState();

    const getPlaceData = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setName(res.data.name);
                setAddress(res.data.address);
                setCategory(res.data.category);
                setPhone(res.data.phone);
                setX(res.data.x);
                setY(res.data.y);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
    }

    useEffect(() => {
        getPlaceData();
        setMarker(x, y);
    })
    return (
        <DetailContainer>   
            <Detail>{name}</Detail>
            <Detail>{address}</Detail>
            <Detail>{category}</Detail>
            <Detail>{phone}</Detail>
        </DetailContainer>
    )
}