!('NODE_ENV' in process.env) && require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;

const expenseRoutes = require('./routes/expenseroutes');
const categoryRoutes = require('./routes/categoryroutes');

const app = express();


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/expenses', expenseRoutes);

//use for testing category route with local db
app.use('/api/categories', categoryRoutes);

//welcome home route to Pocket
app.use('/api', (req, res) => {
  res.status(200).json ({
    message: 'Greetings Welcome to LocalHost Home Route for Pocket App'
  });
});


// the "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

//set up port listening in server side CLI, also on error we have a short cut of giving a red warning by using the built in method console.error.
app.listen(port, () => {
  console.log(`Server up and listening on port ${port}, in ${app.get('env')} mode.`)
}).on('error', console.error);
