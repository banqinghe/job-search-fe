# Server

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Install Postgres (macOS)

1. Install postgres.app from https://postgresapp.com
2. Create database `job`

Or if you want to use other SQL databases, setup by yourself and adjust the URL in `consts.py`

## Run the Server

```bash
uvicorn main:app --reload
```

See http://localhost:8000/docs for the interactive API docs.
