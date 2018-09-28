# User services
This API reference is organized by resource type. Each resource type has one or more data representations and one or more methods.

## Starting service
this service will run at port 300
```
cd stickerdojo-users
npm run dev
```

## Resources

| Method        | Request                                           | Description             |
| ------------- | --------------------------------------------------|-------------------------|
| POST          | localhost:3000/api/v1/user/register               | Register                |
| POST          | localhost:3000/api/v1/user/like/sticker           | Post like               |
| GET           | localhost:3000/api/v1/users                       | Get all users           |
| GET           | localhost:3000/api/v1/user/:uuid                  | Get single users        |
| PUT           | localhost:3000/api/v1/user/update-email/:uuid     | Update user Email       |
| PUT           | localhost:3000/api/v1/user/update-password/:uuid  | Update user Password    |
| PUT           | localhost:3000/api/v1/user/update-profile/:uuid   | Update user Profile     |

## Examples
- Request
- Response