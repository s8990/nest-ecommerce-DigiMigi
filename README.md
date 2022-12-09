# Endpoints

## Authentication:

`POST /api/users/login`

Example request body:

```
{
  "user": {
    "username": "johndoe",
    "mobile": "09111111111",
    "password": "123"
  }
}
```

No authentication required, returnes a User

Required fileds: `username`, `mobile`, `password`

## Registration

...