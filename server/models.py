import uuid
from sqlalchemy import Column, Integer, String, ARRAY, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func


from database import Base


class User(Base):
    __tablename__ = "users"

    username = Column(String, primary_key=True, index=True,
                      nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(String, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    phoneNumber = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    avatarUrl = Column(String)
    jobsStars = Column(ARRAY(String))

    # jobHunter
    jobType = Column(String)
    jobTags = Column(ARRAY(String))
    university = Column(String)
    education = Column(String)
    city = Column(String)
    salaryRange = Column(ARRAY(Integer))
    userType = Column(String)
    resumeUrl = Column(String)

    # recruiter
    company = Column(String)
    department = Column(String)


class JobPosition(Base):
    __tablename__ = "job_positions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    poster = Column(String)
    title = Column(String)
    postTime = Column(DateTime, server_default=func.now())
    location = Column(String)
    experienceRequirement = Column(String)
    educationRequiretment = Column(String)
    salaryRange = Column(ARRAY(Integer))
    company = Column(String)
    department = Column(String)
    # FIXME
    logoUrl = Column(String, default="no url")
    detail = Column(String)


class JobRecord(Base):
    __tablename__ = "job_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    jobId = Column(String)
    title = Column(String)
    sendTime = Column(DateTime, server_default=func.now())
    company = Column(String)
    department = Column(String)
    location = Column(String)
    status = Column(String)


class ResumeReceiveRecord(Base):
    __tablename__ = "resume_receive_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    jobId = Column(String)
    recordId = Column(String)
    jobTitle = Column(String)
    candidateName = Column(String)
    candidateEducation = Column(String)
    candidatePhoneNumber = Column(String)
    candidateEmail = Column(String)
