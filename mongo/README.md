# Mongo

## Login to Dev

```
use admin
db.auth("mongoadmin","INSECURE")
```

## Create Mercury User

```
use users
db.createUser(
  {
    user: "mercury",
    pwd: "INSECURE",
    roles: [
       { role: "readWrite", db: "users" }
    ]
  }
)
```
