import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";


export default class EditExercise extends Component {

    // Constructor
    constructor(props) {
        // All react components should have this super() call
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    // Called before anything displays on the page
    componentDidMount() {

        // Update the state to the current exercise's data
        axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })

        // Get all the users
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    // response.data is an array of users (objects)
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })

    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        // Always use setState()
        this.setState({
            // Set it to be the textbox (e.target)'s value
            date: date
        });
    }

    // Handle the submit form case - update the exercise
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post("http://localhost:5000/exercises/update/"+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        // Take the person back to the homepage
        window.location = '/'

    }

    render() {
        return (
        <div>
        <h3>Edit Exercise Log</h3>
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
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
            </div>
            <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
            </div>
            <div className="form-group">
            <label>Date: </label>
            <div>
                <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
                />
            </div>
            </div>

            <div className="form-group">
            <input type="submit" value="Edit Exercise" className="btn btn-primary" />
            </div>
        </form>
        </div>
        )
    }
}