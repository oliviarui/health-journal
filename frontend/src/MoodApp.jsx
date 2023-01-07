import React, { Component } from 'react'

const d = new Date()

class MoodApp extends Component {
    initialState = {
        moodScale: 5,
        moodWord: '',
        date: d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate()
    }
    // set the initial state of the input elements to be empty
    state = this.initialState

    render() {
        // access the values from the 
        const moodScale = this.state.moodScale
        const moodWord = this.state.moodWord

        return(
            // return the form element that has been created
            <form>
            <label htmlFor="moodScale">Rate your mood on a scale of 1 to 10</label>
            <input
                type="range" min="1" max="10" value={moodScale}
                name="moodScale"
                id="moodScale"
                onChange={this.handleChange} />
            <br />
            <label htmlFor="moodWord">Enter a word to describe how you are feeling today</label>
            <input
                type="text"
                name="moodWord"
                id="moodWord"
                value={moodWord}
                onChange={this.handleChange} />
            <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        )
    }

    // runs every time a change is made to an input element to display the change to the user
    handleChange = (event) => {
        // gets the name and value from the input element
        const { name, value } = event.target
        // setting the state to the correct key value pair (where value is the value inputted by the user)
        // DEBUG
        // console.log(name + ' ' + value)
        this.setState({
          [name]: value,
        })
      }
    
    // handles the submission of a form using the handleSubmit method passed through props
    submitForm = () => {
        const input = {moodScale: this.state.moodScale, moodWord: this.state.moodWord, date: this.state.date, username: this.props.user}
        // DEBUG
        // console.log(input)
        fetch('/update-mood', {
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
            console.log('mood tracked:')
            console.log(result)
        })
        this.setState(this.initialState) // clears input elements
    }
}

export default MoodApp