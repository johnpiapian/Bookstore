from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = 'Bookstore API'
    APP_ENV: str = 'development'
    MONGODB_URI: str = 'mongodb://localhost:27017'
    DATABASE_NAME: str = 'bookstore'

    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')

# Singleton instance
settings = Settings()