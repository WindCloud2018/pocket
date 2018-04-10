# Pocket

Visualize personal finance.

[Live Demo](https://pocket-windcloud.herokuapp.com/)

### How to get start
* Run following commend to install Express server dependencies:
```
npm i
```
* Then run following commend to install React dependencies:
```
cd client 
```
```
npm i
```
* Go back to root folder
```
cd ..
```

### How to setup Express server
* Create .env in project root and setup following:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=name of your database
```

### How to start local environment
* Start local server
```
npm run start
```
* Start local front-end
```
npm run dev
```

### How to deploy to Heroku with Git
* Make sure [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) is installed. 
* Run
```
heroku create
```
```
git push heroku master
```
* If on non-master branch, then run:
```
git push heroku branchname:master
```
* Check [this guide](https://devcenter.heroku.com/articles/git) for more details.

### How to add Postgresql to Heroku
* Follow steps in "How to deploy heroku"
* Run following to install Postgresql addons with free price tier:
```
heroku addons:create heroku-postgresql:hobby-dev
```
* Database on Heroku is defaulted to DATABASE.
* Run following to push local database into Heroku Postgresql
```
heroku pg:push localdatabase DATABASE/HEROKU_DATABASE_NAME
```
* Check [this guide](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) for more details.

## Built With

* [Reactstrap](https://reactstrap.github.io/) - React Bootstrap components.
* [React Chart.js](https://github.com/reactjs/react-chartjs) - For charts.
* [Axios](https://www.npmjs.com/package/axios) - API Calls.
* [Express](https://expressjs.com/) - NodeJS library.
* [create-react-app](https://github.com/facebook/create-react-app) - React Starter Pack.
* [Heroku](https://devcenter.heroku.com/) - Deployment platform and documentations

## Upcoming Features

* User Authentication Login
* Summary filter for month and year with search function
* 

## Authors

* **Carson Chen** (https://github.com/carsoncychen)
* **Nian Liu** (https://github.com/nianliu18)

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
