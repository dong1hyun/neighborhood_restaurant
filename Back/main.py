# from typing import List
# from fastapi import FastAPI
# from pydantic import BaseModel
# from konlpy.tag import Okt
# from collections import Counter
# from typing import Union  


# app = FastAPI()

# class Item(BaseModel):
#     name: str
#     description: Union[str, None] = None
#     price: float

# # 한국어 리뷰를 요약하는 함수
# def summarize_review_korean(comment):
#     okt = Okt()
#     nouns = okt.nouns(comment)
#     stop_words = ['은', '는', '이', '가', '을', '를', '하', '아', '것', '들']
#     filtered_nouns = [word for word in nouns if word not in stop_words]
#     top_nouns = Counter(filtered_nouns).most_common(5)
#     summary = ' '.join(word for word, _ in top_nouns)
#     return summary

# # 리뷰 데이터를 받아서 요약하는 함수
# def process_reviews_korean(reviews):
#     summarized_reviews = []
#     for review in reviews:
#         summarized_review = summarize_review_korean(review)
#         summarized_reviews.append(summarized_review)
#     return summarized_reviews

# @app.get("/ais")
# async def summarize_reviews_korean(reviews: List[str]):
#     summarized_reviews = process_reviews_korean(reviews)
#     print("Received review comments:", reviews)  # 요청을 받은 리뷰 데이터 출력
#     return summarized_reviews
