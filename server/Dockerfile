FROM python:3.10-buster as base
WORKDIR /app
RUN apt-get update
RUN pip install pipenv

FROM base as installer
COPY ./server/Pipfile ./server/Pipfile.lock ./
RUN pipenv install

FROM base as runner
COPY --from=installer /app/.venv /app/.venv
COPY . /app
CMD pipenv run python manage.py runserver 0:8080
