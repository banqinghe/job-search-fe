from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import schemas
import crud
from database import get_db


router = APIRouter()


@router.post(
    "/add_one",
)
def add_one(company: schemas.Company,
            db: Session = Depends(get_db)):
    return crud.add_company(db, company)


@router.get(
    "/get_one",
    response_model=schemas.Company
)
def get_one(name: str,
            db: Session = Depends(get_db)):
    return crud.get_company_by_name(db, name)


@router.get(
    "/search_company",
    response_model=list[schemas.Company]
)
def search_company(name: str,
                   db: Session = Depends(get_db)):
    return crud.search_company(db, name)


@router.get(
    "/recommend_companies",
    response_model=list[schemas.Company]
)
def recommend_companies(username: str,
                        count: int,
                        db: Session = Depends(get_db)):
    return crud.recommend_companies(db, username, count)


@router.get(
    "/get_jobs",
    response_model=list[schemas.JobPostResponse]
)
def get_jobs(name: str,
             db: Session = Depends(get_db)):
    return crud.get_jobs_by_company(db, name)
