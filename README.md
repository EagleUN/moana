# moana
Repository for microservice related to feeds

To run this locally clone the repo, make sure you have installed npm:

**Docker**

To install docker images of postgres run
* ```docker-compose up -d```

**npm**

To install node packages run:
* ```npm ci```

**Migrations**

Moana uses typeorm to handle migrations, all migrations will be stored inside db/migrations:

To create a new one run:
* ```ts-node node_modules/typeorm/cli.js migration:create -n MigrationName```

To generate migrations automatically from defined entities run:
* ```ts-node node_modules/typeorm/cli.js migration:generate```

To run migrations run:
* ```ts-node node_modules/typeorm/cli.js migration:run```

**Run moana using nodemon**

Run following commands con console in source of project:

* ```npm run dev```

This option will automatically check changes in files inside src folder and restart moana

**Run moana as a JS app**

Run following commands con console in source of project:
* ```npm run build```
* ```npm run start```

Moana will be deployed on port 3000
