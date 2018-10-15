const express = require("express");
const app = express();
const database = require("./database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const util = require("./util");
const path = require("path");
const port = process.env.PORT || 5000;

const loginRoute = require("./routes/login");
const noteRoute = require("./routes/note");

async function startServer() {
    await database.sequelize.sync({
        force: false
    });
    
    app.use(cookieParser());
    
    app.use("/", bodyParser.json());
    app.use("/", bodyParser.urlencoded({
        extended: false
    }));
    
    const SequelizeStore =
        require("connect-session-sequelize")(session.Store);
    
    const store = new SequelizeStore({
        db: database.sequelize
    });
    
    await store.sync();
    
    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: "yAmoedgPiiNCxVvSfJ3j",
        store,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    }));
    
    app.use("/login", loginRoute);
    app.use("/note", noteRoute);
    
    if(process.env.NODE_ENV === "production") {
        const root = path.join(__dirname, "..", "build");
        app.use(express.static(root));
        
        app.use((req, res) => {
            res.sendFile("index.html", {root});
        });
        
    }
    
    app.use(async (error, req, res, next) => {
        if(error instanceof util.UserError) {
            res.status(error.statusCode).send(error.message);
        } else if(error.status !== 400){
            try {
                const logged = await database.logAction(req, "websiteError");
                res.status(500).send("A critical server error occurred. Error id: " + logged.id);
            } catch(error) {
                res.status(500).send("A critical server error occurred. Failed to log");
            }
        }
    });
    
    app.listen(port);
}

startServer();

