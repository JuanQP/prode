# Prode

## Why?

This very simple implementation of a web-based game that was made for learning purposes. The purpose was to build a web app with the following stack:

* React ⚛️
  * Vite ⚡
  * Zod
  * react-query
  * Mantine
  * react-hook-form
  * react-router
* TypeScript 🟦
* Django Rest Framework 🐍
  * File uploads
  * JWT
  * Gunicorn
* Docker 🐋
* Nginx 🟩


## Description

*Prode* is a game about trying to predict football match results. Users can play this game by joining to other user's leagues and making their predictions about future matches. If they correctly predict which team will win the game, they earn points.

The word *Prode* comes from spanish "Pronóstico Deportivo" (Sport forecast).

## How to run the project

```sh
docker compose up
```

It's necessary an **admin user**. These users can be created by simply using the Django admin panel or by running this command in a new terminal (once the app is running):

```sh
docker-compose exec backend /bin/sh -c "pipenv run python manage.py createsuperuser"
```

That's it.

* Backend running on `http://localhost:9000`
* Frontend running on `http://localhost`
* PostgreSQL running on `localhost:5432`

## How the app looks

Home page
![Screenshot from 2022-12-30 15-09-07](https://user-images.githubusercontent.com/11776905/210100259-6c5cd0fe-0827-4afe-9892-fd0ecc1d2a15.png)

Login page
![Screenshot from 2022-12-30 15-09-22](https://user-images.githubusercontent.com/11776905/210100263-8fe87af7-c1b4-476f-8277-869c4ac5a36d.png)

Search leagues as a normal user
![Screenshot from 2022-12-30 15-09-17](https://user-images.githubusercontent.com/11776905/210100268-5b1c22c5-372a-4bf1-92f4-8904d9206cd3.png)

Logged in as an admin
![Screenshot from 2022-12-30 15-09-42](https://user-images.githubusercontent.com/11776905/210100269-deaae360-1e55-49af-8741-ff3fd413396e.png)

All League's participant users
![Screenshot from 2022-12-30 15-10-29](https://user-images.githubusercontent.com/11776905/210100297-be3eba3c-055e-41cd-98dc-889e559aa4d3.png)

## About the app

With the recently created Admin user, now you can create `Competition`s and `Team`s. A `Competition` would be for example `FIFA World Cup Qatar 2022`. Then, you can create teams one by one, or by uploading a `.csv` file. These would be for example Argentina, USA, Netherlands, Brazil, etc...

With a `Competition` and its respectives `Team`s, it's time to upload the `Match`es. These could be created by uploading a `.csv` too.

At this point, normal users can create their `League`s and making that `League` **public** (anyone can join) or **private** (another user must send a join request that must be accepted by the `League` owner).

Users now can add their predictions in a particular League and earn points. It's important to remember that football matches only finish when an admin **finish a match** by updating the final result of that match. At that moment all predictions in every league are checked and points are earned by each user.

Points are given like this:

* +45 points if user could predict correctly who won
* +15 points if user could predict the exact amount of goals of one team
* +30 points if user could predict the exact amount of goals of both teams

# Development

```sh
# Backend
cd server
pipenv install
pipenv run python manage.py runserver 0:8000

# Frontend
cd client
npm install
npm run dev

# PostgreSQL
docker compose up db
```
