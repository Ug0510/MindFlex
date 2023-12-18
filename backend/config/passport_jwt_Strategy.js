const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Student = require('../model/student');
const Teacher = require('../model/teacher');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'udit_gupta', // Replace with your secret key
};

const configurePassportJWT = () => {
  // Student JWT strategy
  passport.use('student-jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const student = await Student.findById(payload.studentId);
      if (student) {
        return done(null, student);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));

  // Teacher JWT strategy
  passport.use('teacher-jwt', new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const teacher = await Teacher.findById(payload.sub);
      if (teacher) {
        return done(null, teacher);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
};

module.exports = configurePassportJWT;
