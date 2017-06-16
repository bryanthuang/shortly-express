const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  var identifier = req.get('User-Agent');
  Promise.resolve(req.cookies.shortlyid)
  .then(hash => {
    if (!hash) {
      throw hash;
    } 
    return models.Sessions.get({ hash });
  })
  .then(session => {
    if (!session) {
      throw session;
    }
    //validate session
    if (!models.Sessions.compare(identifier, session.hash, session.salt)) {
      return models.Sessions.delete({ hash: session.hash });
    }
    return session;
  })
  .catch(() => {
    return models.Sessions.create(identifier)
      .then(result => {
        return models.Sessions.get({id: result.insertId });
      });
  })
  .then(session => {
    res.cookie('shortlyid', session.hash);
    req.session = session;
    next();
  });

}; 


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

