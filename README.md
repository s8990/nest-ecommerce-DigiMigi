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

... ... ... ... ... ... ... ...  
... ... ... ... ... ... ... ...  
... ... ... ... ... ... ... ...

## Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a Profile

output :

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

## Follow User

`POST /api/profiles/:username/follow`

Authentication required, returns a Profile

No additional parameters required

## Unfollow User

`DELETE /api/profiles/:username/follow`

Authentication required, returns a Profile

No additional parameters required

## Feed Articles

`GET /api/articles/feed`

Can also take `limit` and `offset` query parameters like List Articles

Authentication required, will return multiple articles created by followed users, ordered by most recent first.
