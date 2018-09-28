# Stickerdojo users API

## Starting stickerdojo-users on PORT 3000
```
cd stickerdojo-users
npm run dev
```

## User services

| Method        | Request                                           | Description             |
| ------------- | --------------------------------------------------|-------------------------|
| POST          | localhost:3000/api/v1/user/register               | Register                |
| POST          | localhost:3000/api/v1/user/like/sticker           | Post like               |
| GET           | localhost:3000/api/v1/users                       | Get all users           |
| GET           | localhost:3000/api/v1/user/:uuid                  | Get single users        |
| PUT           | localhost:3000/api/v1/user/update-email/:uuid     | Update user Email       |
| PUT           | localhost:3000/api/v1/user/update-password/:uuid  | Update user Password    |
| PUT           | localhost:3000/api/v1/user/update-profile/:uuid   | Update user Profile     |

