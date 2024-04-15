import styled from "styled-components"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Container = styled.div`
    color: white;
    margin: 40px;
`

const Title = styled.div`
    margin-bottom: 10px;
`

const ReviewContainer = styled.div`
    border: solid 1px white;
    border-radius: 5px;
    margin-bottom: 40px;
    font-size: 30px;
    height: 100%;
`

const ReviewTitle = styled.div`
    font-size: 15px;
`

const StarInput = styled.input`
    display: none;
`

const ReviewBox = styled.input`
    width: 400px;
    height: 50px;
    border-radius: 5px;
    @media screen and (max-width: 500px) {
        width: 200px;
    }
`

const Rating = styled.div`
    margin: 10px;
`

const Comment = styled.div`
    margin: 10px;
`

interface reviewForm {
    rating: Number;
    comment: string;
}

function Review() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [totalStars, setTotalStars] = useState(5);
    const { register, handleSubmit} = useForm<reviewForm>();
    const onValid = ({ comment }: reviewForm) => {
        console.log(rating, comment)
    }
    return (
        <Container>
            <Title>방문자 평가</Title>
            <ReviewContainer>
            <Rating>&#9733; 4.3</Rating>
                <Comment>test comment</Comment>
            </ReviewContainer>
            <form onSubmit={handleSubmit(onValid)}>
                <ReviewTitle>리뷰를 작성해보세요!</ReviewTitle><br />
                {[...Array(totalStars)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <StarInput
                                {...register("rating", {required: true})}
                                type="radio"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                            />
                            <span
                                className="star"
                                style={{
                                    color:currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                                    fontSize: "20px"
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(0)}
                            >
                                &#9733;
                            </span>
                        </label>
                    );
                })}
                {/* {rating} */}
                <br/><br/>
                <ReviewBox {...register("comment", {required: true})} />
            </form>
        </Container>
    )
}

export default Review;