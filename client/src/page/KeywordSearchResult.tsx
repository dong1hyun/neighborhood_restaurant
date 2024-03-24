import { useSearchParams } from "react-router-dom";
import { KakaoMap } from "../components/KakaoMap";
import { searchPlaces } from "../function/keywordSearch";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { keyword } from "../atom";
import React from 'react';
import styled from "styled-components";


const Keyword = styled.div`
    font-family: "Nanum Gothic Coding", monospace;
    font-weight: 400;
    font-style: normal;
    font-size: 30px;
    margin: 20px;
`

export function KeywordSearchResult() {
    const [searchParams, _] = useSearchParams();
    const [searchWord, setSearchWord] = useRecoilState(keyword);
    
    useEffect(() => {
        searchPlaces(searchParams.get("keyword") + '');
        setSearchWord(searchParams.get("keyword") + '');
    }, [searchWord]);
    return (
        <div>
            <Keyword>{searchWord} 검색결과 </Keyword>
            <KakaoMap />
        </div>
    );
}