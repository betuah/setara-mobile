# seTARA Daring Mobile Apps

> **Desc :** Mobile Apps for seTARA Daring Learning Management System.

## About TEAM

#### BackEnd Developer
- **Name :** Pansera Oktasedu Kanaidi
- **Email :** pansera.oktasedu@gmail.com
- **Github :** [Okta's Github Libraries](https://github.com/pansedo/)

#### FrontEnd Developer
- **Name :** Ihsan Fauzi
- **Email :** ihsanfauzi.id@gmail.com
- **Github :** [Ihsan's Github Libraries](https://github.com/ihsan-fauzi/)

#### Mobile Developer
- **Name :** Betuah Anugerah
- **Email :** betuahanugerah@gmail.com
- **Github :** [Betuah's Github Libraries](https://github.com/betuah/)

<hr>

## Server Config Setup
> Create .env file in Server folder
```sh
PORT=8000
NODE_ENV=dev | prod
HTTPS_PRIVATE_KEY_PATH=./ssl/server.key
HTTPS_CERTIFICATE_PATH=./ssl/server.cert
HOST=YOUR_HOST | eg. http://locahost
TOKEN_SECRET=YOUR_TOKEN_SECRET
ENCRYPTION_KEY=YOUR_ENCRYPTION_KEY
ORIGIN=YOUR_ORIGIN
MONGO_DB_LMS=YOUR_LMS_DB_NAME
MONGO_USERNAME_LMS=YOUR_LMS_DB_USERNAME
MONGO_PASSWORD_LMS=YOUR_LMS_DB_PASSWORD
MONGO_DB_LOG=YOUR_LOG_DB_NAME
MONGO_USERNAME_LOG=YOUR_LOG_DB_USERNAME
MONGO_PASSWORD_LOG=YOUR_LOG_DB_PASSWORD
MONGO_HOST=YOUR_MONGO_HOST
MONGO_PORT=YOUR_MONGO_PORT
```

## Running Server App
```sh
$ npm run dev # dev for Running development apps and prod for Running production apps

```

<hr>