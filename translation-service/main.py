from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.translator import translate_text

app = FastAPI()

# Add CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class TranslationRequest(BaseModel):
    text: str 
    dest: str
    src: str = "en"

@app.post("/translate")
async def translate(request: TranslationRequest):
    try:
        translation = translate_text(
            request.text,
            dest=request.dest,
            src=request.src
        )
        return {"translation": translation}
    except Exception as e:
        return {"error": str(e)} 