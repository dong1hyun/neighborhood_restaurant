import Chinaese from "../components/home/Chinese";
import Japanese from "../components/home/Japanese";
import Korean from "../components/home/Korean";
import LocationSet from "../components/home/LocationSet";
import WholePlace from "../components/home/WholePlace";
import styled from "styled-components";

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 50px;
    margin-left: 50px;
`

function Home() {
    return (
        <HomeContainer>
            <LocationSet />
            <Title>#한식</Title>
            <Korean />
            <Title>#일식</Title>
            <Japanese />
            <Title>#중식</Title>
            <Chinaese />
            <Title>#추천 식당</Title>
            <WholePlace />
        </HomeContainer>
    )
}

export default Home;