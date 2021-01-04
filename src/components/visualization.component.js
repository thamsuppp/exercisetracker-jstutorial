import React, { Component, useState } from "react";
import BarChart from './barchart.component';
import BarChart2 from './barchart2.component';
import Stock from './stock.component';
import axios from 'axios';

export default class Visualization extends Component {

    constructor(props) {
        super(props)

        this.state = {
            exercises: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState( { exercises: response.data});
            })
            .catch( (error) => {
                console.log(error);
            })
        }

    render() {
        return (
            <div>
                <p>You are on the Visualization Component!</p>
                <div>
                <BarChart exercises={this.state.exercises}></BarChart>
                </div>
            </div>

            
        )
    }

}