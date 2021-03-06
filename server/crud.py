from typing import Optional
from uuid import UUID
from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

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


def get_collected_jobs(db: Session, username: str):
    return db.query(models.JobPosition)\
        .join(models.JobStar, models.JobStar.jobId == models.JobPosition.id)\
        .filter(models.JobStar.username == username)\
        .all()


def get_all_post_job(db: Session, username: str):
    return db.query(models.JobPosition)\
        .filter(models.JobPosition.poster == username)\
        .all()


def post_job(db: Session, job: schemas.JobPostRequest, username: str):
    db_company = db.query(models.Company)\
        .join(models.User, models.User.company == models.Company.name)\
        .filter(models.User.username == username)\
        .first()
    db_job = models.JobPosition(
        **job.dict(), poster=username, logoUrl=db_company.logoUrl)
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
    db.commit()


def collect_job(db: Session, job_id: UUID, username: str):
    db_star = models.JobStar(
        jobId=job_id,
        username=username
    )
    db.add(db_star)
    db.commit()


def apply_job(db: Session, job_id: UUID, username: str):
    db_job_record = models.JobRecord(
        username=username,
        jobId=job_id,
    )
    db.add(db_job_record)
    db.commit()


def change_resume_status(db: Session, recordId: UUID):
    db_job_record = get_record_by_id(db, recordId)
    db_job_record.status = "read"
    db.commit()


def recruiter_records_from_db(db, db_job_records: models.JobRecord):
    recruiter_records = []
    for db_job_record in db_job_records:
        db_job = get_job_by_id(db, db_job_record.jobId)
        db_user = get_user_by_username(db, db_job_record.username)
        recruiter_records.append(
            schemas.RecruiterJobRecord(
                recordId=db_job_record.id,
                jobId=db_job.id,
                jobTitle=db_job.title,
                candidateName=db_user.name,
                candidateEducation=db_user.education,
                candidatePhoneNumber=db_user.phoneNumber,
                candidateEmail=db_user.email,
                resumeUrl=db_user.resumeUrl,
                status=db_job_record.status
            )
        )
    return recruiter_records


def candidate_records_from_db(db, db_job_records: models.JobRecord):
    candidate_records = []
    for db_job_record in db_job_records:
        db_job = get_job_by_id(db, db_job_record.jobId)
        candidate_records.append(
            schemas.CandidateJobRecord(
                title=db_job.title,
                id=db_job.id,
                postTime=db_job.postTime,
                sendTime=db_job_record.sendTime,
                company=db_job.company,
                department=db_job.department,
                location=db_job.location,
                status=db_job_record.status
            )
        )
    return candidate_records


def get_recruiter_records(db: Session, username: str, pageSize: int, pageNumber: int):
    db_job_records = db.query(models.JobRecord)\
        .join(models.JobPosition, models.JobRecord.jobId == models.JobPosition.id)\
        .filter(models.JobPosition.poster == username)\
        .offset(pageSize * (pageNumber - 1))\
        .limit(pageSize)\
        .all()

    return recruiter_records_from_db(db, db_job_records)


def get_candidate_records(db: Session, username: str):
    db_job_records = db.query(models.JobRecord)\
        .filter(models.JobRecord.username == username)\
        .all()
    return candidate_records_from_db(db, db_job_records)


def search_recruiter_records(db: Session, username: str, jobTitle: Optional[str],
                             candidateName: Optional[str], pageSize: int, pageNumber: int):
    queries = []
    if jobTitle:
        queries.append(models.JobPosition.title.like(f"%{jobTitle}%"))
    if candidateName:
        queries.append(models.User.name.like(f"%{candidateName}%"))

    db_job_records = db.query(models.JobRecord)\
        .join(models.JobPosition, models.JobPosition.id == models.JobRecord.jobId)\
        .join(models.User, models.User.username == models.JobRecord.username)\
        .filter(models.JobPosition.poster == username)\
        .filter(and_(*queries))\
        .offset(pageSize * (pageNumber - 1))\
        .limit(pageSize)\
        .all()

    return recruiter_records_from_db(db, db_job_records)


def recommend_jobs(db: Session, username: str, count: int):
    return db.query(models.JobPosition)\
        .order_by(func.random())\
        .limit(count)\
        .all()


def recommend_companies(db: Session, username: str, count: int):
    return [company_from_db(db, db_company) for db_company in
            db.query(models.Company)
            .order_by(func.random())
            .limit(count)
            .all()]


def get_company_by_name(db: Session, name: str):
    return company_from_db(db, db.query(models.Company).filter(models.Company.name == name).first())


def search_company(db: Session, name: str):
    return [company_from_db(db, db_company) for db_company in
            db.query(models.Company).filter(models.Company.name.like(f"%{name}%")).all()]


def search_job(db: Session, title: str, pageSize: int, pageNumber: int):
    as_title = db.query(models.JobPosition)\
        .filter(models.JobPosition.title.like(f"%{title}%"))\
        .offset(pageSize * (pageNumber - 1))\
        .limit(pageSize)\
        .all()

    as_company = db.query(models.JobPosition)\
        .join(models.User, models.User.username == models.JobPosition.poster)\
        .filter(models.User.company.like(f"%{title}%"))\
        .offset(pageSize * (pageNumber - 1))\
        .limit(pageSize)\
        .all()

    return as_title + as_company


def company_from_db(db: Session, db_company: models.Company):
    ret = schemas.Company(**db_company.__dict__)
    ret.jobNumber = db.query(models.JobPosition)\
        .join(models.User, models.User.username == models.JobPosition.poster)\
        .filter(models.User.company == db_company.name)\
        .count()
    ret.resumeNumber = db.query(models.JobRecord)\
        .join(models.JobPosition, models.JobPosition.id == models.JobRecord.jobId)\
        .join(models.User, models.User.username == models.JobPosition.poster)\
        .filter(models.User.company == db_company.name)\
        .count()
    return ret


def add_company(db: Session, company: schemas.CompanyRequest):
    print(company.dict())
    db_company = models.Company(**company.dict())
    db.add(db_company)
    db.commit()


def record_exists(db: Session, username: str, job_id: UUID):
    return db.query(models.JobRecord)\
        .filter(models.JobRecord.username == username)\
        .filter(models.JobRecord.jobId == job_id)\
        .first() is not None


def star_exists(db: Session, username: str, job_id: UUID):
    return db.query(models.JobStar)\
        .filter(models.JobStar.username == username)\
        .filter(models.JobStar.jobId == job_id)\
        .first() is not None


def get_jobs_by_company(db: Session, company: str):
    return db.query(models.JobPosition)\
            .join(models.User, models.User.username == models.JobPosition.poster)\
            .filter(models.User.company == company)\
            .all()

