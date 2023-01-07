import React, { Component } from 'react'

const d = new Date()

class JournalApp extends Component {
    initialState = {
        streak: 0,
        date: d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
        prompts: [
            "What’s the one thing you couldn’t imagine your life without?",
            "What does unconditional love mean to you?",
            "How did you get where you are today?",
            "Describe yourself in 10 words",
            "What do you love about your life? ",
            "What are five things that you're grateful for?",
            "What is something funny that happened today?"
        ],
        moodScale: 5,
        moodWord: '',
        amount: ''
    }
    // set the initial state of the input elements to be empty
    state = this.initialState
    
    componentDidMount() {
        this.choosePrompt()
    }

    
    render() {
        const moodScale = this.state.moodScale
        const moodWord = this.state.moodWord
        const amount = this.state.amount
        if(sessionStorage.getItem('user')===null){
            window.location.href = "/login";
        }
        else{
        return(
            
            // return the form element that has been created
            <body class="new">
                <div class="ban">
                <div class ="back">
                    <a href="/">
                    <svg width="99" height="112" viewBox="0 0 99 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.5842 9V27.5H80.8369C88.4992 27.5 91.9472 10.6667 93.0966 0C100.759 14.8 99.3541 28.5 97.6939 33.5C94.016 53.1 79.0491 61 72.0253 62.5H27.5842V82L0 43.5L27.5842 9Z" fill="#D9D9D9"/>
                    <path d="M17.107 111V89.1818H20.2923V97.2891H20.4841C20.6688 96.9482 20.9351 96.554 21.2831 96.1065C21.6311 95.6591 22.1141 95.2685 22.732 94.9347C23.3499 94.5938 24.1666 94.4233 25.1823 94.4233C26.5033 94.4233 27.6823 94.7571 28.7192 95.4247C29.7561 96.0923 30.5693 97.0547 31.1588 98.3118C31.7554 99.5689 32.0537 101.082 32.0537 102.85C32.0537 104.619 31.759 106.135 31.1695 107.399C30.58 108.656 29.7703 109.626 28.7405 110.308C27.7107 110.982 26.5352 111.32 25.2142 111.32C24.2199 111.32 23.4067 111.153 22.7746 110.819C22.1496 110.485 21.6595 110.094 21.3044 109.647C20.9493 109.2 20.6759 108.802 20.4841 108.454H20.2178V111H17.107ZM20.2284 102.818C20.2284 103.969 20.3953 104.977 20.7291 105.844C21.0629 106.71 21.5459 107.388 22.178 107.879C22.8101 108.362 23.5843 108.603 24.5004 108.603C25.4521 108.603 26.2476 108.351 26.8868 107.847C27.526 107.335 28.009 106.643 28.3357 105.769C28.6695 104.896 28.8364 103.912 28.8364 102.818C28.8364 101.739 28.673 100.769 28.3463 99.9098C28.0267 99.0504 27.5438 98.3722 26.8975 97.875C26.2583 97.3778 25.4593 97.1293 24.5004 97.1293C23.5771 97.1293 22.7959 97.3672 22.1567 97.843C21.5246 98.3189 21.0452 98.983 20.7185 99.8352C20.3918 100.687 20.2284 101.682 20.2284 102.818ZM40.3927 111.362C39.3557 111.362 38.4182 111.17 37.5802 110.787C36.7421 110.396 36.078 109.832 35.588 109.093C35.105 108.354 34.8635 107.449 34.8635 106.376C34.8635 105.453 35.0411 104.693 35.3962 104.097C35.7513 103.5 36.2307 103.028 36.8344 102.68C37.4381 102.332 38.1128 102.069 38.8586 101.891C39.6043 101.714 40.3643 101.579 41.1384 101.487C42.1185 101.373 42.914 101.281 43.5248 101.21C44.1356 101.131 44.5795 101.007 44.8564 100.837C45.1334 100.666 45.2719 100.389 45.2719 100.006V99.9311C45.2719 99.0007 45.0091 98.2798 44.4836 97.7685C43.9651 97.2571 43.191 97.0014 42.1611 97.0014C41.0887 97.0014 40.2435 97.2393 39.6256 97.7152C39.0148 98.1839 38.5922 98.706 38.3579 99.2812L35.3643 98.5994C35.7194 97.6051 36.2378 96.8026 36.9197 96.1918C37.6086 95.5739 38.4005 95.1264 39.2954 94.8494C40.1903 94.5653 41.1313 94.4233 42.1185 94.4233C42.7719 94.4233 43.4644 94.5014 44.1959 94.6577C44.9346 94.8068 45.6235 95.0838 46.2627 95.4886C46.909 95.8935 47.4381 96.4723 47.8501 97.2251C48.262 97.9709 48.468 98.9403 48.468 100.134V111H45.3572V108.763H45.2293C45.0233 109.175 44.7144 109.58 44.3025 109.977C43.8905 110.375 43.3614 110.705 42.7151 110.968C42.0688 111.231 41.2947 111.362 40.3927 111.362ZM41.0851 108.805C41.9658 108.805 42.7187 108.631 43.3437 108.283C43.9758 107.935 44.4552 107.481 44.7819 106.92C45.1157 106.352 45.2826 105.744 45.2826 105.098V102.989C45.1689 103.102 44.9488 103.209 44.6221 103.308C44.3025 103.401 43.9367 103.482 43.5248 103.553C43.1128 103.617 42.7116 103.678 42.3209 103.734C41.9303 103.784 41.6036 103.827 41.3408 103.862C40.7229 103.94 40.1583 104.072 39.6469 104.256C39.1427 104.441 38.7378 104.707 38.4324 105.055C38.1341 105.396 37.985 105.851 37.985 106.419C37.985 107.207 38.2762 107.804 38.8586 108.209C39.441 108.607 40.1831 108.805 41.0851 108.805ZM59.6034 111.33C58.0196 111.33 56.656 110.972 55.5125 110.254C54.3762 109.53 53.5026 108.532 52.8918 107.261C52.281 105.989 51.9756 104.533 51.9756 102.893C51.9756 101.231 52.2881 99.7642 52.9131 98.4929C53.5381 97.2145 54.4188 96.2166 55.5551 95.4993C56.6915 94.782 58.0303 94.4233 59.5715 94.4233C60.8144 94.4233 61.9223 94.6541 62.8953 95.1158C63.8683 95.5703 64.6531 96.2095 65.2497 97.0334C65.8534 97.8572 66.2121 98.8196 66.3257 99.9205H63.2256C63.0551 99.1534 62.6645 98.4929 62.0537 97.9389C61.45 97.3849 60.6404 97.108 59.6247 97.108C58.7369 97.108 57.9593 97.3423 57.2916 97.8111C56.6311 98.2727 56.1162 98.9332 55.7469 99.7926C55.3776 100.645 55.1929 101.653 55.1929 102.818C55.1929 104.011 55.374 105.041 55.7362 105.908C56.0985 106.774 56.6098 107.445 57.2703 107.921C57.9379 108.397 58.7227 108.635 59.6247 108.635C60.2284 108.635 60.7753 108.525 61.2654 108.305C61.7625 108.077 62.178 107.754 62.5118 107.335C62.8527 106.916 63.0906 106.412 63.2256 105.822H66.3257C66.2121 106.881 65.8676 107.825 65.2923 108.656C64.7171 109.487 63.9465 110.141 62.9806 110.616C62.0218 111.092 60.896 111.33 59.6034 111.33ZM72.6618 105.45L72.6405 101.561H73.1945L79.7144 94.6364H83.5283L76.0922 102.52H75.5915L72.6618 105.45ZM69.7322 111V89.1818H72.9175V111H69.7322ZM80.066 111L74.2066 103.223L76.4012 100.996L83.9758 111H80.066Z" fill="#D9D9D9"/>
                    </svg>
                    </a>
                </div>
                <div class="jurnl-logo">
                    <svg width="175" height="80" viewBox="0 0 175 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M149 62V32C148.623 28.1905 145.83 22 137.679 22C129.981 22 126.208 23.619 125 32V62" stroke="#D9D9D9" strokeWidth="10"/>
                    <path d="M45 19V49C45.3774 52.8095 48.1698 59 56.3208 59C64.0189 59 67.7925 57.381 69 49V19" stroke="#D9D9D9" strokeWidth="10"/>
                    <path d="M23 19V67.5C22 73.5 16.5 74.5 14.5 74.5C12.5 74.5 5.4 75.1 5 67.5" stroke="#D9D9D9" strokeWidth="10"/>
                    <path d="M90 62V31.3246C90.1667 29.2476 92 24.5 98.5 24C102.611 23.6838 107.5 24 109 28.9281" stroke="#D9D9D9" strokeWidth="10"/>
                    <path d="M170 0V62" stroke="#D9D9D9" strokeWidth="10"/>
                    <circle cx="45" cy="5" r="5" fill="#D9D9D9"/>
                    <circle cx="69" cy="5" r="5" fill="#D9D9D9"/>
                    <circle cx="125" cy="5" r="5" fill="#D9D9D9"/>
                    <circle cx="150" cy="5" r="5" fill="#D9D9D9"/>
                    </svg>
                </div>
                </div>
            <br />
            <div className="lines">
                    <br />
            <div className="stuff">
                <div class="mood">
                    <form>
                        <label htmlFor="moodScale">Rate your mood on a scale of 1 to 10</label>
                        <input
                            type="range" min="1" max="10" value={moodScale}
                            name="moodScale"
                            id="moodScale"
                            class = "slider"
                            onChange={this.handleChange} />
                        <br />
                        <label htmlFor="moodWord">Enter a word to describe how you are feeling today</label>
                        <input
                            type="text"
                            name="moodWord"
                            id="moodWord"
                            class="form-control"
                            value={moodWord}
                            onChange={this.handleChange} />
                        {/* <input type="button" value="Submit" onClick={this.submitForm} /> */}
                    </form>
                </div>
                <br />
                <div class = "water">
                <form>
                    <label htmlFor="water">Water (in mL)</label>
                    <input
                        type="number"
                        name="amount"
                        id="water"
                        class="form-control"
                        value={amount}
                        onChange={this.handleChange} />
                    {/* <input type="button" value="Submit" onClick={this.submitForm} /> */}
                </form>
                </div>
                </div>
                <div class="prompt">
                            
                        <p>You can use this optional prompt to help you decide what to journal on</p>
                        <p id="journal-prompt"></p>
                        
                </div>
                <form>
                        <textarea
                        rows="30" col="100"
                        name="content"
                        id="journal"> 
                        </textarea>
                        <input type="button" value="Submit" class="register" onClick={this.submitForm} />
                </form>
                <br  />
                </div>
            </body>
        );
    }
    }
    
