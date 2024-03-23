import axios from "axios";
import { useParams } from "react-router-dom";
import setMarker from "../function/placeMarker";
import { useEffect, useState } from "react";
import styled from "styled-components";

const DetailContainer = styled.div`
    margin: 30px;
`

const PlaceName = styled.div`
  font-family: "Nanum Gothic Coding", monospace;
  font-weight: 400;
  font-style: normal;
    font-size: 50px;
`

export default function PlaceDetail() {
    const { id } = useParams()
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [name, setName] = useState("");

    const getPlaceData = async () => {
        await axios.get(`/placeDetail/${id}`)
            .then((res) => {
                setX(res.data.x);
                setY(res.data.y);
                setName(res.data.name);
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
            <PlaceName>{name}</PlaceName>
        </DetailContainer>
    )
}