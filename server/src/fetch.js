const cheerio = require("cheerio");
const axios = require("axios");

// axios로 HTML을 가져오는 함수
module.exports = getHTML = async (placeID) => {
  try {
    await axios.get(`https://place.map.kakao.com/m/main/v/${placeID}`)
      .then(res => {
        // console.log(res.data.basicInfo.openHour.realtime.currentPeriod.timeList[0])
        return res.data;
      })
  } catch (error) {
    console.log(error);
  }
}

// 파싱
const parsing = async () => {
  // 위에서 추출한 HTML 전체 가져오기
  const html = await getHTML();

  // console.log(html)
  // const $ = cheerio.load(html.data);
  // console.log($);
}

parsing();