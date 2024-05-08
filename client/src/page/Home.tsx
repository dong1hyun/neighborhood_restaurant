import LocationSet from "../components/location/LocationSet";
import MyPlace from "../components/home/MyPlace";
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
            <MyPlace />
            <Title>#일식</Title>
            <WholePlace />
        </HomeContainer>
    )
}

export default Home;