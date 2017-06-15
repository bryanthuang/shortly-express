const parseCookies = (req, res, next) => {
  var obj = {};
  if (req.headers.cookie !== undefined) {
    let cookiePairs = req.headers.cookie.split('; ').map((cookie) => {
      return cookie.split('=');
    });
    for (let i = 0; i < cookiePairs.length; i++) {
      obj[cookiePairs[i][0]] = cookiePairs[i][1];
    }
  } 
  req.cookies = obj;
  next();
};

module.exports = parseCookies;