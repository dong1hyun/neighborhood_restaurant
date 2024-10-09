import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    line-height: 1.5;
`

export default function Phone() {
    return (
        <Container>
            <div>
                개발, 기획
            </div>
            <div>임동현: limd1238@gmail.com</div>
            <div>최성준: choi000803@bible.ac.kr</div>
        </Container>
    )
}