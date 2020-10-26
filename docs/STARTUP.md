# Startup

### Dev Environment

Start Docker Services w/o mercury & vulcan (good for development)

```
docker-compose -f docker-compose-dev.yml up -d
```

Start All Docker Services

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

### Certs

Use mkcert to generate Certs - https://github.com/FiloSottile/mkcert
