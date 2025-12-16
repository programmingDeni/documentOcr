"""
Application Configuration
Lädt Einstellungen aus Environment Variables
"""

from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    """Application Settings mit Pydantic"""
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@db:5432/documentocr"
    
    # CORS - Frontend URLs die zugreifen dürfen
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Tesseract
    TESSERACT_CMD: str = "/usr/bin/tesseract"
    
    # Upload
    UPLOAD_DIR: str = "/app/uploads"
    MAX_FILE_SIZE: int = 10485760  # 10MB

    # OpenRouter wird aus .env geladen
    OPENROUTER_API_KEY_AMAZON: str = ""

    # DB restart ? 
    DB_DROP_ON_START: bool = os.getenv("DB_DROP_ON_START", "false").lower() == "true"
    
    class Config:
        env_file = ".env"
        extra = "ignore"


# Singleton Settings Instance
settings = Settings()