    //handles changes to mood and water inputs
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
        const content = document.getElementById('journal').value;
        const inputJ = {content: content, date: this.state.date, username: sessionStorage.getItem('user'), currentStreak: this.state.streak}
        // DEBUG
        console.log(inputJ)
        fetch('/update-journal', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'mode':'cors'
        },
        body: JSON.stringify(inputJ)
        })
        .then((response) => response.json())
        .then((result) => {
            // DEBUG
            console.log('journal entry entered:')
            console.log(result)
            // display new streak value to user
            // this.setState({streak:result.streak})
        })
        document.getElementById('journal').value = '' // clears input elements


        //mood submission
        const inputM = {moodScale: this.state.moodScale, moodWord: this.state.moodWord, date: this.state.date, username: sessionStorage.getItem('user')}
        // DEBUG
        // console.log(inputM)
        fetch('/update-mood', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'mode':'cors'
        },
        body: JSON.stringify(inputM)
        })
        .then((response) => response.json())
        .then((result) => {
            // DEBUG
            console.log('mood tracked:')
            console.log(result)
        })

        // water submission
        const inputW = {amount:this.state.amount, date:this.state.date, username: sessionStorage.getItem('user')}
        // DEBUG
        // console.log(inputW)
        fetch('/update-water', {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'mode':'cors'
        },
        body: JSON.stringify(inputW)
        })
        .then((response) => response.json())
        .then((result) => {
            // DEBUG
            console.log('water intake tracked:')
            console.log(result)
        })
        this.setState(this.initialState) // clears input elements
        window.location.href = "/";
    }

    choosePrompt = () => {
        const prompts = this.state.prompts
        // choose a journal prompt
        let promptsLen = prompts.length
        let promptNum = Math.floor(Math.random() * promptsLen)
        let prompt = prompts[promptNum]

        document.getElementById('journal-prompt').innerHTML = prompt
    }

    
}

export default JournalApp