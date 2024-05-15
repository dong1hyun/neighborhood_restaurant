from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from konlpy.tag import Okt
from collections import Counter
from typing import Union  


app = FastAPI()


class DataRequest(BaseModel):
    reviews: List[str]  # 리뷰 데이터를 문자열 리스트로 받음

class Response(BaseModel):
    success: bool

@app.post("/ais", response_model=Response)
async def summarize_reviews(request: DataRequest):
    # 클라이언트로부터 받은 리뷰 데이터
    review_data = request.reviews
    
    print("Received reviews:", review_data)

    # 리뷰 데이터 처리 및 요약하는 로직을 추가할 수 있습니다.
    # 여기서는 간단히 성공 응답을 반환합니다.
    return {"success": True, "review_data": review_data}

# uvicorn main:app --reload --host 0.0.0.0 --port 4000