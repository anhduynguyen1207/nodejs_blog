const path = require('path');
const express = require('express');
const morgan = require('morgan');
// const { handlebars } = require('express-handlebars')
// import { engine } from 'express-handlebars';
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express()

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'))

//Teamplate engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: require('./app/helpers/handlebars')
}));
app.set('view engine', 'hbs');
// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));


route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})