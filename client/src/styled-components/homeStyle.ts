import { motion } from "framer-motion"
import styled from "styled-components"

export const Container = styled.div`
    position: relative;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 30px;
    background-color: whitesmoke;
    border-radius: 10px;
    height: 600px;
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
`

export const Rating = styled.div`
    position: absolute;
    font-size: 18px;
    top: 35px;
    right: 36px;
    background-color: rgba(0,0,0,1);
    border-radius: 10px;
    padding: 3px;
    color: white;
`

export const PlaceImg = styled(motion.img)`
    margin-top: 30px;
    background-color: white;
    width:80%;
    height: 250px;
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

export const PlaceTitle = styled(motion.div)`
    position: absolute;
    width: 60%;
    height: 40px;
    bottom: -10px;
    color: white;
    font-size: 20px;
    border-radius: 5px;
    background-color: rgba(178, 178, 178, 0.7);
    left: 20%;
    word-wrap: break-word;
`

export const NextBtn = styled.img`
    width: 30px;
    position: absolute;
    right: 0;
    top: 50%;
`

export const PrevBtn = styled.img`
    width: 30px;
    position: absolute;
    top: 50%;
`