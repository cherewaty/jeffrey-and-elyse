var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var nodemailer = require('nodemailer');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('views', './views');

app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Jeffrey and Elyse' });
});

app.get('/rsvp', function(req, res) {
  res.render('rsvp', { title: 'RSVP to Jeffrey and Elyse' });
});

app.post('/rsvp', function (req, res) {
  var mailOptions, smtpTransport;

  smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'gmail',
    auth: {
      user: 'jcherewaty@gmail.com',
      pass: 'gnylocncmrdhmzsa'
    }
  });

  mailOptions = {
    from: req.body.names + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
    to: 'rsvp@jeffreyandelyse.com',
    subject: 'RSVP from ' + req.body.names,
    text: req.body.names + '\n' + req.body.email + '\n' + req.body.coming + '\n' + req.body.comments
  };

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.render('rsvp', { title: 'RSVP to Jeffrey and Elyse', message: 'Error occured, RSVP not sent.', error: true, page: 'rsvp' })
    }
    else {
      res.render('rsvp-success', { title: 'RSVP Sent' })
    }
  });
});

module.exports = app;
