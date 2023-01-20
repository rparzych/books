const express  = require('express');
const usersActions = require("../actions/users.ts");

const router = express.Router();

router.get('/', function(req, res){
  res.redirect('users/login');
});

router.get('/login', function(req, res){
  res.locals.message = '';
  res.locals.description = 'Try accessing restricted area, please authenticate with "rpa" and "test".';
  res.locals.formAction = 'users/login';
  res.locals.buttonValue = 'Login';
  res.render('login');
});

router.get('/register', function(req, res){
  res.locals.message = '';
  res.locals.description = '';
  res.locals.formAction = 'users/register';
  res.locals.buttonValue = 'Register';
  res.render('login');
});

router.post('/login', async function (req, res, next) {
  console.log('req.body', req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({code: 400, message: 'Missing Username or Password'}).end();
  } else if (!await usersActions.isUserExist(username)) {
    res.status(400).json({code: 400, message: 'Entered Username is not exist'}).end();
  } else {
    await usersActions.login(username, password);
  }
});

router.post('/register', async function (req, res, next) {
  console.log('req.body', req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({code: 400, message: 'Missing Username or Password'}).end();
  } else if (await usersActions.isUserExist(username)) {
    res.status(400).json({code: 400, message: 'Entered Username is already exist'}).end();
  } else {
    await usersActions.addUser(username, password);
    if (await usersActions.isUserExist(username)) {
      res.status(201);
    } else {
      res.status(500).json({code: 500, message: 'Something went wrong'}).end();
    }
  }
});

module.exports = router;
