from pydantic import BaseModel


class MessageRequest(BaseModel):
    message: str


class IntentScore(BaseModel):
    intent: str
    confidence: float


class ClassificationResponse(BaseModel):
    message: str
    intent: str
    confidence: float
    route: str
    fallback: bool
    scores: list[IntentScore]