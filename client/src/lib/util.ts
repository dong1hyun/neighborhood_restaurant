import { SyntheticEvent } from "react";

export const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `${process.env.PUBLIC_URL}/home/alt_img.jpg`; // 이미지 로드 실패 시 대체 이미지로 교체
};