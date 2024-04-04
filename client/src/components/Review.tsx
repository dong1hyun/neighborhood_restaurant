// // Review.tsx 파일

// import React, { useState } from "react";
// import styled from "styled-components";
// import axios from "axios";

// // Review 컴포넌트의 props에 restaurantID와 onSubmit을 추가합니다.
// interface ReviewProps {
//   restaurantID: string;
//   onSubmit: () => void;
// }

// const Container = styled.div`
//   color: white;
//   margin: 30px;
// `;

// const Title = styled.div`
//   margin: 10px;
// `;

// const ReviewContainer = styled.div`
//   border: solid 1px white;
//   border-radius: 5px;
//   margin: 20px;
//   font-size: 30px;
//   height: 100%;
// `;

// const Rating = styled.div`
//   margin: 10px;
// `;

// const Comment = styled.div`
//   margin: 10px;
// `;

// const ReviewForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const SubmitButton = styled.button`
//   margin-top: 10px;
// `;

// const Review: React.FC<ReviewProps> = ({ restaurantID, onSubmit }) => {
//   const [rating, setRating] = useState<number>(0);
//   const [comment, setComment] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const loggedInUserId = sessionStorage.getItem('userId'); // 세션 스토리지에서 로그인 된 사용자 id 가져오기
//       // 리뷰를 서버로 전송하여 데이터베이스에 저장
//       await axios.post("/submitReview", {
//         restaurantID,
//         rating,
//         comment,
//         userID: loggedInUserId, // 세션에 저장된 로그인 ID를 함께 전달
//       });
//       // 리뷰 제출 후 입력 폼 초기화
//       setRating(0);
//       setComment("");
//       // 부모 컴포넌트로부터 전달받은 onSubmit 콜백 호출
//       onSubmit();
//     } catch (error) {
//       console.error("리뷰 제출 에러:", error);
//     }
//   };

//   return (
//     <Container>
//       <Title>방문자 평가</Title>
//       <ReviewContainer>
//         <Rating>{rating}</Rating>
//         <Comment>{comment}</Comment>
//       </ReviewContainer>
//       <ReviewForm onSubmit={handleSubmit}>
//         <span style={{ fontSize: "15px" }}>리뷰를 작성해보세요!</span>
//         <br />
//         <input
//           type="number"
//           placeholder="평점을 입력하세요"
//           min="0"
//           max="5"
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//         />
//         <br />
//         <textarea
//           placeholder="리뷰를 작성하세요"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//         <SubmitButton type="submit">리뷰 제출</SubmitButton>
//       </ReviewForm>
//     </Container>
//   );
// };

// export default Review;
