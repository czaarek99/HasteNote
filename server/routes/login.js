const router = require("express-promise-router")();
const util = require("../util");
const bcrypt = require("bcrypt");
const database = require("../database");

const PASSWORD_MIN_LENGTH = 10;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

function verifyLoginBody(req) {
    let username = req.body.username;
    let password = req.body.password;
    
    if (username === undefined) {
        throw new util.UserError("Please provide a valid username", 400);
    } else if (password === undefined) {
        throw new util.UserError("Please provide a valid password", 400);
    }
    
    return {
        username: username.toString(),
        password: password.toString()
    }
}

function setLoggedIn(req, res, username) {
    req.session.loggedIn = true;
    res.cookie("loggedIn", true);
    res.cookie("username", username);
    res.status(200).send();
}

router.post("/login", async (req, res) => {
    const {username, password} = verifyLoginBody(req);
    
    const user = await database.User.findOne({
        where: {
            username
        }
    });
    
    if(user === null) {
        throw new util.UserError("No user with that username.", 404);
    }
    
    const passwordsAreEqual = await bcrypt.compare(password,
        user.password);
    
    if(passwordsAreEqual) {
        setLoggedIn(req, res, username);
    } else {
        throw new util.UserError("Wrong password!")
    }
    
});

router.post("/register", async (req, res) => {
    const {username, password} = verifyLoginBody(req);
    
    if (username.length < USERNAME_MIN_LENGTH) {
        throw new util.UserError(`Username is too short.
        It has to be at least ${USERNAME_MIN_LENGTH}
        characters long`, 400);
    } else if (username.length > USERNAME_MAX_LENGTH) {
        throw new util.UserError(`Username is too long.
        It should not be longer than ${USERNAME_MAX_LENGTH}
         characters`, 400);
    } else if (!password || password.length < PASSWORD_MIN_LENGTH) {
        throw new util.UserError(`Password is too short.
        It has to be at least ${PASSWORD_MIN_LENGTH}
         characters long`, 400);
    } else {
        const user = await database.User.findOne({
            where: {
                username
            }
        });
        
        if (user !== null) {
            throw new util.UserError("That username is taken. Try another one", 409);
        }
        
        const hashedPassword = await bcrypt.hash(password, 11);
        
        await database.User.create({
            username,
            password: hashedPassword
        });
        
        setLoggedIn(req, res, username);
    }
});

module.exports = router;
