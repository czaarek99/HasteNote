const express = require("express");
const app = express();
const database = require("./database");
const port = process.env.PORT || 5000;

async function startServer() {
    await database.sequelize.sync({
        force: false
    });
    
    app.listen(port);
    
    app.get("/test", (req, res) => {
        res.send("Working fine");
    });
}

startServer();

