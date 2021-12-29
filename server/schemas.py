from uuid import UUID
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


class JobPostRequest(BaseModel):
    title: str
    location: list[str]
    experienceRequirement: Optional[str]
    educationRequirement: Optional[str]
    salaryRange: Optional[List[int]]
    company: str
    department: str
    description: str


class JobPostResponse(JobPostRequest):
    id: UUID
    poster: str
    postTime: datetime
    logoUrl: str
    collected: Optional[bool]
    resumed: Optional[bool]

    class Config:
        orm_mode = True


class CandidateJobRecord(BaseModel):
    title: str
    id: UUID
    postTime: datetime
    sendTime: datetime
    company: str
    department: str
    location: List[str]
    status: str


class RecruiterJobRecord(BaseModel):
    recordId: UUID
    jobId: UUID
    jobTitle: str
    candidateName: str
    candidateEducation: str
    candidatePhoneNumber: str
    candidateEmail: str
    resumeUrl: str
    status: str


class Company(BaseModel):
    name: str
    description: str
    logoUrl: str
    officialLink: str
    jobNumber: str
    resumeNumber: str
    detail: str

    class Config:
        orm_mode = True
