const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Loki = require("lokijs");
const { MinLength, MaxLength } = require('class-validator');

const db = new Loki('booksApi.db');
const users = db.addCollection('users');
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

/* function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user
    next()
  });
} */

async function comparePassword(plaintextPassword, hash) {
  return bcrypt.compare(plaintextPassword, hash, async (err, result) => {
    console.log('comparePassword');
    return result;
  });
}

async function login(username, password) {
  console.log('login');
  const results = await users.find({ username: username });
  const isOk = await comparePassword(password, results[0].password);
  console.log('isOk', isOk);
  return isOk;
}

async function addUser(username, password) {
  console.log('addUser');
  console.log('username', username);
  await bcrypt.genSalt(10, async (err, salt) => {
    await bcrypt.hash(password, salt, function(err, hash) {
      console.log('hash', hash);
      const results = users.insert({
        username,
        password: hash,
      });
      users.update(results);
    });
  });
}

async function isUserExist(username) {
  console.log('isUserExist 2');
  const results = await users.find({ username: { '$eq': username }});
  console.log('results', results);
  console.log('results', results.length);
  return (Number(results?.length) === 1);
}

module.exports = {
  addUser,
  isUserExist,
  login,
}
