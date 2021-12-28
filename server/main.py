from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from api import router
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(router=router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
