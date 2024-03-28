import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceImg from "../components/PlaceImg";

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 220px;
    background-color: black;
    margin-left: 20px;
    margin-top: 50px;
    border-radius: 15px;
`
const PlaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: black;
    border-radius: 15px;
    height: 100%;
    width: 50%;
    margin-top: 50px;
`
const PlaceName = styled.div`
    font-size: 50px;
    color: white;
    margin-top: 40px;
    margin-left: 30px;
`

const DetailContainer = styled.div`
    margin: 30px;
    color: white;
`

const Detail = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    margin-bottom: 40px;
`

const Map = styled.div`
    width: 170px;
    height: 300px;
    border-radius: 10px;
    border: 2px solid black;
    margin: 20px
`

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
`


function Place() {
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
        <Container>
        <PlaceContainer>
            <PlaceImg />
            <PlaceName>{name}</PlaceName>
            <DetailContainer>
                <Detail>{category}</Detail>
                <Detail>평점: 5</Detail>
                <Detail>{address}</Detail>
                <Detail>{phone}</Detail>
            </DetailContainer>
        </PlaceContainer>
        <SideBar><Map id="placeMap" /></SideBar>
        </ Container>
    )
}

export default Place;