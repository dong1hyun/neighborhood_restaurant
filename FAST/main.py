from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter
from typing import Union  

# 긍정적, 부정적, 중립적으로 거주자 음식점 평가란 만들어서 표시 해주는 역할로 사용 할 예정입니다. 파이썬 리뷰 감성분석 + 시각화

app = FastAPI()


class DataRequest(BaseModel):
    reviews: List[str]  # 리뷰 데이터를 문자열 리스트로 받음

class Response(BaseModel):
    success: bool
    summary: Union[str, None] = None
    sentiment: Union[str, None] = None

# 간단한 감성 사전 (하드코딩된 예제)
positive_words = ['좋아요', '행복하다', '기쁘다', '훌륭하다', '최고', '또 가고 싶어요', '맛집']
negative_words = ['나쁘다', '불행하다', '슬프다', '형편없다', '최악', '별로']

@app.post("/ais", response_model=Response)
async def summarize_reviews(request: DataRequest):
    # 클라이언트로부터 받은 리뷰 데이터
    review_data = request.reviews
    
    print("Received reviews:", review_data)

    # 리뷰 데이터 처리 및 요약
    okt = Okt()
    all_nouns = []
    sentiment_score = 0

    for review in review_data:
        nouns = okt.nouns(review)  # 리뷰에서 명사 추출
        all_nouns.extend(nouns)

        # 감성 분석
        for word in okt.morphs(review):
            if word in positive_words:
                sentiment_score += 1
            elif word in negative_words:
                sentiment_score -= 1

    counter = Counter(all_nouns)
    most_common_nouns = counter.most_common(10)  # 가장 빈도 높은 상위 10개의 명사 추출

    summary = ", ".join([word for word, freq in most_common_nouns])

    # 감성 판단
    if sentiment_score > 0:
        sentiment = "긍정적"
    elif sentiment_score < 0:
        sentiment = "부정적"
    else:
        sentiment = "중립적"

    # 성공 응답과 요약 및 감성 데이터를 반환
    return {"success": True, "summary": summary, "sentiment": sentiment}

# uvicorn main:app --reload --host 0.0.0.0 --port 4000

