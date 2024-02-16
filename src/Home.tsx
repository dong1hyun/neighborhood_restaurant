import styled from "styled-components";
import Header from "./components/Header";
import { KakaoMap } from "./components/KakaoMap";
import { useRecoilValue } from "recoil";
import { keyword } from "./atom";

function Home() {
    const test = useRecoilValue(keyword)
    console.log(test)
    return (
        <div>
            home
        </div>
    )
}

export default Home;