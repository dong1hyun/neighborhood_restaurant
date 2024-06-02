import styled from "styled-components";
import { Img } from "../../styled-components/homeStyle";

const InfoContainer = styled.div`
    position: absolute;
    width: 80%;
    height: 150px;
    border-radius: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
    color: white;
    font-size: 50px;
    font-weight: 700;
    display: flex;
    align-items: center;
    line-height: 150%;
`;

const Button = styled.button`
    position: relative;
    width: 100px;
    height: 100px;
    background-color: orange;
    z-index: 2;
`

export default function Second() {
    return <>
        <Img
            src={`${process.env.PUBLIC_URL}home/meat.jpg`}
        />
        <InfoContainer>
            로그인을 하고 동네인증을 하면 더 많은 기능을 이용할 수 있습니다!
        </InfoContainer>
        <Button>test</Button>
    </>
}