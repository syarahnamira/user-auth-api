# User Auth API

Simple API for user register and login

# Install and Run

```
npm install
docker-compose up -d
```


# Usage

## Example Register

```
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
           "username": "john_doe",
           "password": "securepassword"
         }'
```

## Example Login

```
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "john_doe",
           "password": "securepassword"
         }'

```