const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const config = require('../../config/config');
const { User } = require('../../models');

const StrategyJWT = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.development.jwt_secret
};

passport.use(new StrategyJWT(jwtOptions, async (jwtPayload, done) => {
    const user = await User.findOne({ where: { id: jwtPayload.id } });
    if (user) {
        return done(null, { ...jwtPayload, role: user.role });
    } else {
        return done(null, false);
    }
}));

module.exports = passport;