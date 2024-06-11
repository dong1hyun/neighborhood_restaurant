import LocationSet from "../components/LocationSet";
import MyPlace from "../components/MyPlace";
import WholePlace from "../components/WholePlace";
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