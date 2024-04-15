const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

//serializeUser - 로그인 성공한 유저 / deserializeUser - 페이지 방문하는 유저
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
