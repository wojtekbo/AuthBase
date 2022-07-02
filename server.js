const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');

const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session');

const app = express();

// set handlebars as view engine
app.engine('hbs', hbs({extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main'}));
app.set('view engine', '.hbs');

// init session mechanism
app.use(session({secret: 'qEWfw04234wfzWEt31'}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

app.get('/user/logged', (req, res) => {
  res.render('logged');
});

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
