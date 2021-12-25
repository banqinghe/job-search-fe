from uuid import UUID
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
    return crud.get_all_post_job(db, username)


@router.post(
    "/post_job",
    response_model=schemas.JobPostResponse
)
def post_job(job: schemas.JobPostRequest,
             username: str,
             db: Session = Depends(get_db)):
    return crud.post_job(db, job, username)


@router.patch(
    "/change_job"
)
def change_job(job: schemas.JobPostResponse,
               db: Session = Depends(get_db)):
    return crud.change_job(db, job)


@router.delete(
    "/delete_job"
)
def delete_job(job_id: UUID,
               db: Session = Depends(get_db)):
    return crud.delete_job(db, job_id)
