import { motion } from "framer-motion"
import styled from "styled-components"
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

export const Container = styled.div`
    position: relative;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 30px;
    background-color: whitesmoke;
    border-radius: 10px;
    height: 550px;
    width: 90%;
    overflow: hidden;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);
    @media screen and (max-width: 700px){
        height: 900px;
    }
`

export const Slider = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  text-align: center;
  @media screen and (max-width: 700px){
    grid-template-columns: repeat(2, 1fr);
  }
`
export const PlaceBox = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
`

export const PlaceImg = styled(motion.img)`
    margin-top: 35px;
    background-color: white;
    width: 60%;
    height: 180px;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    color: black;
    box-shadow: 3px 3px 3px rgba(0, 0, 0,);
    cursor: pointer;
    @media screen and (max-width: 700px){
        height: 170px;
    }
`

export const Rating = styled.div`
    position: absolute;
    font-size: 18px;
    top: 40px;
    right: 70px;
    background-color: rgba(0,0,0,1);
    border-radius: 10px;
    padding: 3px;
    color: white;
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
`

export const PlaceTitle = styled(motion.div)`
    position: absolute;
    width: 60%;
    height: 40px;
    color: black;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    left: 20%;
    /* word-wrap: break-word; */
    font-family: "Noto Serif KR", serif;
    font-optical-sizing: auto;
    font-style: normal;
`

export const EllipsisText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const BackArrow = styled(IoIosArrowBack)`
    position: absolute;
    top: 50%;
    scale: 1.5;
    transition: transform 0.3s ease; /* 애니메이션을 부드럽게 하기 위해 transition 추가 */
    &:hover {
        transform: scale(1.7);
    }
`;

export const ForwardArrow = styled(IoIosArrowForward)`
    position: absolute;
    right: 0;
    top: 50%;
    scale: 1.5;
    transition: transform 0.3s ease; /* 애니메이션을 부드럽게 하기 위해 transition 추가 */
    &:hover {
        transform: scale(1.7);
    }
`
export const Img = styled(motion.img)`
    width: 100%;
    height: 100%;
    /* opacity: 0.7; */
    object-fit: cover; 
`;