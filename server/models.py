from sqlalchemy import Column, Integer, String, ARRAY


from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True,
                nullable=False, autoincrement=True)
    username = Column(String, index=True, nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(String, index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    phoneNumber = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    avaterUrl = Column(String)

    # jobHunger
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
