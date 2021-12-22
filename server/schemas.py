from typing import Optional, List, Union
from enum import Enum

from pydantic import BaseModel


class jobHunter(str, Enum):
    jobHunter = "jobHunter"


class recuiter(str, Enum):
    recruiter = "recruiter"


class UserBase(BaseModel):
    username: str
    role: Union[jobHunter, recuiter]
    name: str
    phoneNumber: str
    email: str
    avaterUrl: Optional[str]


class UserLogin(BaseModel):
    username: str
    password: str


class UserChangePassword(UserLogin):
    newPassword: str


class JobHunter(UserBase):
    role: jobHunter
    jobType: Optional[str]
    jobTag: Optional[List[str]]
    university: Optional[str]
    education: Optional[str]
    city: Optional[str]
    salaryRange: Optional[List[int]]
    userType: Optional[str]
    resumeUrl: Optional[str]


class Recruiter(UserBase):
    role: recuiter
    company: Optional[str]
    department: Optional[str]

