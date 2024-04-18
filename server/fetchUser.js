let jwt=require('jsonwebtoken')
require('dotenv').config();

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({success:false,msg:'Please authenticate using a valid taoken'})
    }
    try {
        const data = jwt.verify(token,process.env.USER_KEY);
        req.user = data.user;
        next();
    } catch (error) {
       return res.status(401).json({success:false,msg:"Please authenticate using a valid token"})
    }

}


module.exports = fetchuser;