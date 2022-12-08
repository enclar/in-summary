require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtGenerator = (id) => {
    const payload = {
        user: id
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = jwtGenerator;