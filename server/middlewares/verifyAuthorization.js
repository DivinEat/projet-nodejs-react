module.exports = function verifyAuthorization(req, res, next) {
  const authorization = req.headers["Authorization"];
  if (!authorization) res.sendStatus(401);
  const [type, token] = authorization.split(/\s+/);
  if (!["BASIC", "BEARER"].includes(type)) res.sendStatus(401);
  switch (type) {
    case "BASIC":
      ///...
      // if(!validCredentials(token)) res.sendStatus(403);
      // req.merchant = merchant
      break;
    case "BEARER":
      //....
      // if(!validJWT(token)) res.sendStatus(403);
      // req.user = user
      // req.merchant = user.merchant
      break;
  }
  next();
};
