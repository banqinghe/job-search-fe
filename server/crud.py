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
