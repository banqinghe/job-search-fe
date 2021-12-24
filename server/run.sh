#!/bin/bash

http-server ./storage -p 3000 --cors&
sleep 1
uvicorn main:app --reload
