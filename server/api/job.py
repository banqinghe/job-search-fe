from typing import Optional
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
            username: str,
            db: Session = Depends(get_db)):
    db_job = crud.get_job_by_id(db, id)
    db_user = crud.get_user_by_username(db, username)
    if db_user.role == "recruiter":
        return db_job
    else:
        ret = schemas.JobPostResponse(**db_job.__dict__)
        ret.resumed = crud.record_exists(db, username, db_job.id)
        ret.collected = crud.star_exists(db, username, db_job.id)
        return ret;


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


@router.get(
    "/get_all_resume_receive",
    response_model=list[schemas.RecruiterJobRecord]
)
def get_recruiter_records(
        username: str,
        pageSize: int,
        pageNumber: int,
        db: Session = Depends(get_db)):
    return crud.get_recruiter_records(db, username, pageSize, pageNumber)


@router.get(
    "/job_records",
    response_model=list[schemas.CandidateJobRecord]
)
def get_candidate_records(
        username: str,
        db: Session = Depends(get_db)):
    return crud.get_candidate_records(db, username)


@router.get(
    "/get_collected_jobs",
    response_model=list[schemas.JobPostResponse]
)
def get_candidate_records(
        username: str,
        db: Session = Depends(get_db)):
    return crud.get_collected_jobs(db, username)


@router.get(
    "/search_resume_receive",
    response_model=list[schemas.RecruiterJobRecord]
)
def search_recruiter_records(
        pageSize: int,
        pageNumber: int,
        username: str,
        jobTitle: Optional[str] = None,
        candidateName: Optional[str] = None,
        db: Session = Depends(get_db)):
    return crud.search_recruiter_records(db, username, jobTitle, candidateName, pageSize, pageNumber)


@router.get(
    "/recommend_jobs",
    response_model=list[schemas.JobPostResponse]
)
def recommend_jobs(
        username: str,
        count: int,
        db: Session = Depends(get_db)):
    return crud.recommend_jobs(db, username, count)


@router.get(
    "/search_job",
    response_model=list[schemas.JobPostResponse]
)
def search_job(
        title: str,
        pageSize: int,
        pageNumber: int,
        db: Session = Depends(get_db)):
    return crud.search_job(db, title, pageSize, pageNumber)
