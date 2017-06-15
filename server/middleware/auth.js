const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
// console.log(res) 

  return models.Sessions.create(req.cookies)
  .then(success => {
    return models.Sessions.get({id: success.insertId})
    .then(session => {
      req.session = {hash: session.hash};
      console.log(req.session, 'session right now');
    })
    .catch(err => {
      console.log('error first catch');
    }); 
  })
  .catch(err => {
    console.log('second catchs');
  });
  
  next();
};
  
  //get hash from db
  // req.session = {hash: req.cookies};
  // console.log(req);


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

