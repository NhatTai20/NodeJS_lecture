const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const path = require('path');
const morgan = require('morgan');

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(morgan('combined'));

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

//route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});