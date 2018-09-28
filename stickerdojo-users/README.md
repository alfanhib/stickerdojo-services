# Stickerdojo users API
### User services

| Method        | Request                                           | Description             |
| ------------- | --------------------------------------------------|-------------------------|
| POST          | localhost:3000/api/v1/user/register               | Register                |
| POST          | localhost:3000/api/v1/user/like/sticker           | Post like               |
| GET           | localhost:3000/api/v1/users                       | Get all users           |
| GET           | localhost:3000/api/v1/user/:uuid                  | Get single users        |
| PUT           | localhost:3000/api/v1/user/update-email/:uuid     | Update user Email       |
| PUT           | localhost:3000/api/v1/user/update-password/:uuid  | Update user password    |
| PUT           | localhost:3000/api/v1/user/update-profile/:uuid   | Update user profile     |