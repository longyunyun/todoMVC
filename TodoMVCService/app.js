var vertoken = require('./public/javascripts/token_vertify.js');
var expressJwt = require('express-jwt');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('./config/mongoose.js');
var db = mongoose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');

var app = express();

var bodyParser = require('body-parser')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var cors = require('cors')   
//引入cors模块之后，在终端用命令安装cors模块
//安装cors的命令   $ cnpm i cors -S

app.use( cors ({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}) )
// 解析token获取用户信息
app.use(function(req, res, next) {
	var token = req.headers['authorization'];
	if(token == undefined){
		return next();
	}else{
		vertoken.verToken(token).then((data)=> {
      req.data = data;
     
			return next();
		}).catch((error)=>{
			return next();
		})
	}
});

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: 'mes_qdhd_mobile_xhykjyxgs'
}).unless({
  path: ['/users/login','/users/register','/'],//登录和注册不验证
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

//当token失效返回提示信息
app.use(function(err, req, res, next) {
	if (err.status == 401) {
		return res.status(401).send('token失效');
	}
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
