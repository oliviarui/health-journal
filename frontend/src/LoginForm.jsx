import React, { Component } from 'react'


class LoginForm extends Component {
    initialState = {
        username: '',
        password: ''
    }
    // set the initial state of the input elements to be empty
    state = this.initialState

    render() {
        // access the values from the state
        const username = this.state.username
        const password = this.state.password
        if(sessionStorage.getItem('user')!=null){
            window.location.href = "/";
        }
        else{
        return(
            
            // return the form element that has been created
            <body className="log">
        <div class="register">
            <div class="reg-logo">
                <svg width="175" height="80" viewBox="0 0 175 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M149 62V32C148.623 28.1905 145.83 22 137.679 22C129.981 22 126.208 23.619 125 32V62" stroke="#D9D9D9" stroke-width="10"/>
                <path d="M45 19V49C45.3774 52.8095 48.1698 59 56.3208 59C64.0189 59 67.7925 57.381 69 49V19" stroke="#D9D9D9" stroke-width="10"/>
                <path d="M23 19V67.5C22 73.5 16.5 74.5 14.5 74.5C12.5 74.5 5.4 75.1 5 67.5" stroke="#D9D9D9" stroke-width="10"/>
                <path d="M90 62V31.3246C90.1667 29.2476 92 24.5 98.5 24C102.611 23.6838 107.5 24 109 28.9281" stroke="#D9D9D9" stroke-width="10"/>
                <path d="M170 0V62" stroke="#D9D9D9" stroke-width="10"/>
                <circle cx="45" cy="5" r="5" fill="#D9D9D9"/>
                <circle cx="69" cy="5" r="5" fill="#D9D9D9"/>
                <circle cx="125" cy="5" r="5" fill="#D9D9D9"/>
                <circle cx="150" cy="5" r="5" fill="#D9D9D9"/>
                </svg>
            </div>
            <div class="register-container">
            <h1> Login </h1>
            <br />
            <div class="user-pass">
            <form>
            username: <input
                type="text"
                name="username"
                id="log-username"
                class="form-control"
                value={username}
                onChange={this.handleChange} />
                <br  />
            password:<input
                type="password"
                name="password"
                id="log-password"
                class="form-control"
                value={password}
                onChange={this.handleChange} />
            <br />
            <div class="form-group">
            <input type="button" value="login" onClick={this.submitForm} class="register"/>

            </div>
            <div id="error-login"></div><br  />
            <div class="form-group">
                            <h2>
                            don't have an account? <br />
                            </h2>
                            <a href="/register">
                            <input type="button" class="register" value="create an account" />
                            </a>
                        </div>
            </form>
            </div>
            </div>
            </div>
            </body>
        );
        }
    }

    // runs every time a change is made to an input element to display the change to the user
    handleChange = (event) => {
        // gets the name and value from the input element
        const { name, value } = event.target
        // setting the state of Form to the correct key value pair (where value is the value inputted by the user)
        this.setState({
          [name]: value,
        })
      }
    
    // handles the submission of a form using the handleSubmit method passed through props
    submitForm = () => {
        // DEBUG
        // console.log(this.state)
        // this.props.handleSubmit(this.state)
        const input = this.state
        // DEBUG
        console.log('trying to log in user...')
        console.log(input)
        // communicate with server


        fetch('/login', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'mode':'cors'
        },
        body: JSON.stringify(input)
        })
        .then((response) => response.json())
        .then((result) => {
        // DEBUG
        console.log('login status:')
        console.log(result)
        if(result.success===false){
            document.getElementById("error-login").innerHTML="Incorrect username or password";
        }
        // update the state of the app
        // result.preventDefault();
        sessionStorage.setItem("user", result.user);
        console.log(sessionStorage.getItem('user'));
        if(result.user!=null){
            window.location.href = "/";
        }
        });
        
        this.setState(this.initialState) // clears input elements
        
        
    }
}

export default LoginForm