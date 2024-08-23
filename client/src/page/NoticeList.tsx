import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
    height: 500px;
    color: black;
    /* font-size: 300px; */
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const NoticeAddForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
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
`

const Notice = styled.div`
    
`

interface noticeForm {
    title: string,
    description: string
}

interface NewNoticeForm {
    id: number
    title: string
    description: string
    createAt: Date
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
        const response = await axios.get("/notice");
            const notices = response.data;
            console.log(notices)
            
            setNotice(notices);
    }

    useEffect(() => {
        fetchNotice();
        // setNotice([{title:"test", description: "aaaaaaaaa"}, {title:"test", description: "aaaaaaaaa"}, {title:"test", description: "aaaaaaaaa"}])
    }, []);
    return <Container>
        <NoticeAddForm onSubmit={handleSubmit(onValid)}>
            <Notice_title {...register("title")} placeholder="제목" required />
            <Notice_des {...register("description")} placeholder="내용" required />
            <Submit_btn type="submit">완료</Submit_btn>
        </NoticeAddForm>
        <NoticeContainer>
            {notices.map((notice, idx) => (
                <div>
                    <Notice onClick={() => navigate(`notice/${notice.id}`)}>
                        {notice.title}
                    </Notice>
                    {`${new Date(notice.createAt).getFullYear()}/${new Date(notice.createAt).getMonth() + 1}/${new Date(notice.createAt).getDay()}`}
                </div>
            ))}
        </NoticeContainer>
    </Container>
}