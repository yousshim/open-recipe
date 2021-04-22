# open-recipe
the open source food store

# Requirements
* git
* node
* docker (recommended)

setting postgress database with docker
> docker run -d --name open-recipe-db -e POSTGRES_PASSWORD=******  -p 5432:5432 postgres

> docker exec -it open-recipe-db /bin/bash

> createdb open-recipe -U postgres

> exit

> git clone https://github.com/yousshim/open-recipe

> pnpm install

> pnpm run build:client

> pnpm run build:server

> pnpm run build:express

> pnpm run start
