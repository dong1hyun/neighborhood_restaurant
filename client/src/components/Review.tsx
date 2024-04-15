import styled from "styled-components"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil"
import { session } from "../atom"
import axios from "axios"
import { useParams } from "react-router-dom"

const Container = styled.div`
    color: white;
    margin: 40px;
`

const Title = styled.div`
    margin-top: 50px;
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
    const sessionID = useRecoilValue(session)
    const { register, handleSubmit } = useForm<reviewForm>();
    const { id } = useParams();
    const onValid = async ({ comment }: reviewForm) => {
        try {
            const loggedInUserId = sessionStorage.getItem('userId'); // 세션 스토리지에서 로그인 된 사용자 id 가져오기
            // 리뷰를 서버로 전송하여 데이터베이스에 저장
            await axios.post("/review", {
                restaurantID: id,
                rating,
                comment,
                userID: loggedInUserId, // 세션에 저장된 로그인 ID를 함께 전달
            });
            // 리뷰 제출 후 입력 폼 초기화
            setRating(0);
            // setComment("");
            // 부모 컴포넌트로부터 전달받은 onSubmit 콜백 호출
        } catch (error) {
            console.error("리뷰 제출 에러:", error);
        }
    }
    return (
        <Container>
            <form onSubmit={handleSubmit(onValid)}>
                <ReviewTitle>리뷰를 작성해보세요!</ReviewTitle><br />
                {[...Array(totalStars)].map((star, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <StarInput
                                {...register("rating", { required: true })}
                                type="radio"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                            />
                            <span
                                className="star"
                                style={{
                                    color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
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
                <br /><br />
                {sessionID ? <ReviewBox {...register("comment", { required: true })} /> : "로그인을 먼저해주세요!"}
            </form>
            <Title>방문자 평가</Title>
            <ReviewContainer>
                <Rating>&#9733; 4.3</Rating>
                <Comment>test comment</Comment>
            </ReviewContainer>
            <ReviewContainer>
                <Rating>&#9733; 4.3</Rating>
                <Comment>test comment</Comment>
            </ReviewContainer>
            <ReviewContainer>
                <Rating>&#9733; 4.3</Rating>
                <Comment>test comment</Comment>
            </ReviewContainer>
        </Container>
    )
}

export default Review;