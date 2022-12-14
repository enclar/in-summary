// Dependancies
const router = require("express").Router();
const authorization = require("../middleware/authorization");

// Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Routes
// test route
router.get("/test", (req, res) => {
    res.json({ msg: "test route for album controller" });
});

// create a new album
router.post("/new", authorization, async (req, res) => {
    try {
        const album = await prisma.album.create({
            data: req.body,
            include: { images: true }
        });

        if (!album) {
            res.status(401).json({ error: "Unable to create new album"});
        } else {
            res.status(201).json(album);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// add a new photo to an album
router.post("/new-img", authorization, async (req, res) => {
    try {
        const image = await prisma.image.create({
            data: req.body,
            include: { 
                album: {
                    include: { images: true }
                } }
        });

        if (!image) {
            res.status(401).json({ error: "Unable to add new photo" });
        } else {
            res.status(200).json(image);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// delete an image from the album
router.delete("/delete/:id", authorization, async (req, res) => {
    try {
        const deletedPhoto = await prisma.image.delete({
            where: req.params,
        });

        if (!deletedPhoto) {
            res.status(400).json({ error: "Unable to delete photo" });
        } else {
            res.status(200).json(deletedPhoto);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// update the name of an album
router.put("/edit-name/:id", authorization, async (req, res) => {
    try {
        const updatedAlbum = await prisma.album.update({
            where: req.params,
            data: req.body,
            include: {
                project: {
                    include: {
                        inCharge: true,
                        client: true,
                        checkpoints: {
                            orderBy: { date: "asc" }
                        },
                        vendors: true,
                        notes: true,
                        meetings: true,
                        tasks: {
                            orderBy: { dueBy: "asc" }
                        },
                        albums: {
                            include: { images: true }
                        }
                    }
                },
                images: true
            }
        });

        if (!updatedAlbum) {
            res.status(400).json({ error: "Unable to update album name" });
        } else {
            res.status(200).json(updatedAlbum);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Export
module.exports = router;