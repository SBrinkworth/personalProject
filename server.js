'usestrict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 8080;
var CasesController = require('./controllers/CasesController');
var CompaniesController = require('./controllers/CompaniesController');
var DrivesController = require('./controllers/DrivesController');
var LocationsController = require('./controllers/LocationsController');
var UsersController = require('./controllers/UsersController');

var app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());
// app.use(session({
//   secret: 'SanITyWorks.com Web Application Secret Sentance',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// Authentication
// passport.use('local-signup', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
//   },
//   function(req, email, password, done) {
//     if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
//     // asynchronous
//     process.nextTick(function() {
//       // if the user is not already logged in:
//       if (!req.user) {
//         User.findOne({
//           'local.email': email
//         }, function(err, user) {
//           // if there are any errors, return the error
//           if (err) return done(err);
//
//           // check to see if theres already a user with that email
//           if (user) {
//             return done(null, false);
//           } else {
//
//             // create the user
//             var newUser = new User();
//             newUser.local.email = email;
//             newUser.local.password = newUser.generateHash(password);
//             newUser.name = req.body.name;
//             newUser.avatar = req.body.avatar;
//             newUser.userType = req.body.userType;
//           }
//         });
//       }
//     });
//   }));
// passport.use('local-login', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: "password"
//   },
//   function(email, password, done) {
//     User.findOne({
//       email: email
//     }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   }
// ));
// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });
// passport.deserializeUser(function(id, cb) {
//   db.users.findById(id, function(err, user) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, user);
//   });
// });

// Endpoints -- VIEW -- CRUD
// Authentication Endpoints
// app.post('/user/auth/signup', passport.authenticate('local-signup'), function(req, res) {
//   res.status(200).json(req.user).end();
// });
// app.post('/user/auth/login', passport.authenticate('local'), function(req, res) {
//   res.status(200).json(req.user).end();
// });

// Endpoints
app.get('/drives', DrivesController.read);
app.post('/drives', DrivesController.create);
app.put('/drives/:id', DrivesController.update);
app.delete('/drives/:id', DrivesController.delete);

app.get('/users/:id', UsersController.read);
app.post('/users', UsersController.create);
app.put('/users/:id', UsersController.update);
app.delete('/users/:id', UsersController.delete);

app.get('/cases', CasesController.read);
app.post('/cases', CasesController.create);
app.put('/cases/:id', CasesController.update);
app.delete('/cases/:id', CasesController.delete);

app.get('/locations', LocationsController.read);
app.post('/locations', LocationsController.create);
app.put('/locations/:id', LocationsController.update);
app.delete('/locations/:id', LocationsController.delete);

app.get('/companies', CompaniesController.read);
app.post('/companies', CompaniesController.create);
app.put('/companies/:id', CompaniesController.update);
app.delete('/companies/:id', CompaniesController.delete);

// Listen
var mongoURI = 'mongodb://localhost:27017/sanityWorks';

mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log("connected to mongoDB at: ", mongoURI);
});

app.listen(port, function() {
  console.log('listening on port ', port);
});
