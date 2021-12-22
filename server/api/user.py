from typing import Union
from fastapi import APIRouter, Body
import schemas


router = APIRouter()


@router.post(
    "/login",
    response_model=schemas.UserBase,
    status_code=200
)
def user_login(user: schemas.UserLogin):
    pass


@router.post(
    "/register",
    status_code=200
)
def user_register(user: schemas.UserBase):
    pass


@router.patch(
    "/change_password",
    status_code=200
)
def user_change_password(user: schemas.UserChangePassword):
    pass


@router.patch(
    "/update_info",
    response_model=schemas.UserBase,
    status_code=200
)
def user_update_info(user: Union[schemas.Recruiter, schemas.JobHunter]):
    print(type(user))
