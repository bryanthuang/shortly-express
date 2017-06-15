const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
// console.log(res) 
  return models.Sessions.create(req.cookies)
  .then(success => {
    console.log('current cookie', req.cookies);
    console.log(req.header);
    return models.Sessions.get(req.cookies)
    .then(session => {
      req.session = {hash: session.hash};
    })
    .catch(err => {
      console.log('error first catch');
      throw err;
    }); 
  })
  .catch(err => {
    console.log('second catchs');
    throw err;
  });
  
  next();
};
  
  //get hash from db
  // req.session = {hash: req.cookies};
  // console.log(req);


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

