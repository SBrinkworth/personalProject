'usestrict';

// Requires
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require("./config");

// Controllers
var CasesController = require('./controllers/CasesController');
var CompaniesController = require('./controllers/CompaniesController');
var DrivesController = require('./controllers/DrivesController');
var LocationsController = require('./controllers/LocationsController');
var UsersController = require('./controllers/UsersController');

// Auth Requires
var passport = require("./services/pasport");
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.sendStatus(401);
  return next();
};

var app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'SanITyWorks.com Web Application Secret Sentance',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



// Authentication
app.post('/user', UsersController.register);
app.get('/user', isAuthed, UsersController.me);
app.put('/user/:id', UsersController.update);
// app.delete('/users/:id', UsersController.delete);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/user'
}));
app.get('/logout', function(req, res) {
  req.logout();
  return res.send('logged out');
});



// Regular Endpoints
app.get('/drives/:id', DrivesController.read);
app.post('/drives', DrivesController.create);
app.put('/drives/:id', DrivesController.update);
app.delete('/drives/:id', DrivesController.delete);

app.get('/cases/:id', CasesController.read);
app.post('/cases', CasesController.create);
app.put('/cases/:id', CasesController.update);
app.delete('/cases/:id', CasesController.delete);

app.get('/locations/:id', LocationsController.read);
app.post('/locations', LocationsController.create);
app.put('/locations/:id', LocationsController.update);
app.delete('/locations/:id', LocationsController.delete);

app.get('/companies', CompaniesController.read);
app.post('/companies', CompaniesController.create);
app.put('/companies/:id', CompaniesController.update);
app.delete('/companies/:id', CompaniesController.delete);



// Listen
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log("connected to Mongo DB at: ", mongoURI);
});

app.listen(port, function() {
  console.log('listening on port ', port);
});
