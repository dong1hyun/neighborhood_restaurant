import styled from "styled-components";
import Header from "./components/Header";
import { KakaoMap } from "./components/KakaoMap";

function Home() {
    return (
        <div>
            <Header />
            <KakaoMap />
            <ul id="placesList"></ul>
            <div id="pagination"></div>
        </div>
    )
}

export default Home;