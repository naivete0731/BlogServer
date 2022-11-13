# BlogServer

## Project setup

```
npm install
```

## Project start

```
nodemon app && node app
```

mongo
use admin
db.auth('user','pwd')

use admin
db.createUser({user:'root',pwd:'',roles:['root']})

use Naivete
db.createUser({user:'user',pwd:'',roles:['readWrite']})

net stop mongodb
mongod --remove
mongod --logpath='C:\Program Files\MongoDB\Server\4.1\log\mongod.log' --dbpath='C:\Program Files\MongoDB\Server\4.1\data' --install --auth

net start mongoDB
