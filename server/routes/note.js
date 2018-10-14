const router = require("express-promise-router")();
const database = require("../database");
const util = require("util");

function requireNoteId(req) {
    const noteId = req.body.noteId;
    
    if(noteId === undefined) {
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
    for(const note of notes) {
        const plainNote = note.get({
            plain: true
        });
        
        response.push(plainNote);
    }
    
    res.status(200).send(response);
});

router.delete("/", async (req, res) => {
    const noteId = requireNoteId(req);
   
    await database.Note.destroy({
        where: {
            noteId,
            userId: req.session.userId
        }
    })
});

router.put("/", async (req, res) => {
    const noteId = requireNoteId(req);
    
    await database.Note.create({
        noteId,
        userId: req.session.userId,
    });
    
    res.status(200).send();
});

router.patch("/", async (req, res) => {
    const noteId = requireNoteId(req);
    let contents = req.body.contents;
    
    if(contents === undefined) {
        throw new util.UserError("Please provide new contents for this note", 400);
    }
    
    contents.toString();
    
    const updatedRows = await database.Note.update({
        userId: req.session.userId,
        noteId
    }, {
        contents
    });
    
    if(updatedRows === 0) {
        throw new util.UserError("Did not find a note to update", 404);
    }
    
    res.status(200).send();
});

module.exports = router;
