var express = require('express');
var config = require('./config')();


// Globals ---------------------------------------------------------------------
var PORT = config.port;
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging ---------------------------------------------------------------------
var winston = require('winston');
var format = winston.format;
const { combine, timestamp, label, printf } = format;
var formatPattern = printf(function(info){
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

function registerLogger(lbl, level){
  winston.loggers.add(lbl, {
    level: level,
    transports: [new winston.transports.Console()],
    format: combine( label({label: lbl}), timestamp(), formatPattern )
  });
}

registerLogger('app', config.logging.default);
registerLogger('routes', config.logging.routes);
registerLogger('services', config.logging.services);

// Routes ---------------------------------------------------------------------
var index = require('./routes/index');
var github = require('./routes/github');

app.use('/', index);
app.use('/github', github);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = (process.env.NODE_ENV || 'development') === 'development' ? err : {};
  winston.loggers.get('app').error(err);
  res.status(err.status || 500).json({success: false, message: `${res.locals.error}`});
});

// Start the server ------------------------------------------------------------
app.listen(PORT, function () {
  winston.loggers.get('app').info(`${config.application.name || 'Application'} listening on port ${PORT}`);
});
