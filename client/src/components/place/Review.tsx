import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { session } from "../../atom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const Container = styled.div`
  color: black;
`;

const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Serif KR", serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

const ReviewContainer = styled.div`
  border: solid 1px #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  height: auto;
  display: flex;
  flex-direction: column;
`;

const ReviewTitle = styled.div`
  font-size: 15px;
  font-family: "Noto Serif KR", serif;
  font-optical-sizing: auto;
  font-style: normal;
`;

const StarInput = styled.input`
  display: none;
`;

const ReviewBox = styled.input`
  width: 400px;
  height: 50px;
  border-radius: 5px;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const Rating = styled.div`
  font-size: 20px;
  margin-left: auto;
`;

const Comment = styled.div`
  margin: 10px 0;
  font-size: 16px;
  color: #555;
  line-height: 120%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin: 10px 0;
`;

const InteractionContainer = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
`;

const InteractionItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #666;
  }

  svg {
    margin-right: 5px;
  }
`;

interface reviewForm {
  rating: number;
  comment: string;
}

function Review() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const sessionID = useRecoilValue(session);
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm<reviewForm>();
  const { id } = useParams();

  const onValid = async ({ comment }: reviewForm) => {
    try {
      const reviewData = {
        restaurantId: id,
        rating,
        comment,
        sessionID,
      };
      await axios.post("/review", reviewData);
      setRating(0);
      reset();
    } catch (error) {
      console.error("리뷰 제출 에러:", error);
    }
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
      {[{comment: "음식이 전체적으로 깔끔하고 사장님이 친절합니다!", rating: 3, id: "동현"}].map((review: { comment: string; rating: number; id: string }, index: number) => (
        <ReviewContainer key={index}>
          <ProfileContainer>
            <RxAvatar size={30} />
            <ProfileInfo>{review.id}</ProfileInfo>
            <Rating>&#9733; {review.rating}</Rating>
          </ProfileContainer>
          <Divider />
          <Comment>{review.comment}</Comment>
          <InteractionContainer>
            <InteractionItem>
              <FaThumbsUp />
              791
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
