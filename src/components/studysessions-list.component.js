import React, { Component } from "react";
import { Link } from "react-router-dom"
import axios from "axios"

const StudySession = props => (
    <tr>
      <td>{props.session.username}</td>
      <td>{props.session.subject}</td>
      <td>{props.session.task}</td>
      <td>{props.session.start.substring(0,10)}</td>
      <td>{props.session.end.substring(0,10)}</td>
      <td>{props.session.duration}</td>
      <td>{props.session.productivity}</td>
      <td>
        <Link to={"/edit/"+props.session._id}>edit</Link> | <a href="#" onClick={() => { props.deleteSession(props.session._id) }}>delete</a>
      </td>
    </tr>
  )

export default class StudySessionsList extends Component {

    constructor(props) {
        super(props);
        this.deleteSession = this.deleteSession.bind(this);
        this.state = {
            sessions: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/studysessions/')
            .then(response => {
                this.setState( { sessions: response.data })
            })
            .catch( (error) => {
                console.log(error);
            })
    }

    deleteSession(id) {
        axios.delete('http://localhost:5000/studysessions/' + id)
            .then(res => console.log(res.data));
            // Delete the exercise from the table
            this.setState({
                sessions: this.state.sessions.filter(lst => lst._id !== id)
            })
    }

    sessionList() {
        return this.state.sessions.map(currentSession => {
          return <StudySession session={currentSession} deleteSession={this.deleteSession} key={currentSession._id}/>;
        })
      }


    render() {
        return (
            <div>
                <h3>Logged Study Sessions</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Subject</th>
                            <th>Task</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Productivity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.sessionList() }
                    </tbody>
                </table>
            </div>)
    }
}