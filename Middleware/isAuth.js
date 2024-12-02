import jwt from "jsonwebtoken";
import reply from '../Common/reply.js'
const config = process.env.JWTSALT;
const isAuth = (req, res, next) => {
    const authHeader =
      req.body.token || req.query.token || req.get("Authorization");
      if(!authHeader)return res.json(reply.failed("Token is missing"))
      const token = authHeader?.split(' ')[1];
    if (!token) {
      return res.status(403).json(reply.failed('A token is required for authentication.!'));
    }
    try {
      const decoded = jwt.verify(token, config);
      if(!decoded) return res.status(401).json(reply.failed("Not authenticated...!"))
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  export default isAuth;