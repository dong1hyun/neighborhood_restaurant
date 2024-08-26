import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    min-height: 100vh;
    background-color: #f7f9fc;
    color: #333;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
`;

const Title = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-top: 100px;
`;

const TitleDivider = styled.div`
    border-bottom: 2px solid #bdc3c7;
    margin-top: 20px;
    margin-bottom: 40px;
    width: 350px;
`;

const Divider = styled.div`
    border-bottom: 1px solid #ecf0f1;
    width: 100%;
`;

const NoticeAddForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 500px;
    margin: 30px 0;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticeInput = styled.input`
    border: 1px solid #bdc3c7;
    padding: 10px;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #3498db;
    }
`;

const NoticeDescription = styled.textarea`
    border: 1px solid #bdc3c7;
    padding: 10px;
    border-radius: 8px;
    font-size: 1rem;
    height: 150px;
    resize: none;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #3498db;
    }
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #3e3e3e;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;

const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 600px;
`;

const Notice = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #ecf0f1;
        transform: translateY(-2px);
    }
`;

const CreatedDate = styled.div`
    color: #f39c12
`

interface noticeForm {
    title: string;
    description: string;
}

interface NewNoticeForm {
    id: number;
    title: string;
    createdAt: Date;
}

export default function NoticeList() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<noticeForm>();
    const [notices, setNotice] = useState<NewNoticeForm[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const onValid = async (data: noticeForm) => {
        await axios.post("/notice/add", data);
        reset();
        fetchNotice();
    };

    const fetchNotice = async () => {
        const response = await axios.get("/notice/list");
        const notices = response.data;
        setNotice(notices);
    };

    const getAdmin = async () => {
        const session = sessionStorage.getItem('sessionID');
        if (session) {
            const admin = await axios.get('/admin', {
                params: {
                    session
                }
            });
            if (admin.data.id === "admin") {
                setIsAdmin(true);
            }
        }
    }

    useEffect(() => {
        // fetchNotice();
        getAdmin();
        setNotice([{ id: 1, title: "testdddd", createdAt: new Date }, { id: 1, title: "test", createdAt: new Date }, { id: 1, title: "test", createdAt: new Date }, { id: 1, title: "testdddd", createdAt: new Date }, { id: 1, title: "testdddd", createdAt: new Date }, { id: 1, title: "testdddd", createdAt: new Date }])

    }, []);

    return (
        <Container>
            <Title>공지사항</Title>
            <TitleDivider />
            {
                isAdmin ? <NoticeAddForm onSubmit={handleSubmit(onValid)}>
                    <NoticeInput {...register("title")} placeholder="제목" required />
                    <NoticeDescription {...register("description")} placeholder="내용" required />
                    <SubmitButton type="submit">완료</SubmitButton>
                </NoticeAddForm>
                    : null}
            <NoticeContainer>
                {notices.map((notice, idx) => (
                    <div key={notice.id}>
                        {idx > 0 && <Divider />}
                        <Notice
                            onClick={() => navigate(`/noticeList/${notice.id}`)}
                            whileHover={{ color: "#3498db" }}
                        >
                            <div>{notice.title}</div>
                            <CreatedDate>{new Date(notice.createdAt).toLocaleDateString()}</CreatedDate>
                        </Notice>
                    </div>
                ))}
            </NoticeContainer>
        </Container>
    );
}
