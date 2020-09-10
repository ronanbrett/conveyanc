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
       { role: "readWrite", db: "geography" },
    ]
  }
)

db.updateUser(
  "mercury",
  {
    pwd: "INSECURE",
    roles: [
       { role: "readWrite", db: "users" },
       { role: "readWrite", db: "geography" },
       { role: "readWrite", db: "property" }
    ]
  }
)
```

## Create DB Mercury User

```
use [DB]
db.createUser(
  {
    user: "mercury",
    pwd: "INSECURE",
    roles: [
       { role: "readWrite", db: "geography" },
    ]
  }
)

db.updateUser(
  "mercury",
  {
    pwd: "INSECURE",
    roles: [
       { role: "readWrite", db: "users" },
       { role: "readWrite", db: "property" }
    ]
  }
)
```

# Empty Property

```
use property
db.propertydocuments.find()
db.propertydocuments.remove({})
```
