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
        let appContainerClasses = "appContainerLogin fillGrid ";
        if (this.state.loading) {
            appContainerClasses += "loading";
        }
        
        let loginErrorStyle = {
            display: "none"
        };
        
        if (this.state.error.length > 0) {
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
                       value={this.state.password} type="password"/>
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
    
    componentDidMount() {
        document.addEventListener("keydown", this.handleDocumentKeyDown);
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }
    
    handleDocumentKeyDown = (event) => {
        if(event.key === "Enter") {
            this.handleOnLogin();
        }
    };
    
    handleLoginInputChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };
    
    handlePasswordInputChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };
    
    setLoading = (loading) => {
        this.setState({loading});
    };
    
    handleOnRegister = async () => {
        await this.handleOnRegisterAndLogin("register")
    };
    
    handleOnLogin = async () => {
        await this.handleOnRegisterAndLogin("login");
    };
    
    handleOnRegisterAndLogin = async (type) => {
        this.setLoading(true);
        
        const body = new URLSearchParams();
        body.set("username", this.state.username);
        body.set("password", this.state.password);
        
        const response = await fetch("/login/" + type, {
            method: "POST",
            body
        });
        
        if (response.status === 200) {
            window.location.reload();
        } else {
            const responseText = await response.text();
            this.showError(responseText);
        }
    };
    
    showError = (error) => {
        this.setState({
            error,
            loading: false
        });
    };
}

export default UserLogin;