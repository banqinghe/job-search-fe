from typing import Optional, List, Union
from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class Role(str, Enum):
    jobHunter = "jobHunter"
    recruiter = "recruiter"


class UserBase(BaseModel):
    username: str


class User(UserBase):
    role: Role = None
    name: str = None
    phoneNumber: str = None
    email: str = None
    avatarUrl: Optional[str]

    # jobHunter
    jobType: Optional[str]
    jobTags: Optional[List[str]]
    university: Optional[str]
    education: Optional[str]
    city: Optional[str]
    salaryRange: Optional[List[int]]
    userType: Optional[str]
    resumeUrl: Optional[str]

    # recruiter
    company: Optional[str]
    department: Optional[str]

    class Config:
        orm_mode = True


class UserRegister(User):
    password: str


class UserLogin(UserBase):
    password: str


class UserChangePassword(UserBase):
    password: str
    newPassword: str


class jobPosition(BaseModel):
    id: str
    title: str
    postTime: datetime
    experienceRequirement: Optional[str]
    educationRequiretment: Optional[str]
    salaryRange: Optional[List[int]]
    company: str
    department: str
    logoUrl: str
