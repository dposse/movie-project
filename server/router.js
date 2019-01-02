const Authentication = require('./controllers/authentication');
const WatchList = require('./controllers/watchList');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/auth/signin', requireSignin, Authentication.signin);
  app.post('/auth/signup', Authentication.signup);
  app.post('/api/watchlist', requireAuth, WatchList.addMovieToList);
}
