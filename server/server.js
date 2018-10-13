const express = require("express");
const app = express();
const database = require("./database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;

async function startServer() {
    await database.sequelize.sync({
        force: false
    });
    
    app.use(cookieParser());
    
    const SequelizeStore =
        require("connect-session-sequelize")(session.Store);
    
    const store = new SequelizeStore({
        db: database.sequelize
    });
    
    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: "yAmoedgPiiNCxVvSfJ3j",
        store,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    }));
    
    app.get("/test", (req, res) => {
        res.send("Working fine");
    });
    
    app.listen(port);
}

startServer();

