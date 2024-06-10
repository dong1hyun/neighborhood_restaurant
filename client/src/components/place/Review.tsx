import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { session } from "../../atom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { Comment, Container, Divider, InteractionContainer, InteractionItem, ProfileContainer, ProfileInfo, Rating, ReviewBox, ReviewContainer, ReviewTitle, StarInput, Title } from "../../styled-components/reviewStyle";

interface reviewPostForm {
  rating: number;
  comment: string;
}

interface reviewForm {
  reviewId: number;
  comment: string;
  rating: number;
  like: number;
  nickName: string;
}

function Review() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [like, setLike] = useState([]);
  const sessionID = useRecoilValue(session);
  const { register, handleSubmit, reset } = useForm<reviewPostForm>();
  const { id } = useParams();

  const onValid = async ({ comment }: reviewPostForm) => {
    const reviewData = {
      restaurantId: id,
      rating,
      comment,
      sessionID,
    };
    await axios.post("/review", reviewData)
      .then(() => {
        setRating(0);
        reset();
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
    getReviews();
  };

const getReviews = async () => {
  try {
    const response = await axios.get(`/review/${id}`);
    if (!response.data) {
      throw new Error("No data received from server");
    }
    setReviews(response.data);
  } catch (error) {
    console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다:", error);
  }
};

const onLikeClick = async (reviewId: number) => {
  await axios.post("/review/like", { reviewId })
    .then((res) => {
      setLike(res.data.like);
      getReviews();
    })
    .catch((err) => {
      alert(err.response.data.message);
    })
}

useEffect(() => {
  getReviews();
}, []);

return (
  <Container>
    <form onSubmit={handleSubmit(onValid)}>
      <ReviewTitle>리뷰를 작성해보세요!</ReviewTitle>
      <br />
      {[1, 2, 3, 4, 5].map((star, index) => {
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
                fontSize: "20px",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <br />
      <br />
      {sessionID ? (
        <ReviewBox {...register("comment", { required: true })} />
      ) : (
        "리뷰를 작성하려면 로그인을 먼저해주세요!"
      )}
    </form>
    <Title>방문자 평가</Title>
    {reviews.map((review: reviewForm, index: number) => (
      <ReviewContainer key={index}>
        <ProfileContainer>
          <RxAvatar size={30} />
          <ProfileInfo>{review.nickName}</ProfileInfo>
          <Rating>&#9733; {review.rating}</Rating>
        </ProfileContainer>
        <Divider />
        <Comment>{review.comment}</Comment>
        <InteractionContainer>
          <InteractionItem type="submit" onClick={() => onLikeClick(review.reviewId)}>
            <FaThumbsUp />
            {review.like}
          </InteractionItem>
        </InteractionContainer>
      </ReviewContainer>
    ))}
  </Container>
);
}

// {reviews.map((review: { comment: string; rating: number }, index: number) => (
//     <ReviewContainer key={index}>
//         <Rating>&#9733; {review.rating}</Rating>
//         <Comment>{review.comment}</Comment>
//     </ReviewContainer>
// ))}


// {[{comment: "좋아요", rating: 3}].map((review: { comment: string; rating: number }, index: number) => (
//     <ReviewContainer key={index}>
//         <Rating>&#9733; {review.rating}</Rating>
//         <Comment>{review.comment}</Comment>
//     </ReviewContainer>
// ))}

export default Review;
