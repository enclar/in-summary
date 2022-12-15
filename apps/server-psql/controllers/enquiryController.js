// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for enquiry controller" });
});

// create new enquiry
router.post("/new", async (req, res) => {
    try {
        const newEnquiry = await prisma.enquiry.create(
            { data: req.body }
        );
        res.status(201).json(newEnquiry);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// get all enquiries
router.get("/all", authorization, async (req, res) => {
    try {
        const enquiries = await prisma.enquiry.findMany({
            include: { followUpBy: true }
        });

        if (!enquiries) {
            res.status(400).json({ error: "No enquiries found"});
        } else {
            res.status(200).json(enquiries);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

// update enquiry when follow up has been done
router.put("/update/:id", authorization, async (req, res) => {
    try {
        const updatedEnquiry = await prisma.enquiry.update({
            where: {
                id: req.params.id
            },
            data: {
                followUp: true,
                staffId: req.body.staffId
            },
            include: { followUpBy: true }
        });

        if (!updatedEnquiry) {
            res.status(401).json({ error: "Unable to update enquiry" });
        } else {
            res.status(200).json(updatedEnquiry);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;