const Staff = require("../models/Staff");

const seedStaff = [
    {
        firstName: "Anne",
        lastName: "Lee",
        email: "anne_lee@mail.com",
        password: "welcome123",
        access: 0,
        type: "staff"
    },
    {
        firstName: "Jack",
        lastName: "Ng",
        email: "jack_ng@mail.com",
        password: "welcome123",
        access: 0,
        type: "staff"
    },
    {
        firstName: "Clare",
        lastName: "Lee",
        email: "clare_lee@mail.com",
        password: "welcome123",
        access: 0,
        type: "staff"
    },
    {
        firstName: "Joyce",
        lastName: "Wong",
        email: "joyce_wong@mail.com",
        password: "welcome123",
        access: 1,
        type: "staff"
    },
    {
        firstName: "Christopher",
        lastName: "Teo",
        email: "chris_teo@mail.com",
        password: "welcome123",
        access: 1,
        type: "staff"
    }
];

module.exports = seedStaff;