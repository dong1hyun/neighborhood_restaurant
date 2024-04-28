import styled from "styled-components"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil"
import { session } from "../atom"
import axios from "axios"
import { useParams } from "react-router-dom"

const Container = styled.div`
    color: black;
    margin: 40px;
`

const Title = styled.div`
    margin-top: 50px;
    margin-bottom: 10px;
`

const ReviewContainer = styled.div`
    border: solid 1px black;
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
    const [reviews, setReviews] = useState([]);
    const { register, handleSubmit, reset } = useForm<reviewForm>();
    const { id } = useParams();
    
    const onValid = async ({ comment }: reviewForm) => {
        try {
            // 리뷰를 서버로 전송하여 데이터베이스에 저장
            const reviewData = {
                restaurantId: id,
                rating,
                comment,
                sessionID
            };
            await axios.post("/review", reviewData);
            // 리뷰 제출 후 입력 폼 초기화
            setRating(0);
            reset();
    
            // 부모 컴포넌트로부터 전달받은 onSubmit 콜백 호출
        } catch (error) {
            console.error("리뷰 제출 에러:", error);
        }
        getReviews();
    }
    
    const getReviews = async () => {
        try {
            const response = await axios.get(`/review/${id}`); // 엔드포인트를 '/review/:restaurantId'에 맞게 수정
            if (!response.data) {
                throw new Error("No data received from server");
            }
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰 데이터를 불러오는 중 오류가 발생했습니다:', error);
        }
    }
    

    useEffect(() => {
        getReviews();
    }, [])


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
                                    color: currentRating <= (hover || rating) ? "rgba(30, 144, 255,1.0)" : "#e4e5e9",
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
                <br /><br />
                {sessionID ? <ReviewBox {...register("comment", { required: true })} /> : "리뷰를 작성하려면 로그인을 먼저해주세요!"}
            </form>
            <Title>방문자 평가</Title>
            {[{comment: "좋아요", rating: 3}].map((review: { comment: string; rating: number }, index: number) => (
                <ReviewContainer key={index}>
                    <Rating>&#9733; {review.rating}</Rating>
                    <Comment>{review.comment}</Comment>
                </ReviewContainer>
            ))}
        </Container>
    )
}



// {reviews.map((review: { comment: string; rating: number }, index: number) => (
//     <ReviewContainer key={index}>
//         <Rating>&#9733; {review.rating}</Rating>
//         <Comment>{review.comment}</Comment>
//     </ReviewContainer>
// ))}

export default Review;