import styled from "styled-components"

const Container = styled.div`
    height: 500px;
    color: black;
    font-size: 300px;
    margin-top: 100px;
`

export default function Notice() {
    return <Container>
        공지사항
    </Container>
}