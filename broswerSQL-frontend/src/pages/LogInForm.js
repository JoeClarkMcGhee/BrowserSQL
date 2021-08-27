import {Component, createRef} from "react";

class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.usernameRef = createRef();
        this.passwordRef = createRef();
        this.submit = this.submit.bind(this)
        this.state = {
            invalidLogin: false
        }
    }

    submit(event) {
        event.preventDefault();
        const credentials = {
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value
        }
        fetch("http://127.0.0.1:8000/api/v1/dj-rest-auth/login/",
            {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    'Content-Type': "application/json",
                }
            }
        ).then((response) => {
            if (!response.ok) {
                this.setState({invalidLogin: true})
            } else {
                this.setState({invalidLogin: false})
                return response.json()
            }
        }).then((data) => {
            if (this.state.invalidLogin) return
            this.props.setToken(data.key)
            window.location.reload()
        })
    }

    render() {
        return (
            <div className="login-form">
                <h3>Please log in</h3>
                {this.state.invalidLogin ? <p>Invalid credentials</p> : null}
                <form onSubmit={this.submit}>
                    <label>
                        Username:
                        <input type="text" ref={this.usernameRef}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" ref={this.passwordRef}/>
                    </label>
                    <div>
                        <br/>
                        <button className="btn" type="submit">Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LogInForm;