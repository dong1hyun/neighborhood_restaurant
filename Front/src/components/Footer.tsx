import styled from "styled-components"

const Conatiner = styled.div`
display: flex;
flex-direction: column;
background-color: black;
height: 150px;
width: 100%;
margin-top: 100px;

`

const Detail = styled.div`
    color: white;
    margin-left: 10%;
    margin-top: 40px;
`

export default function Footer() {
    return (
        null
        // <Conatiner>
        //     <Detail>developer: 임동현, 최성준 | 깃허브 주소: https://github.com/dong1hyun/neighborhood_restaurant</Detail>
        //     <Detail>문의: k886777@naver.com</Detail>
        // </Conatiner>
    )
}