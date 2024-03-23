import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import React from 'react';
import setMarker from "../function/placeMarker";
import PlaceDetail from "../components/PlaceDetail";

const PlaceName = styled.div`
    
`

const Map = styled.div`

    width: 600px;
    height: 500px;
    border-radius: 10px;
    border: 2px solid black;
`

const Container = styled.div`
    display: flex;
    margin: 50px;
`
function Place() {
    return (
        <Container>
            <Map id="placeMap" />
            <PlaceDetail />
        </Container>
    )
}

export default Place;