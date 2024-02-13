import { useSearchParams } from "react-router-dom";
import { KakaoMap } from "./components/KakaoMap";
import { searchPlaces } from "./Search";



export function SearchResult() {
    const [searchParams, _] = useSearchParams();
    // console.log(searchParams.get);
    let keyword = searchParams.get("keyword");
    searchPlaces(keyword + '');

    return (
        <div>
            <KakaoMap />
        </div>
    );
}