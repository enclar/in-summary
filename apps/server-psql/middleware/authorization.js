const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header("token");

    if (!token) {
        res.status(403).json({ error: "Authorization denied" });
    } else {
        try {
            const verify = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = verify.user;
            next();
    
        } catch (error) {
            res.status(401).json({ error: "Token is not valid" });
        }
    }
};