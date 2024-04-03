import styled from "styled-components"

const Container = styled.div`
    color: white;
    margin: 30px;
`

const Title = styled.div`
    margin: 10px;
`

const ReviewContainer = styled.div`
    border: solid 1px white;
    border-radius: 5px;
    margin: 20px;
    font-size: 30px;
    height: 100%;
`

const Rating = styled.div`
    margin: 10px;
`

const Comment = styled.div`
    margin: 10px;
`

export default function Review() {
    return (
        <Container>
            <Title>방문자 평가</Title>
            <ReviewContainer>
                <Rating>4.3</Rating>
                <Comment>test comment</Comment>
            </ReviewContainer>
            <form>
                <span style={{fontSize: "15px"}}>리뷰를 작성해보세요!</span><br />
                <input />
            </form>
        </Container>
    )
}