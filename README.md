# Getting Started with Create React App

## Install Client

```bash
  cd client
  npm install
```

## Install Server

```bash
  cd sever
  npm install
```

## Basic Config Client

Generate a .env in ./client/ OR rename from .env.dev to .env

```bash
  // EXAMPLE: http://localhost:8080
  REACT_APP_BASE_URL=<HOST-SERVER>:<PORT-SERVER>
  REACT_APP_BASE_PNG=https://www.metaweather.com/static/img/weather/png/
```

## Basic Config Server

Generate a .env in ./server/ OR rename from .env.dev to .env

```bash
  // EXAMPLE: http://localhost:8080
  BASE_URL='https://www.metaweather.com/api/location/'
  // EXAMPLE: 8080
  PORT='<PORT>'
```

## RUN APP

- Run in ./client
  ```bash
  npm run build
  ```
- Run in ./client
  ```bash
  npm run start
  ```

---

By Marcos Vissio <marcos.vissio@gmail.com>
