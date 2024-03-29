import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

interface MyLocationBoxProps {
    userId: string; // 사용자 id
}

const Place_Img = styled.img`
    margin: 0 auto;
    margin-top: 40px;
    width: 80%;
    height: 300px;
    border-radius: 10px;
`;

export default function MyLocationBox({ userId }: MyLocationBoxProps) {
    const [coordinates, setCoordinates] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });

    const handleSaveLocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setCoordinates({ x: longitude, y: latitude });
                
                await axios.post('/location', { id: userId, x: longitude, y: latitude });
                alert('위치가 성공적으로 저장되었습니다.');
            });
        } catch (error) {
            console.error('위치 저장 중 오류가 발생했습니다:', error);
            alert('위치를 저장하는 도중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <button onClick={handleSaveLocation}>내 위치 저장</button>
            <p>현재 위치 좌표: {coordinates.x}, {coordinates.y}</p>
        </div>
    );
}
