const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');


module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'id', // 사용자 아이디 필드 이름
    passwordField: 'password' // 사용자 비밀번호 필드 이름
  }, async (id, password, done) => {
    try {
      const user = await User.findByPk(id) // 수정된 부분

      if (!user) {
        return done(null, false, { message: '가입되지 않은 회원입니다.' });
      }

      // 비밀번호 확인
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user); // 인증 성공
      } else {
        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }
    } catch (error) {
      console.error('Passport Local Strategy Error:', error);
      return done(error); // 에러 처리
    }
  }));
};
