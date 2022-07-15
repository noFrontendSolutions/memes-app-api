<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS-Auth2-API

---
is an equivalent project to my **Laravel-Auth2-API** project. Here I'm using **JWT Tokens** for the authentication slash authorization. It was made with **NestJs** and uses **Prisma** as the **ORM**. It may come in handy as a scaffolding for a bigger project that requires authentication. 

### Routes:
- **api/sign-up**  

- **api/login** <br>
 
<br>

## Installation for MySQL

---

Get a clone of this repository:
```bash
git clone https://github.com/noFrontendSolutions/laravel-auth-api
```
Change into the newly created directory and install all dependencies:

```bash
composer install
```

Then log into **MySql** and create a database:

```bash
mysql --user <user> --password <password>
create database <databaseName>;
```

Rename **.env.example** file into **.env** and change the database related fields accordingly. The MySQL default would be this:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD
```
Create **users** and **personal_access_tokens** tables with the following command:
```bash
php artisan migrate
```
And now you should be ready to start the server:
```bash
php artisan serve
```


Happy coding :)
............................................................................................................................................................................................................................................................................................................................................................................................................................................................................