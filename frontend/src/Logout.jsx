import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'

class Logout extends Component {
    render() {
        this.logout();
        window.location.href = "/login";
        return(
            <div>
            </div>
        )
    }
    
    // handles the submission of a form using the handleSubmit method passed through props
    logout = () => {
        // DEBUG
        // console.log(this.state)
        // this.props.handleSubmit(this.state)
        sessionStorage.removeItem("user")
        console.log(sessionStorage.getItem("user"))
    }
}

export default Logout