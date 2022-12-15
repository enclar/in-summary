// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for inventory controller" });
});

// get all inventory items
router.get("/all", authorization, async (req, res) => {
    try {
        const availItems = await prisma.inventory.findMany({
            where: { canBeUsed: true }
        });

        const unavailItems = await prisma.inventory.findMany({
            where: { canBeUsed: false }
        });

        const items = availItems.concat(unavailItems);

        if (!items) {
            res.status(401).json({ error: "No items found" });
        } else {
            res.status(200).json(items);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// add a new inventory item
router.post("/new", authorization, async (req, res) => {
    try {
        const newItem = await prisma.inventory.create({
            data: req.body
        });

        if (!newItem) {
            res.status(401).json({ error: "Unable to add new inventory item" });
        } else {
            res.status(201).json(newItem);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// update an inventory item
router.put("/update/:id", authorization, async (req, res) => {
    try {
        const updatedItem = await prisma.inventory.update({
            where: req.params,
            data: req.body
        });

        if (!updatedItem) {
            res.status(400).json({ error: "Unable to update inventory item"});
        } else {
            res.status(200).json(updatedItem);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;