import axios from "axios";
import { useParams } from "react-router-dom";
import getNews from '../function/crawl'
import { useEffect } from "react";


function Place() {
    // const params = useParams();

    // getNews(params.id)
    // useEffect(() => {
    //     axios.get('https://place.map.kakao.com/8029124')
    //     .then(res => {
    //       console.log(res.data)
    //     })
    // }, [])
    return (
        <div>
            Place
        </div>
    )
}

export default Place;