from pathlib import Path

SQLALCHEMY_DATABASE_URL = "postgresql://localhost/job"
STORAGE_BASE_URL = "http://localhost:3000"
STORAGE_DIR = Path(__file__).parent / "storage"
