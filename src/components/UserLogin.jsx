import React, {Component} from 'react';
import "../styles/userLogin.scss"

class UserLogin extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            password: "",
            loading: false,
            error: ""
        }
    }
    
    render() {
        let appContainerClasses = "appContainerLogin ";
        if(this.state.loading) {
            appContainerClasses += "loading";
        }
        
        let loginErrorStyle = {
            display: "none"
        };
        
        if(this.state.error.length > 0) {
            loginErrorStyle.display = "block";
        }
        
        return (
            <section className={appContainerClasses}>
                <p className="signInText">Sign in or Register</p>
                <input className="usernameInput"
                       placeholder="Username"
                       onChange={this.handleLoginInputChange}
                       value={this.state.username}/>
                <input className="passwordInput"
                       placeholder="Password"
                       onChange={this.handlePasswordInputChange}
                       value={this.state.password} type="password" />
                <p className="loginError" style={loginErrorStyle}>{this.state.error}</p>
                <div className="actionContainer">
                    <button className="loginButton"
                            onClick={this.handleOnLogin}>
                        Login
                    </button>
                    <button className="registerButton"
                            onClick={this.handleOnRegister}>
                        Register
                    </button>
                </div>
            </section>
        );
    }
   
    handleLoginInputChange = (event) => {
        const state = {...this.state};
        state.username = event.target.value;
        this.setState(state);
    };
    
    handlePasswordInputChange = (event) => {
        const state = {...this.state};
        state.password = event.target.value;
        this.setState(state);
    };
    
    setLoading = (loading) => {
        const state = {...this.state};
        state.loading = loading;
        this.setState(state);
    };
    
    handleOnRegister = async () => {
        const {username, password} = this.state;
        if(username.length < 3) {
            this.showError("Username has to be at least 3 characters long");
        } else if(password.length < 10) {
            this.showError("Password has to be at least 10 characters long");
        } else {
            this.setLoading(true);
        }
    };
    
    handleOnLogin = async () => {
        this.setLoading(true)
    };
    
    showError = (error) => {
        const state = {...this.state};
        state.error = error;
        this.setState(state);
    };
}

export default UserLogin;