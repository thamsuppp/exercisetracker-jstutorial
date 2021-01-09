import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";


// const ExampleCustomTimeInput = ({ date, value, onChange }) => (
//     <input
//       value={value}
//       onChange={e => onChange(e.target.value)}
//       style={{ border: "solid 1px pink" }}
//     />
// )

export default class CreateStudySession extends Component {

    // Constructor
    constructor(props) {
        // All react components should have this super() call
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeProductivity = this.onChangeProductivity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
        // Create properties in state that correspond to the MongoDB fields - create variables in React here
        this.state = {
            username: '',
            subject: '',
            task: '',
            start: new Date(),
            end: new Date(),
            productivity: 0,
            users: []
        }
    }

    // Called before anything displays on the page
    componentDidMount() {
        // Get all the users
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    // response.data is an array of users (objects)
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }
    onChangeTask(e) {
        this.setState({
            task: e.target.value
        });
    }
    onChangeStart(date) {
        this.setState({
            start: date
        });
    }
    onChangeEnd(date) {
        this.setState({
            end: date
        });
    }
    onChangeProductivity(e) {
        this.setState({
            productivity: e.target.value
        });
    }


    

    // Handle the submit form case
    onSubmit(e) {
        e.preventDefault();

        const diffTime = Math.abs(this.state.end - this.state.start);
        // Duration in minutes
        const duration = Math.ceil(diffTime / (1000 * 60));

        const studysession = {
            username: this.state.username,
            subject: this.state.subject,
            task: this.state.task,
            start: this.state.start,
            end: this.state.end,
            duration: duration,
            productivity: this.state.productivity,
            websites: []
        }

        console.log(studysession);

        axios.post("http://localhost:5000/studysessions/add", studysession)
            .then(res => console.log(res.data));

        // Take the person back to the homepage
        window.location = '/studylist'

    }

    render() {
        return (
        <div>
        <h3>Create New Study Session Log</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                    this.state.users.map(function(user) {
                    return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                }
            </select>
            </div>
            <div className="form-group"> 
            <label>Subject: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.subject}
                onChange={this.onChangeSubject}
                />
            </div>
            <div className="form-group"> 
            <label>Task: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.task}
                onChange={this.onChangeTask}
                />
            </div>
            <div className="form-group">
            <label>Start: </label>
            <div>
                <DatePicker
                selected={this.state.start}
                onChange={this.onChangeStart}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                />
            </div>
            </div>
            <div className="form-group">
            <label>End: </label>
            <div>
            <DatePicker
                selected={this.state.end}
                onChange={this.onChangeEnd}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                />
            </div>
            </div>
            <div className="form-group"> 
            <label>Productivity: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.productivity}
                onChange={this.onChangeProductivity}
                />
            </div>

            <div className="form-group">
            <input type="submit" value="Create Study Session Log" className="btn btn-primary" />
            </div>
        </form>
        </div>
        )
    }
}