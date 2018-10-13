const Login = {};

const PASSWORD_MIN_LENGTH = 10;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;

Login.verifyRegistration = async (username, password) => {
    const result = {
        error: "",
        verified: false
    };
    
    if (username.length < USERNAME_MIN_LENGTH) {
        result.error = `Username has to be at least
        ${USERNAME_MIN_LENGTH} characters long`;
    } else if(username.length > USERNAME_MAX_LENGTH) {
        result.error = `Username can't be longer than
        ${USERNAME_MAX_LENGTH} characters`
    } else if (password.length < PASSWORD_MIN_LENGTH) {
        result.error = `Password has to be at least
        ${PASSWORD_MIN_LENGTH} characters long`;
    } else {
        result.verified = true;
    }
    
    return result;
};

module.exports = Login;
