require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const passport = require('passport');
const initializePassport = require('./database/config/passport');
initializePassport();




const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos');
const authRouter = require('./routes/auth');


const productosApiRouter = require('./routes/v1/apiProductos');
const usersApiRouter = require('./routes/v1/apiUsers');
const cartApiRouter = require('./routes/v1/apiCart')

const localUserCheck = require('./middlewares/localsUserCheck');
const cookieCheck = require('./middlewares/cookieCheck');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));
app.use(session({secret : "amdGrupo5", resave : true, saveUninitialized : true}))
app.use(cookieCheck)
app.use(localUserCheck)
app.use(passport.initialize())
app.use(passport.session());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/auth', authRouter);

//Api Routes
app.use('/api/productos',productosApiRouter)
app.use('/api/users', usersApiRouter);
/* app.use('/api/carrito/productos', cartApiRouter); */



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
