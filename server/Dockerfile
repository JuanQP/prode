FROM python:3.10-buster
WORKDIR /app
RUN apt-get update
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install

COPY . .

EXPOSE 8000

CMD pipenv run python manage.py runserver 0:8000
