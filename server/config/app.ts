import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

import indexRouter from '../routes';
import usersRouter from '../routes/users';

//modules for authenctication.
import session from "express-session"
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'flash';

let localStrategy = passportLocal.Startegy;

import User from '../models/user';


const app = express();

import * as DBConfig from './db'
mongoose.connect(DBConfig.LocalURI);

const db = mongoose.connection;
db.on("error",function(){
  console.error("connection error");
});

db.once("open",function(){
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(session({
  secret: DBConfig.SessionSecret,
  saveUninitialized:false,
  resave:false
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
//implement authentication strategy
passport.use(User.createStrategy());

//serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err : createError.HttpError , req : express.Request, res: express.Response, next : NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
