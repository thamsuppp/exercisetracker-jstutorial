import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import axios from 'axios'

export default class BarChart extends Component { 
    constructor (props) {
        super(props)
        this.drawGraph = this.drawGraph.bind(this);
    }
    
    componentDidMount() {
        // axios.get('http://localhost:5000/exercises/')
        //     .then(response => {
        //         this.setState( { exercises: response.data});
        //     })
        //     .catch( (error) => {
        //         console.log(error);
        //     })
        }

    drawGraph() {
        // To remove duplicates from array
        const unique = (value, index, self) => {
            return self.indexOf(value) === index
        }

        let map = new Map();
        for (let exercise of this.props.exercises) {
            let date = exercise.date.substring(0,10)
            if (map.has(date)) {
                let v = map.get(date)
                map.set(date, v+exercise.duration)
            } else {
                map.set(date, exercise.duration)
            }
        }
        const days = Array.from(map.keys());
        const durations = Array.from(map.values());

        // Sort the dates in ascending order    
        days.sort(function compare(a,b) {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        })
        // Get the durations in sorted order
        let durationArr = days.map(date => map.get(date));

        // Return the bar graph
        return (
            <Bar
                data={{

                    labels: days,
                    datasets: [
                        {
                            label: 'Total Duration',
                            data: durationArr,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                        }
                    ]
                }}
                height={400}
                width={600}
            />
        )
    }

    render() {
        return (
            
            <div>
            <h1>Exercises per Day</h1>
            {this.drawGraph()}
            </div>
            )
    }
    
}