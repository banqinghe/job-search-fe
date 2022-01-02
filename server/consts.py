from pathlib import Path
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:2000126ban@127.0.0.1/job"
STORAGE_BASE_URL = "http://0.0.0.0:8001"
STORAGE_DIR = Path(__file__).parent / "storage"
