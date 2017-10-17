// API Application (BackEnd)
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Log4JS
const log4js = require('log4js');
log4js.configure({
  appenders: {
    everything: {
      type: 'file',
      filename: 'datacloudians.log',
      maxLogSize: 10485760,
      backups: 2,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['everything'],
      level: 'debug',
    },
  },
});
const logger = log4js.getLogger();


// Connect-Mongo
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Import Properties Reader
const properties = require('./properties.json');

// MONGO CONNECTION STRING
const dbConn = 'mongodb://' + properties.dbuser
                          + ':'
                          + properties.dbpass
                          + '@'
                          + properties.dburl
                          + '/'
                          + properties.dbname;

// IMPORT MONGO
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConn, {
  useMongoClient: true,
  /* other options */
});

const db = mongoose.connection;
const Transaction = require('./models/transaction.js');
const User = require('./models/user.js');

// MONGO LOGs
db.on('error', logger.debug.bind(logger, 'ERROR: [MongoDB: connection error] '));

// ------ APIs DEFINITION -------
app.use(session({
  secret: properties.apikey,
  saveUninitialized: false,
  resave: false,
  unset: 'destroy',
  name: 'id',
  cookie: {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
    secure: false,
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in miliseconds
  },
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 2 * 24 * 60 * 60, // 2 days in seconds
  }),
}));

app.get('/checkAuth', function checkAuth(req, res) {
  if (req.session && req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(403).send({msg: 'Authentication Error.'});
  }
});

// ---> LOGIN
app.post('/login', function login(req, res) {
  const user = req.body;
  const userEmail = user[0].email;
  const userPass = user[0].password;

  User.findOne({ 'email': userEmail, 'password': userPass }).exec(function findLogin(err, userCheck) {
    try {
      if (userCheck === null) {
        res.status(403, 'LOGIN AUTHENTICATION FAILED');
      } else {
        req.session.user = userCheck;
      }
    } catch (e) {
      res.status(403, 'LOGIN FAILED');
    }
    res.json(userCheck);
  });
});

// ---> LOGOUT USER
app.get('/logout', function logout(req, res) {
  req.session.cookie.expires = new Date(0);
  req.session.destroy(function sessionDestroy(error) {
    if (error) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(200);
  });
});

// ---> CREATE TRANSACTION
app.post('/transaction', function transfer(req, res) {
  const transaction = req.body;
  const userTo = transaction[0].to;
  const userFrom = transaction[0].from;
  const amount = transaction[0].amount;
  const minusAmount = -1 * amount;

  // Check if userFROM have credit
  User.findById(userFrom).exec(function findUser(err, user1) {
    if (err) {
      res.status(500, 'ERROR: [GET USER FROM]');
    }
    // Check Current userFrom balance
    const balanceFrom = user1.balance;

    // If the amount is valid update it on userTo and remove it from userFrom
    if (amount <= balanceFrom && amount > 0) {
      User.findOneAndUpdate( { _id: userFrom }, { $inc: { 'balance': minusAmount } }, {upsert: true})
        .exec(function userFromUpdate(errFrom) {
          if (errFrom) {
            res.status(500, 'ERROR: [UPDATING USER FROM]');
          }
        });
      User.findOneAndUpdate({ _id: userTo }, { $inc: { 'balance': amount } }, { upsert: true })
        .exec(function userToUpdate(errTo) {
          if (errTo) {
            res.status(500, 'ERROR: [UPDATING USER TO]');
          }
        });
      Transaction.create(transaction, function doTransfer(errTransfer, transactions) {
        if (errTransfer) {
          res.status(500, 'ERROR: [CREATING TRANSACTION]');
        }
        res.json(transactions);
      });
    } else {
      res.status(500, 'ERROR: [INVALID TRANSACTION]');
    }
  });
});

// ---> CREATE USER
app.post('/user', function user(req, res) {
  const loadUser = req.body;

  User.create(loadUser, function createUser(err, newUser) {
    if (err) {
      res.status(500, 'ERROR: [CREATING USER]');
    }
    res.json(newUser);
  });
});

// ---> GET USER
app.get('/user', function user(req, res) {
  User.find().sort('-balance').exec(function getUser(err, users) {
    if (err) {
      res.status(500, 'ERROR: [CREATING LOADING USER]');
    }
    res.json(users);
  });
});

// ---> DELETE USER
app.delete('/user/:_id', function user(req, res) {
  const query = {_id: req.params._id};
  User.remove(query, function removeUser(err, remUser) {
    if (err) {
      res.status(500, 'ERROR: [DELETING USER]');
    }
    res.json(remUser);
  });
});

// ---> UPDATE USER
app.put('/user/:_id', function user(req, res) {
  const currentUser = req.user;
  const query = req.params._id;

  // In case the field does not exists
  const update = {
    '$set': {
      balance: currentUser.balance,
    },
  };

  // When TRUE, return the updated document
  const options = {new: true};

  User.findOneAndUpdate(query, update, options, function updateUser(err, users) {
    if (err) {
      res.status(500, 'ERROR: [UPDATING USER]');
    }
    res.json(users);
  });
});
// END APIs

app.listen(3001, function webApp(err) {
  if (err) {
    return logger.debug(err);
  }
  return logger.debug('API Server is listening on http://localhost:3001');
});
