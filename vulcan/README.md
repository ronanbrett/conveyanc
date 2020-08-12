# Vulcan

# How to create a Cert

First Install Brew

```
brew update
brew install mkcert
brew install nss
```

Then Install MkCert

```
mkcert -install
```

```
mkcert -key-file certs/key.pem -cert-file certs/cert.pem vulcan "*.vulcan.com" vulcan.test localhost 192.168.0.192 127.0.0.1 ::1
```
