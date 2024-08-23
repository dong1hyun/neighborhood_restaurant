import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    height: 500px;
    color: black;
    padding-top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    font-size: xx-large;
`

const TitleDivider = styled.div`
    border-bottom: 1px solid gray;
    margin: 30px;
    width: 350px;
`

const Divider = styled.div`
    border-bottom: 1px solid gray;
    width: 100%;
`

const NoticeAddForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 50px;
`

const Notice_title = styled.input`
    border-radius: 10px;
    padding-left: 10px;
`

const Notice_des = styled.input`
    height: 150px;
    padding-left: 10px;
    border-radius: 20px;
`

const Submit_btn = styled.button`
    padding: 5px;
    /* background-color: blue; */
    border-radius: 10px;
`

const NoticeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 250px;
    padding-bottom: 80px;
`

const Notice = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font: bold;
    cursor: pointer;
`

interface noticeForm {
    title: string,
    description: string
}

interface NewNoticeForm {
    id: number
    title: string
    createdAt: Date
}

export default function NoticeList() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<noticeForm>();
    const [notices, setNotice] = useState<NewNoticeForm[]>([]);
    const onValid = async (data: noticeForm) => {
        const result = await axios.post("/notice/add", data);
        // console.log(result.data.message);
        reset();
        fetchNotice();
    }

    const fetchNotice = async () => {
        const response = await axios.get("/notice/list");
        const notices = response.data;
        console.log(notices)

        setNotice(notices);
    }

    useEffect(() => {
        fetchNotice();
        // setNotice([{ id: 1, title: "testdddd", createdAt: new Date }, { id: 1, title: "test", createdAt: new Date }, { id: 1, title: "test", createdAt: new Date }, { id: 1, title: "testdddd", createdAt: new Date }, { id: 1, title: "testdddd", createdAt: new Date },{ id: 1, title: "testdddd", createdAt: new Date }])
    }, []);
    return <Container>
        <Title>공지사항</Title>
        <TitleDivider />
        <NoticeAddForm onSubmit={handleSubmit(onValid)}>
            <Notice_title {...register("title")} placeholder="제목" required />
            <Notice_des {...register("description")} placeholder="내용" required />
            <Submit_btn type="submit">완료</Submit_btn>
        </NoticeAddForm>
        <NoticeContainer>
            {notices.map((notice, idx) => (
                <>
                    {idx === 0 ? null : <Divider />}
                    <Notice onClick={() => navigate(`/noticeList/${notice.id}`)} whileHover={{color: "#bdc3c7"}}>
                        <div>
                            {notice.title}
                        </div>
                        <div>{`${new Date(notice.createdAt).getFullYear()}/${new Date(notice.createdAt).getMonth() + 1}/${new Date(notice.createdAt).getDay()}`}</div>
                    </Notice>
                </>
            ))}
        </NoticeContainer>
    </Container>
}