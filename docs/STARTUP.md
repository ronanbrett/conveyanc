# Startup

### Dev Environment

Start Docker Services

```
docker-compose up -d
```

Start LocalStack

```
SERVICES=s3 localstack start
```

### Logging

```
docker exec -it docs_redis_1 sh
redis-cli -a INSECURE
```
