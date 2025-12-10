"""OCR Service mit LLM (OpenRouter/Mistral)"""
import requests
import base64
from io import BytesIO
from PIL import Image
from pdf2image import convert_from_bytes
from app.config import settings


def extract_text_with_llm(file_bytes: bytes, content_type: str) -> str:
    """Extrahiert Text mit Mistral Vision über OpenRouter."""
    
    # Bei PDF: Erste Seite zu Bild konvertieren
    if content_type == "application/pdf":
        images = convert_from_bytes(file_bytes, dpi=200)
        # Alle Seiten verarbeiten
        all_texts = []
        for img in images:
            text = _process_image_with_llm(img)
            all_texts.append(text)
        return "\n\n---\n\n".join(all_texts)
    else:
        image = Image.open(BytesIO(file_bytes))
        return _process_image_with_llm(image)


def _process_image_with_llm(image: Image.Image) -> str:
    """Verarbeitet ein einzelnes Bild mit dem LLM."""
    
    # Bild zu Base64 konvertieren
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    base64_image = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY_AMAZON}",
            "Content-Type": "application/json",
        },
        json={
            "model": "amazon/nova-2-lite-v1:free",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Extrahiere den gesamten Text aus diesem Dokument. "
                                    "Behalte die Formatierung und Struktur bei. "
                                    "Gib NUR den extrahierten Text zurück, keine Erklärungen oder Kommentare."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ]
        }
    )
    
    if response.status_code != 200:
        raise Exception(f"OpenRouter API error: {response.text}")
    
    result = response.json()
    return result["choices"][0]["message"]["content"]