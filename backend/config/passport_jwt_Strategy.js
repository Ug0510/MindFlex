const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../model/student');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'udit_gupta', //secret key
};

const configurePassportJWT = () => {
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const student = await Student.findById(payload.sub);
        if (student) {
          return done(null, student);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

module.exports = configurePassportJWT;
