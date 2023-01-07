import React, { Component } from 'react'

const d = new Date()

class WaterApp extends Component {
    initialState = {
        amount: '',
        date: d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
    }
    // set the initial state of the input elements to be empty
    state = this.initialState

    render() {
        // access the values from the state
        const amount = this.state.amount

        return(
            // return the form element that has been created
            <form>
            <label htmlFor="water">Water (in mL)</label>
            <input
                type="number"
                name="amount"
                id="water"
                value={amount}
                onChange={this.handleChange} />
            <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        )
    }

    // runs every time a change is made to an input element to display the change to the user
    handleChange = (event) => {
        // gets the name and value from the input element
        const { name, value } = event.target
        // setting the state of Form to the correct key value pair (where value is the value inputted by the user)
        // DEBUG
        // console.log(name + ' ' + value)
        this.setState({
          [name]: value,
        })
      }
    
    // handles the submission of a form using the handleSubmit method passed through props
    submitForm = () => {
        const input = {data: this.state, username: this.props.user}
        // DEBUG
        // console.log(input)
        fetch('/update-water', {
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
            console.log('water intake tracked:')
            console.log(result)
        })
        this.setState(this.initialState) // clears input elements
    }
}

export default WaterApp