### Set up Instrunction

- Install dependecies with `$ npm install`;
- There is an env.example file that shows you the enviroment variables you need
- Run migrations with `$ npx prisma migrate dev` ;
- To run in dev mode use `$ npm run start:dev`;
- To create prod build `$ npm run build`;
- To run in prod use `$ npm run start`
- There is a rate limit of 20 requests per minute across all routes,and 5 request per minute on the `POST /quote route`

[postman docs](https://documenter.getpostman.com/view/20589483/2sB34cq3py 'postman')
