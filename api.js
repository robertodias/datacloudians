//API Reverse Proxy
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');

//Connect-Mongo
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Import Properties Reader
var properties = require('./properties.json');

//MONGO CONNECTION STRING
var dbConn = 'mongodb://' + properties.dbuser
                          + ':'
                          + properties.dbpass
                          + '@'
                          + properties.dburl
                          + '/'
                          + properties.dbname;

//IMPORT MONGO
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConn, {
  useMongoClient: true,
  /* other options */
});

var db = mongoose.connection;
var Transaction = require('./models/transaction.js');
var User = require('./models/user.js');

//MONGO LOGs
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//------ APIs DEFINITION -------
app.use(session({
  secret: properties.apikey,
  saveUninitialized: false,
  resave: false,
  name: "id",
  cookie:{
          path: '/',
          httpOnly: true,
          secure: true,
          maxAge: 2 * 24 * 60 * 60 * 1000
         }, //2 days in miliseconds
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 2 * 24 * 60 * 60 //2 days in seconds
  })
}));

//---> LOGIN
app.post('/login', function(req, res) {

  var user = req.body;
  var userEmail = user[0].email;
  var userPass = user[0].password;

  User.find({ "email" : userEmail, "password" : userPass }).exec(function(err, users) {
    try {

      var emailChecked = users[0].email;

    } catch (e) {
      err = "LOGIN FAILED";
    }
    if(err) {
      console.log("ERROR: [GET LOGIN] ", err);
      res.status(500);
    }
    res.json(users);
  })
});

//---> CREATE TRANSACTION
app.post('/transaction', function(req, res) {
  var transaction = req.body;
  var userTo = transaction[0].to;
  var userFrom = transaction[0].from;
  var amount = transaction[0].amount;
  var minusAmount = -1 * amount;

  console.log("TO: " + userTo + ", FROM: " + userFrom + ", TOTAL: " + amount);

  //Check if userFROM have credit
  User.findById(userFrom).exec(function(err, user1) {
    if(err) {
      console.log("ERROR: [GET USER FROM] ", err);
    }
    //Check Current userFrom balance
    var balanceFrom = user1.balance;
    console.log("START: " + balanceFrom);
    //If the amount is valid update it on userTo and remove it from userFrom
    if (amount <= balanceFrom && amount > 0) {
      User.findOneAndUpdate( { _id : userFrom }, { $inc: { "balance" : minusAmount } }, {upsert : true}).exec(function(err, user1) {
        if(err) {
          console.log("ERROR: [UPDATING USER FROM] ", err);
        }
        console.log("SUCESSO: " + userFrom + ", value " + minusAmount);
      })

      User.findOneAndUpdate({ _id : userTo }, { $inc: { "balance" : amount } }, { upsert : true }).exec(function(err, user2) {
        if(err) {
          console.log("ERROR: [UPDATING USER TO] ", err);
        }
        console.log("SUCESSO: " + userTo + ", value " + amount);
      })

      Transaction.create(transaction, function(err, transactions) {
       if(err) {
         console.log("ERROR: [CREATE TRANSACTION] ", err);
       }
       res.json(transactions);
     })
   } else {
     err = "INVALID TRANSACTION";
     res.status(500);
   }
  })

})

//---> CREATE USER
app.post('/user', function(req, res) {
  var user = req.body;

  User.create(user, function(err, users) {
    if(err) {
      console.log("ERROR: [CREATE USER] ", err);
    }
    res.json(users);
  })
});

//---> GET USER
app.get('/user', function(req, res) {
  User.find().sort("-balance").exec(function(err, users) {
    if(err) {
      console.log("ERROR: [GET USER] ", err);
    }
    res.json(users);
  })
});

//---> DELETE USER
app.delete('/user/:_id', function(req, res) {
  var query = {_id: req.params._id};
  User.remove(query, function(err, users) {
    if(err) {
      console.log("ERROR: [DELETE USER] ", err);
    }
    res.json(users);
  })
});

//---> UPDATE USER
app.put('/user/:_id', function(req, res) {
  var user = req.user;
  var query = req.params._id;

  //In case the field does not exists
  var update = {
    '$set':{
      balance:user.balance
    }
  };

  //When TRUE, return the updated document
  var options = {new: true};

  User.findOneAndUpdate(query, update, options, function(err, users) {
    if(err) {
      console.log("ERROR: [FINDING USER BY ID] ", err);
    }
    res.json(users);
  });

});
// END APIs

app.listen(3001, function(err){
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
});
