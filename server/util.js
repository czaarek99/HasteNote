const util = {};

util.UserError = class UserError extends Error {
    
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

module.exports = util;
