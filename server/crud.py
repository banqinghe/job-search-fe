from uuid import UUID
from sqlalchemy.orm import Session

import models
import schemas


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserRegister):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.User):
    db_user = get_user_by_username(db, user.username)

    for key, value in user.dict().items():
        if value:
            setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def change_password(db: Session, user: schemas.UserChangePassword):
    db_user = get_user_by_username(db, user.username)

    db_user.password = user.newPassword

    db.commit()


def get_job_by_id(db: Session, id: UUID):
    return db.query(models.JobPosition).filter(models.JobPosition.id == id).first()


def get_record_by_id(db: Session, id: UUID):
    return db.query(models.JobRecord).filter(models.JobRecord.id == id).first()


def get_all_post_job(db: Session, username: str):
    return db.query(models.JobPosition)\
        .filter(models.JobPosition.poster == username)\
        .all()


def post_job(db: Session, job: schemas.JobPostRequest, username: str):
    db_job = models.JobPosition(**job.dict(), poster=username)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


def change_job(db: Session, job: schemas.JobPostResponse):
    db_job = get_job_by_id(db, job.id)

    for key, value in job.dict().items():
        if value:
            setattr(db_job, key, value)

    db.commit()
    db.refresh(db_job)
    return db_job


def delete_job(db: Session, job_id: UUID):
    db.query(models.JobPosition)\
        .filter(models.JobPosition.id == job_id)\
        .delete()


def collect_job(db: Session, job_id: UUID, username: str):
    db_user = get_user_by_username(db, username)
    db_user.jobStars.append(job_id)
    db_user.commit()


def apply_job(db: Session, job_id: UUID, username: str):
    db_job_record = models.JobRecord(
        candidateName=username,
        job_id=job_id,
    )
    db.add(db_job_record)
    db.commit()


def change_resume_status(db: Session, recordId: UUID):
    db_job_record = get_record_by_id(db, recordId)
    db_job_record.status = "read"
    db.commit()
