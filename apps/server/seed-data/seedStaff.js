const Staff = require("../models/users/Staff")

const seedStaff = [
    {
        username: "Anne Lee",
        email: "anne_lee@mail.com",
        password: "welcome123",
        contact: "90081221",
        admin: false,
        type: "staff"
    },
    {
        username: "Jack Ng",
        email: "jack_ng@mail.com",
        password: "welcome123",
        contact: "90081221",
        admin: false,
        type: "staff"
    },
    {
        username: "Clare Lee",
        email: "clare_lee@mail.com",
        password: "welcome123",
        contact: "90081221",
        admin: true,
        type: "staff"
    },
    {
        username: "Joyce Wong",
        email: "joyce_wong@mail.com",
        password: "welcome123",
        contact: "90081221",
        admin: true,
        type: "staff"
    },
    {
        username: "Chris Teo",
        email: "chris_teo@mail.com",
        password: "welcome123",
        contact: "90081221",
        admin: true,
        type: "staff"
    }
];

module.exports = seedStaff;