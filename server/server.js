const express = require("express");
const app = express();
const database = require("./database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const util = require("./util");
const port = process.env.PORT || 5000;

const loginRoute = require("./routes/login");

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
    
    app.use((error, req, res, next) => {
        if(error instanceof util.UserError) {
            res.status(error.statusCode).send(error.message);
        }
        
        //TODO: Add error handling for other errors
    });
    
    app.listen(port);
}

startServer();

