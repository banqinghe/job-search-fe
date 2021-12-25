from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

import models
import schemas
import crud
from database import get_db

router = APIRouter()


@router.get(
    "/get_all_post_job",
    response_model=list[schemas.jobPosition]
)
def get_all_post_job(username: str,
                     db: Session = Depends(get_db)):
    db_jobs = crud.get_all_post_job(db, username)
    return db_jobs
