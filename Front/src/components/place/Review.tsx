import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FaThumbsUp } from "react-icons/fa";
import { BtnContainer, Comment, Container, Divider, InteractionContainer, InteractionItem, LoadMoreBtn, ProfileContainer, ProfileInfo, Rating, ReviewBox, ReviewContainer, ReviewTitle, StarInput, Title } from "../../styled-components/reviewStyle";

interface reviewPostForm {
  rating: number;
  comment: string;
}

interface reviewForm {
  reviewId: number;
  comment: string;
  rating: number;
  nickName: string;
  like: number;
}


interface ReviewComponentProps {
  refreshFn: () => Promise<void>;
};

const Review: React.FC<ReviewComponentProps> = ({ refreshFn }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [maxReview, setMaxReview] = useState(false);
  const [reviews, setReviews] = useState<reviewForm[]>([]);
  const [offset, setOffset] = useState(0);
  const sessionID = sessionStorage.getItem('sessionID');
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
      .then((res) => {
        alert(res.data.message)
        setRating(0);
        reset();
      })
      .catch((err) => {
        alert(err.response.data.message);
      })
    getReviews();
    refreshFn();
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

  const loadMoreReview = async () => {
    try {
      setOffset(prev => prev + 5); //set 함수는 비동기적으로 작동
      const response = await axios.get(`/review/${id}`,
        {
          params: {
            offset: offset + 5
          }
        }
      );
      if (!response.data) {
        throw new Error("No data received from server");
      }
      if (response.data.length === 0) {
        alert("모든 리뷰를 보여드렸어요!");
        setMaxReview(true);
      }
      setReviews(prev => [...prev, ...response.data]);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const onLikeClick = async (reviewId: number, index: number) => {
    if (!sessionID) {
      alert("로그인을 해주세요");
      return;
    }
    axios.post("/like/add", { reviewId, sessionID })
      .then((res) => {
        const msg = res.data
        if(msg == "추가") {
          setReviews((prevReviews) => {
            const newReviews = [...prevReviews];
            newReviews[index] = {...newReviews[index], like: newReviews[index].like + 1}
            return newReviews;
          });
        }
        if(msg == "삭제") {
          setReviews((prevReviews) => {
            const newReviews = [...prevReviews];
            newReviews[index] = {...newReviews[index], like: newReviews[index].like - 1}
            return newReviews;
          });
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
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
                  color: currentRating <= (hover || rating) ? "rgba(245, 59, 87, 1.0)" : "#e4e5e9",
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
      {reviews.map((review: reviewForm, index: number) => {
        return (
          <ReviewContainer key={index}>
            <ProfileContainer>
              <RxAvatar size={30} />
              <ProfileInfo>{review.nickName}</ProfileInfo>
              <Rating>&#9733; {review.rating}</Rating>
            </ProfileContainer>
            <Divider />
            <Comment>{review.comment}</Comment>
            <InteractionContainer>
              <InteractionItem type="submit" onClick={() => onLikeClick(review.reviewId, index)}>
                <FaThumbsUp />
                {review.like}
              </InteractionItem>
            </InteractionContainer>
          </ReviewContainer>
        )
      })}
      {
        reviews.length >= 5 && !maxReview ? (<BtnContainer>
          <LoadMoreBtn onClick={loadMoreReview}>더보기</LoadMoreBtn>
        </BtnContainer>) : null
      }
    </Container>
  );
}

export default Review;