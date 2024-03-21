    // import React, { useState, ChangeEvent, FormEvent } from 'react';
    // import { AnimatePresence, motion } from "framer-motion"
    // import styled from "styled-components"
    // import axios from 'axios'; // axios import 추가

    // const RegisterContainer = styled(motion.div)`
    //     position: absolute;
    //     z-index: 1;
    //     top: 300px;
    //     text-align: center;
    //     background-color: whitesmoke;
    //     width: 400px;
    //     height: 200px;
    //     background-color: rgba(255, 255, 255, 1);
    //     border-radius: 40px;
    //     position: absolute;
    //     top: 200px;
    //     left: 0px;
    //     right: 0px;
    //     margin: 0 auto;
    //     box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
        
    // `
    // const boxVariants = {
    //     initial: {
    //         opacity: 0,
    //         scale: 0
    //     },
    //     visible: {
    //         opacity: 1,
    //         scale: 1
    //     },
    //     leaving: {
    //         opacity: 0,
    //         scale: 0
    //     }
    // }

    // export default function RegisterBox() {
    //     const [formData, setFormData] = useState({ username: '', password: '' });

    //     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //         e.preventDefault(); // 폼 기본 제출 동작 방지
    //         try {
    //             const response = await axios.post('/register', formData); // URL 수정
    //             console.log(response.data); // 서버에서 받은 응답 데이터
    //             // 회원가입 성공 처리 코드 추가
    //         } catch (error) {
    //             console.error('회원가입 중 오류가 발생했습니다:', error);
    //             // 회원가입 실패 처리 코드 추가
    //         }
    //     };
        

    //     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //         setFormData({ ...formData, [e.target.name]: e.target.value });
    //     };

    //     return (
    //         <RegisterContainer
    //             variants={boxVariants}
    //             initial="initial"
    //             animate="visible"
    //             exit="leaving"
    //         >
    //             <form onSubmit={handleSubmit}>
    //                 <label>
    //                     아이디:
    //                     <input
    //                         type="text"
    //                         name="username"
    //                         value={formData.username}
    //                         onChange={handleChange}
    //                     />
    //                 </label>
    //                 <br />
    //                 <label>
    //                     비밀번호:
    //                     <input
    //                         type="password"
    //                         name="password"
    //                         value={formData.password}
    //                         onChange={handleChange}
    //                     />
    //                 </label>
    //                 <br />
    //                 <button type="submit">회원가입</button>
    //             </form>
    //         </RegisterContainer>
    //     );
    // }
    import React, { useState, ChangeEvent, FormEvent } from 'react';
    import { AnimatePresence, motion } from "framer-motion"
    import styled from "styled-components"
    import axios from 'axios'; // axios import 추가
    
    const RegisterContainer = styled(motion.div)`
        position: absolute;
        z-index: 1;
        top: 300px;
        text-align: center;
        background-color: whitesmoke;
        width: 400px;
        height: 200px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 40px;
        position: absolute;
        top: 200px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    `
    
    const boxVariants = {
        initial: {
            opacity: 0,
            scale: 0
        },
        visible: {
            opacity: 1,
            scale: 1
        },
        leaving: {
            opacity: 0,
            scale: 0
        }
    }
    
    export default function RegisterBox() {
        const [formData, setFormData] = useState({ id: '', password: '' });
    
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // 폼 기본 제출 동작 방지
            try {
                const response = await axios.post('/register', formData); // URL 수정
                console.log(response.data); // 서버에서 받은 응답 데이터
                // 회원가입 성공 처리 코드 추가
            } catch (error) {
                console.error('회원가입 중 오류가 발생했습니다:', error);
                // 회원가입 실패 처리 코드 추가
            }
        };
    
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        return (
            <RegisterContainer
                variants={boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
            >
                <form onSubmit={handleSubmit}>
                    <label>
                        아이디:
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        비밀번호:
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button type="submit">회원가입</button>
                </form>
            </RegisterContainer>
        );
    }
    