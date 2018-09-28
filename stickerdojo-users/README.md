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
- Request to _POST localhost:3000/api/v1/register_

```
{
	"email_address": "emailaddress@gmail.com",
	"password": "emailaddres",
	"first_name": "Muhammad Isa",
	"last_name": "Wijaya Kusuma",
	"username": "@muhammadisawijaya",
	"about": "Backend developer at Telecreative",
	"job": "Backed Developer and Backend Engineer",
	"ages": 18
}
```

- Response from _POST localhost:3000/api/v1/register_

```
{
    "condition": "Success",
    "message": "New user has been registered",
    "method": "POST",
    "time": "2018-09-28T18:13:07.524Z",
    "status": 201,
    "data": {
        "command": "INSERT",
        "rowCount": 1,
        "oid": 0,
        "rows": [],
        "fields": [],
        "_parsers": [],
        "RowCtor": null,
        "rowAsArray": false
    }
}
```