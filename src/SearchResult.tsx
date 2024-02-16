import { useSearchParams } from "react-router-dom";
import { KakaoMap } from "./components/KakaoMap";
import { searchPlaces } from "./Search";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { keyword } from "./atom";



export function SearchResult() {
    const [searchParams, _] = useSearchParams();
    const [searchWord, setSearchWord] = useRecoilState(keyword);
    
    useEffect(() => {
        searchPlaces(searchParams.get("keyword") + '');
        setSearchWord(searchParams.get("keyword") + '');
        console.log("search:", searchWord);
    }, [searchWord]);
    return (
        <div>
            <KakaoMap />
        </div>
    );
}