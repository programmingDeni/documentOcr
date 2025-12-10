"""OCR Service mit Tesseract"""
import pytesseract
from PIL import Image
from io import BytesIO
from pdf2image import convert_from_bytes

def extract_text(file_bytes: bytes, content_type: str) -> str:
    """Extrahiert Text aus Bild oder PDF."""
    
    if content_type == "application/pdf":
        # PDF zu Bildern konvertieren
        images = convert_from_bytes(file_bytes)
        texts = [pytesseract.image_to_string(img, lang="deu+eng+spa") for img in images]
        return "\n\n".join(texts)
    else:
        # Bild direkt verarbeiten
        image = Image.open(BytesIO(file_bytes))
        return pytesseract.image_to_string(image, lang="deu+eng+spa")