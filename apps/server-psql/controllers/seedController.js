// Dependancies
const router = require("express").Router();
const bcrypt = require("bcrypt");

// Seed Data
const seedEnquiries = require("../seed-data/seedEnquiries");
const seedStaff = require("../seed-data/seedStaff");
const seedContacts = require("../seed-data/seedContacts");
const seedClients = require("../seed-data/seedClients");
const seedVendors = require("../seed-data/seedVendors");
const seedProjects = require("../seed-data/seedProjects");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Encryption
const saltRounds = 10;

const encryptedStaff = seedStaff.map((staff) => (
    {
        ...staff,
        password:  bcrypt.hashSync(staff.password, saltRounds)
    }
));

const encryptedClients = seedClients.map((client) => (
    {
        ...client,
        password: bcrypt.hashSync(client.password, saltRounds)
    }
));

const encryptedVendors = seedVendors.map((vendor) => (
    {
        ...vendor,
        password: bcrypt.hashSync(vendor.password, saltRounds)
    }
));

// Routes
// seed enquiries
router.get("/enquiries", async (req, res) => {
    await prisma.enquiry.deleteMany();
    const enquiries = await prisma.enquiry.createMany({
        data: seedEnquiries,
    });
    res.status(201).json(enquiries);
});

// seed staff
router.get("/staff", async (req, res) => {
    await prisma.staff.deleteMany();
    const staff = await prisma.staff.createMany(
        { data: encryptedStaff }
    );
    res.status(201).json(staff);
});

// seed clients
router.get("/clients", async (req, res) => {
    await prisma.client.deleteMany();
    const clients = await prisma.client.createMany(
        { data: encryptedClients }
    );
    res.status(201).json(clients);
});

// seed vendors
router.get("/vendors", async (req, res) => {
    await prisma.vendor.deleteMany();
    const vendors = await prisma.vendor.createMany(
        { data: encryptedVendors }
    );
    res.status(201).json(vendors);
});

// seed contacts
router.get("/contacts", async (req, res) => {
    await prisma.contact.deleteMany();
    const contacts = await prisma.contact.createMany(
        { data: seedContacts }
    );
    res.status(201).json(contacts);
});

// seed projects
router.get("/projects", async (req, res) => {
    await prisma.project.deleteMany();
    const projects = await prisma.project.createMany(
        { data: seedProjects }
    );
    res.status(201).json(projects);
});

module.exports = router;