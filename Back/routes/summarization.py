from konlpy.tag import Okt
from collections import Counter
import nltk

# NLTK 자연어 처리 라이브러리 초기화
nltk.download('punkt')
nltk.download('stopwords')

# 한국어 리뷰를 요약하는 함수
def summarize_review_korean(comment):
    # 형태소 분석기 초기화
    okt = Okt()

    # 형태소 분석 및 명사 추출
    nouns = okt.nouns(comment)

    # 불용어 제거
    stop_words = ['은', '는', '이', '가', '을', '를', '하', '아', '것', '들']
    filtered_nouns = [word for word in nouns if word not in stop_words]

    # 가장 빈도가 높은 명사 5개 선택
    top_nouns = Counter(filtered_nouns).most_common(5)

    # 요약 생성
    summary = ' '.join(word for word, _ in top_nouns)

    return summary

# 리뷰 데이터를 받아서 요약하는 함수
def process_reviews_korean(reviews):
    summarized_reviews = []
    for review in reviews:
        summarized_review = summarize_review_korean(review)
        summarized_reviews.append(summarized_review)
    return summarized_reviews

# 예시 한국어 데이터
reviews_korean = [
    "음식 맛이 좋고 분위기도 좋습니다.",
    "서비스가 친절하고 음식이 맛있습니다.",
    "가격 대비 음식의 질이 좋지 않았습니다."
]

# 데이터 처리 및 요약 (한국어)
summarized_reviews_korean = process_reviews_korean(reviews_korean)
print("Summarized Reviews (Korean):", summarized_reviews_korean)
