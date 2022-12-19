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

...   ...   ...   ...   ...   ...   ...   ...   
...   ...   ...   ...   ...   ...   ...   ...   
...   ...   ...   ...   ...   ...   ...   ...   

## Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a Profile

```
{
  "profile": {
    "username": "johndoe",
    "bio": "I like coffee",
    "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
    "following": false
  }
}
```
