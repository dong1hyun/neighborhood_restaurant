from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from konlpy.tag import Okt  #한국어 자연어처리
from collections import Counter
from typing import Union  

# 긍정적, 부정적, 중립적으로 거주자 음식점 평가란 만들어서 표시 해주는 역할로 사용 할 예정입니다. 파이썬 리뷰 감성분석 + 시각화(텍스트 마이닝)

app = FastAPI()


class DataRequest(BaseModel):
    reviews: List[str]  # 리뷰 데이터를 문자열 리스트로 받음

class Response(BaseModel):
    success: bool
    summary: Union[str, None] = None
    sentiment: Union[str, None] = None

# 간단한 감성 사전
positive_words = [
    '맛있다', '신선하다', '다양하다', '친절하다', '깨끗하다', '훌륭하다', '만족스럽다',
    '편안하다', '빠르다', '실망시키지 않다', '맛집', '인기 많다', '대단하다', '고급스럽다',
    '만족스럽다', '편리하다', '안심하다', '즐겁다', '활기차다', '특별하다', '착하다',
    '감사하다', '편안하다', '활발하다', '맛있다', '신선하다', '다양하다', '훌륭하다',
]

# '만족스럽다', '편안하다', '친절하다', '깨끗하다', '빠르다', '안심하다', '즐겁다',
#     '편리하다', '대단하다', '고급스럽다', '만족스럽다', '편안하다', '편리하다', '새로움',
#     '신선함', '친절함', '높은 품질', '편안함', '만족스러움', '고급스러움', '환영함',
#     '유쾌함', '감동적', '환상적인', '최고의', '믿을만한', '최상급의', '이상적인', '최상의',
#     '멋진', '유명한', '최상급', '이상적인', '최고의', '최고급', '최상의', '최고봉의',
#     '뛰어난', '우수한', '감탄할만한', '최상급', '일류의', '최고수준의', '이상적인', '탁월한',
#     '최상급의', '최상의', '환상적인', '최상급의', '최고봉의', '최상급', '최상의', '최고급의',
#     '최상급', '놀라운', '최상급', '최고의', '최고급의', '최상의', '뛰어난', '좋아요'

negative_words = [
    '나쁘다', '불편하다', '실망하다', '맛없다', '불쾌하다', '더러움', '서비스 불만족',
    '불친절함', '느리다', '불편함', '혼잡함', '노골적인', '짜증나다', '냄새', '노골적인',
    '실망', '부족함', '불쾌', '불만족', '부정적', '포장 불량', '가격이 비싸다', '시끄럽다',
    '비싼 가격', '부실한 서비스', '혼란스럽다', '품질 문제', '잡음', '답답함', '쓰레기', 
]

# '서비스 불만', '아쉬움', '최악', '실망', '부정적', '맛없다', '불편', '혼란', '부족',
#     '소음', '불쾌', '비싼', '포장 문제', '불만', '부정', '답답', '시끄러움', '품질 저하',
#     '실패', '불만족스러운', '불편함', '부정적인', '불편한', '어수선함', '실망스러운', '안좋은',
#     '불만족', '부정적', '언제나', '아쉬운', '낮은 품질', '비싼 가격', '잡음', '지루함',
#     '불만', '지루한', '부정', '답답한', '별로', '불량', '불친절', '느림', '낮은 수준의',
#     '실망스럽다', '낮은 서비스 수준', '실패', '불만족스러운', '불편함', '부정적인', '불편한',
#     '어수선함', '실망스러운', '안좋은', '불만족', '부정적', '언제나', '아쉬운', '낮은 품질',
#     '비싼 가격', '잡음', '지루함', '불만', '지루한', '부정', '답답한', '별로', '불량',
#     '불친절', '느림', '낮은 수준의'


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

