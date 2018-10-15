const router = require("express-promise-router")();
const database = require("../database");
const util = require("../util");

const NOTE_NAME_MAX_LENGTH = 32;
const MAX_NOTE_AMOUNT = 100;

function requireNoteId(req) {
    const noteId = req.body.noteId;
    
    if (noteId === undefined) {
        throw new util.UserError("Please provide a noteId for this action", 400);
    }
    
    return noteId;
}

router.all("*", (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        throw new util.UserError("This route can only be accessed after logging in", 401)
    }
});

router.get("/all", async (req, res) => {
    const notes = await database.Note.findAll({
        where: {
            userId: req.session.userId
        }
    }, {
        plain: true
    });
    
    res.status(200).send(notes);
});

router.delete("/", async (req, res) => {
    const noteId = requireNoteId(req);
    
    const destroyedRows = await database.Note.destroy({
        where: {
            noteId,
            userId: req.session.userId
        }
    });
    
    if (destroyedRows === 0) {
        throw new util.UserError("No note found with that id", 404);
    } else {
        res.status(200).send();
    }
});

router.put("/", async (req, res) => {
    const noteId = requireNoteId(req);
    const noteCount = await database.Note.count({
        where: {
            userId: req.session.userId
        }
    });
    
    if(noteCount >= MAX_NOTE_AMOUNT) {
        throw new util.UserError("Max note amount already reached", 400);
    }
    
    await database.Note.create({
        noteId,
        userId: req.session.userId,
    });
    
    res.status(200).send();
});

router.patch("/contents", async (req, res) => {
    const noteId = requireNoteId(req);
    let contents = req.body.contents;
    
    if (contents === undefined) {
        throw new util.UserError("Please provide new contents for this note", 400);
    }
    
    contents = contents.toString();
    
    await database.Note.update({
        contents
    }, {
        where: {
            userId: req.session.userId,
            noteId
        }
    });
    
    res.status(200).send();
});

router.patch("/name", async (req, res) => {
    const noteId = requireNoteId(req);
    let name = req.body.name;
    
    name = name.toString();
    if(name.length > NOTE_NAME_MAX_LENGTH) {
        name = name.substr(0, NOTE_NAME_MAX_LENGTH);
    }
    
    await database.Note.update({
        name
    }, {
        where: {
            userId: req.session.userId,
            noteId
        }
    });
    
    res.status(200).send();
});

module.exports = router;
