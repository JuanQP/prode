FROM python:3.11-slim
WORKDIR /app
RUN mkdir -p /app/static
RUN mkdir -p /app/storage

RUN apt-get update
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install

COPY . .
