from fastapi import APIRouter

from .user import router as user_router
from .job import router as job_router


router = APIRouter()

router.include_router(user_router, prefix="/user", tags=["user"])
router.include_router(job_router, prefix="/job", tags=["job"])
