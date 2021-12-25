from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

import models
import schemas
import crud
from database import get_db

router = APIRouter()


@router.get(
    "/get_all_post_job",
    response_model=list[schemas.JobPostResponse]
)
def get_all_post_job(username: str,
                     db: Session = Depends(get_db)):
    db_jobs = crud.get_all_post_job(db, username)
    return db_jobs


@router.post(
    "/post_job",
    response_model=schemas.JobPostResponse
)
def post_job(job: schemas.JobPostRequest,
             username: str,
             db: Session = Depends(get_db)):
    db_job = crud.post_job(db, job, username)
    return db_job
