from uuid import UUID
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

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


@router.get(
    "/get_one",
    response_model=schemas.JobPostResponse
)
def get_job(id: UUID,
            db: Session = Depends(get_db)):
    return crud.get_job_by_id(db, id)


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


@router.post(
    "/collect"
)
def collect_job(job_id: UUID,
                username: str,
                db: Session = Depends(get_db)):
    return crud.collect_job(db, job_id, username)


@router.post(
    "/resume"
)
def apply_job(job_id: UUID,
              username: str,
              db: Session = Depends(get_db)):
    return crud.apply_job(db, job_id, username)


@router.post(
    "/change_resume_status"
)
def change_resume_status(
        recordId: UUID,
        db: Session = Depends(get_db)):
    return crud.change_resume_status(db, recordId)
