import uuid
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

import schemas
import crud
import consts
from database import get_db


router = APIRouter()


@router.post(
    "/login",
    response_model=schemas.User
)
def user_login(user: schemas.UserLogin,
               db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)

    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Wrong password")

    return db_user


@router.post(
    "/register"
)
def user_register(user: schemas.UserRegister,
                  db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)

    if db_user:
        raise HTTPException(status_code=400, detail="Username already existed")

    return crud.create_user(db, user)


@router.patch(
    "/change_password"
)
def user_change_password(user: schemas.UserChangePassword,
                         db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)

    if db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Wrong password")

    return crud.change_password(db, user)


@router.patch(
    "/update_info",
    response_model=schemas.User
)
def user_update_info(user: schemas.User,
                     db: Session = Depends(get_db)):
    return crud.update_user(db, user)


@router.post(
    "/upload_file",
    response_model=str
)
def upload_file(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1]
    filename = str(uuid.uuid4()) + ext
    path = consts.STORAGE_DIR / filename

    try:
        with path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    finally:
        file.file.close()

    return f"{consts.STORAGE_BASE_URL}/{filename}"
