require('babel-core/register')({
  'presets': ['es2015', 'react', 'stage-1'],
});

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');

// PROXY
const httpProxy = require('http-proxy');

// REQUEST HANDLER FOR SERVER-SIDE RENDERING
const requestHandler = require('./requestHandler.js');

const app = express();

// PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001',
});

app.use('/api', function appProxy(req, res) {
  apiProxy.web(req, res);
});

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// USE EJS
app.set('view engine', 'ejs');

app.use(requestHandler);

// catch 404 and forward to error handler
app.use(function appError(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function appError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next(err);
});

module.exports = app;
