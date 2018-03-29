var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');
var login=require('./routes/login');
var modifypsd=require('./routes/modifypsd');
var manager=require('./routes/manager');
var banner=require('./routes/banner');
var product=require('./routes/product');
var pic=require('./routes/pic');
var webmsg=require('./routes/webmsg');

//供调用
var productapi = require('./api/product');
var bannerapi = require('./api/banner');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//设置跨域权限
app.all("*", function(req,res,next){
  res.header('Access-Control-Allow-Origin',"*");
  next()
})



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use(session({ 
	 secret: 'recommend 128 bytes random string',  
	cookie: { maxAge: 200 * 60 * 1000 },  
	resave: true,  
	saveUnintialized: true
}))


app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/modifypsd', modifypsd);
app.use('/manager', manager);
app.use('/banner', banner);
app.use('/product', product);
app.use('/pic', pic);
app.use('/webmsg', webmsg);

//供前端调用的接口
app.use('/api/banner', bannerapi);
app.use('/api/product', productapi);



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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
