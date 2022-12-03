const ExternalUser = require("../models/users/ExternalUser");

const seedExternalUser = [
    {
        username: "Bob and Linda",
        email: "bob_linda@mail.com",
        password: "welcome123",
        company: false,
        details: [
            {name: "Bob", contact: "90081221"},
            {name: "Linda", contact: "90081221"},
        ],
        admin: false,
        accountType: "client"
    },
    {
        username: "Ed and Kelly",
        email: "ed_kelly@mail.com",
        password: "welcome123",
        company: false,
        details: [
            {name: "Ed", contact: "90081221"},
            {name: "Kelly", contact: "90081221"},
        ],
        admin: false,
        accountType: "client"
    },
    {
        username: "We Sell Bags",
        email: "we_sell_bags@mail.com",
        password: "welcome123",
        company: true,
        details: [
            {name: "Jane", contact: "90081221"},
            {name: "Megan", contact: "90081221"},
        ],
        admin: false,
        accountType: "client"
    },
    {
        username: "Nice Florist Co.",
        email: "nice_florist@mail.com",
        password: "welcome123",
        company: true,
        details: [
            {name: "Joe", contact: "90081221"},
            {name: "Elle", contact: "90081221"},
        ],
        admin: false,
        accountType: "vendor"
    },
    {
        username: "Best Carpenter Co.",
        email: "best_carpenter@mail.com",
        password: "welcome123",
        company: true,
        details: [
            {name: "Brandon", contact: "90081221"}
        ],
        admin: false,
        accountType: "vendor"
    }
];

module.exports = seedExternalUser;