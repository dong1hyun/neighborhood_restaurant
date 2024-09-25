import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FcPortraitMode } from "react-icons/fc";

const Container = styled.div`
    color: black;
    padding-top: 200px;
    padding-left: 20%;
    padding-right: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 700px) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

const Title = styled.div`
    font-size: xx-large;
    font-weight: bold;
    margin-bottom: 20px;
`;

const TitleDivider = styled.div`
    border-bottom: 2px solid gray;
    margin: 20px 0;
    width: 100%;
`;

const SubTitle = styled.div`
    font-size: large;
    margin-bottom: 20px;
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
`;

const MetaInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: medium;
    margin-bottom: 20px;
    border: 1px solid #d3d3d3;
    padding: 10px;
    border-radius: 5px;
    background-color: #f5f5f5;
`;

const Author = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Description = styled.div`
    width: 100%;
    line-height: 1.5;
    font-size: medium;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

interface qnaForm {
    qnaId: number;
    question: string;
    answer: string;
    createdAt: Date;
}

export default function QnA() {
    const { id } = useParams();
    const [qna, setQnA] = useState<qnaForm | null>(null);

    const fetchQnA = async () => {
        const response = await axios.get(`/qna/${id}`);
        setQnA(response.data);
    };

    useEffect(() => {
        fetchQnA();
    }, []);

    const createAt = new Date(qna?.createdAt ?? "");
    const date = `${createAt?.getFullYear()}/${(createAt?.getMonth() + 1)}/${createAt.getDate()} ${createAt.getHours()}:${createAt.getMinutes()}`
    return (
        <Container>
            <Title>자주 묻는 질문</Title>
            <TitleDivider />
            <SubTitle>{qna?.question}</SubTitle>
            <MetaInfo>
                <Author>
                    <FcPortraitMode />
                    <AuthorInfo>운영자</AuthorInfo>
                </Author>
                <div>{date} 작성됨</div>
            </MetaInfo>
            <Description>{qna?.answer}</Description>
        </Container>
    );
}