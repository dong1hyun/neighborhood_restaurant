import axios from "axios";
const cheerio = require('cheerio');

export default async function getNews(placeID:any) {
    const html = await axios.get(
        `https://place.map.kakao.com/m/${placeID}`
    );
    console.log(html)
    const $ = cheerio.load(html.data);
    let smp = {};
    console.log($(".txt_operation").text())
}