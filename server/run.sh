#!/bin/bash

http-server ./storage -p 8001 --cors&
sleep 1
uvicorn main:app --reload
