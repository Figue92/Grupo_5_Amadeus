require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors')

const passport = require('passport');


const {loginGoogleInitialize} = require('./services/passport')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos');
const authRouter = require('./routes/auth');




const productosApiRouter = require('./routes/v1/apiProductos');
const usersApiRouter = require('./routes/v1/apiUsers');
const apiMainRouter = require('./routes/v1/apiMain');
const apiCategoryRouter = require('./routes/v1/apiCategory')
const apiBrandRouter = require('./routes/v1/apiBrands')
const cartApiRouter = require('./routes/v1/cartApi');
const apiFavoritesRouter = require('./routes/v1/apiFavorites')
const ordersRouter = require('./routes/v1/orders');

const localUserCheck = require('./middlewares/localsUserCheck');
const cookieCheck = require('./middlewares/cookieCheck');

loginGoogleInitialize();

const app = express();
app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use(cookieParser())
.use(express.static(path.join(__dirname, '..', 'public')))
.use(methodOverride('_method'))
.use(session({secret : "amdGrupo5", resave : true, saveUninitialized : true}))
.use(cookieCheck)
.use(localUserCheck)
.use(cors())
.use(passport.initialize())
.use(passport.session())
/* para pasarle keywords a todas las vistas ya que utilizan el buscador */
.use((req, res, next) => {
  res.locals.keywords = req.query.keywords || null;
  next();
});



app
.use('/', indexRouter)
.use('/users', usersRouter)
.use('/productos', productosRouter)
.use('/auth', authRouter)
.use('/api/productos',productosApiRouter)
.use('/api/users', usersApiRouter)
.use('/api/apiMain', apiMainRouter)
.use('/api/categorias', apiCategoryRouter)
.use('/api/cart', cartApiRouter)
.use('/api/favorites', apiFavoritesRouter)
.use('/api/marcas', apiBrandRouter)
.use('/api/orders', ordersRouter)




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
