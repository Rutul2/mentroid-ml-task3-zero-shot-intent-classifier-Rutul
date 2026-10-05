from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import MessageRequest, ClassificationResponse
from classifier import intent_classifier

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message" : "Api is Running..."
    }

@app.post(
    "/classify",
    response_model=ClassificationResponse
)
def classify_message(request: MessageRequest):
    result = intent_classifier.classify(
        request.message
    )

    return{
        "message": request.message,
        **result
    }