const cheerio = require("cheerio");
const axios = require("axios");

// axios로 HTML을 가져오는 함수
module.exports = getHTML = async (placeID) => {
  try {
    return await axios.get(`https://place.map.kakao.com/m/main/v/${placeID}`)
  } catch (error) {
    console.log(error);
  }
}

// getHTML(11547525);

// 파싱
const parsing = async () => {
  // 위에서 추출한 HTML 전체 가져오기
  const html = await getHTML();

  console.log(html)
  // const $ = cheerio.load(html.data);
  // console.log($);
}

// parsing();