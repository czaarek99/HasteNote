const router = require("express-promise-router")();
const database = require("../database");
const util = require("../util");

function requireNoteId(req) {
    const noteId = req.body.noteId;
    
    if (noteId === undefined) {
        throw new util.UserError("Please provide a noteId for this action", 400);
    }
    
    return noteId;
}

router.get("/all", async (req, res) => {
    const notes = await database.Note.findAll({
        where: {
            userId: req.session.userId
        }
    });
    
    const response = [];
    for (const note of notes) {
        const plainNote = note.get({
            plain: true
        });
        
        //TODO: Should probably be handled globally by app
        plainNote.renaming = false;
        plainNote.saving = false;
        
        response.push(plainNote);
    }
    
    res.status(200).send(response);
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
